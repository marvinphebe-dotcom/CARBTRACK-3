/*
  # CarbTrack - Carbon Footprint Tracking Application Schema

  ## Overview
  This migration creates the complete database schema for CarbTrack, an application
  that helps individuals and businesses calculate, visualize, and reduce their carbon footprint.

  ## New Tables

  ### `profiles`
  Stores user profile information including type (individual or business)
  - `id` (uuid, primary key) - Unique identifier, linked to auth.users
  - `profile_type` (text) - Type: 'individual' or 'business'
  - `name` (text) - User or business name
  - `email` (text) - Contact email
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `assessments`
  Stores completed carbon footprint assessments
  - `id` (uuid, primary key) - Unique identifier
  - `profile_id` (uuid, foreign key) - Reference to profiles table
  - `profile_type` (text) - Individual or business
  - `total_emissions` (numeric) - Total carbon footprint in tCO₂e/year
  - `emissions_by_category` (jsonb) - Breakdown by category (housing, transport, etc.)
  - `top_categories` (jsonb) - Top 3 emitting categories
  - `completed_at` (timestamptz) - Assessment completion date
  - `created_at` (timestamptz) - Record creation timestamp

  ### `assessment_responses`
  Stores individual question responses for each assessment
  - `id` (uuid, primary key) - Unique identifier
  - `assessment_id` (uuid, foreign key) - Reference to assessments table
  - `category` (text) - Question category
  - `question_key` (text) - Unique question identifier
  - `response_value` (text) - User's response
  - `carbon_coefficient` (numeric) - Carbon emission coefficient in tCO₂e/year
  - `created_at` (timestamptz) - Response timestamp

  ### `recommendations`
  Stores personalized recommendations based on assessment results
  - `id` (uuid, primary key) - Unique identifier
  - `assessment_id` (uuid, foreign key) - Reference to assessments table
  - `category` (text) - Recommendation category
  - `title` (text) - Recommendation title
  - `description` (text) - Detailed description
  - `impact_level` (text) - High, Medium, or Low impact
  - `difficulty_level` (text) - Easy, Medium, or Hard difficulty
  - `potential_reduction` (numeric) - Estimated CO₂ reduction in tCO₂e/year
  - `priority` (int) - Display priority order
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - All tables have RLS (Row Level Security) enabled
  - Users can only access their own data
  - Authenticated users can create and read their profiles
  - Authenticated users can create and read their assessments and related data

  ## Notes
  1. All timestamps use `timestamptz` for proper timezone handling
  2. Carbon values use `numeric` type for precision
  3. JSONB is used for flexible category storage
  4. All foreign keys have proper cascade rules
  5. Indexes are added for common query patterns
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_type text NOT NULL CHECK (profile_type IN ('individual', 'business')),
  name text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  profile_type text NOT NULL CHECK (profile_type IN ('individual', 'business')),
  total_emissions numeric NOT NULL DEFAULT 0,
  emissions_by_category jsonb DEFAULT '{}',
  top_categories jsonb DEFAULT '[]',
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create assessment_responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  question_key text NOT NULL,
  response_value text NOT NULL,
  carbon_coefficient numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  impact_level text NOT NULL CHECK (impact_level IN ('high', 'medium', 'low')),
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  potential_reduction numeric DEFAULT 0,
  priority int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessments_profile_id ON assessments(profile_id);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment_id ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_assessment_id ON recommendations(assessment_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- RLS Policies for assessments table
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can create own assessments"
  ON assessments FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own assessments"
  ON assessments FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can delete own assessments"
  ON assessments FOR DELETE
  TO authenticated
  USING (profile_id = auth.uid());

-- RLS Policies for assessment_responses table
CREATE POLICY "Users can view own assessment responses"
  ON assessment_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_responses.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own assessment responses"
  ON assessment_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_responses.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own assessment responses"
  ON assessment_responses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_responses.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );

-- RLS Policies for recommendations table
CREATE POLICY "Users can view own recommendations"
  ON recommendations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = recommendations.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own recommendations"
  ON recommendations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = recommendations.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own recommendations"
  ON recommendations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = recommendations.assessment_id
      AND assessments.profile_id = auth.uid()
    )
  );