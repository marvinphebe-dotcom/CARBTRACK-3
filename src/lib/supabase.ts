import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProfileType = 'individual' | 'business';

export interface Profile {
  id: string;
  profile_type: ProfileType;
  name: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  profile_id: string;
  profile_type: ProfileType;
  total_emissions: number;
  emissions_by_category: Record<string, number>;
  top_categories: Array<{ category: string; emissions: number }>;
  completed_at: string;
  created_at: string;
}

export interface AssessmentResponse {
  id: string;
  assessment_id: string;
  category: string;
  question_key: string;
  response_value: string;
  carbon_coefficient: number;
  created_at: string;
}

export interface Recommendation {
  id: string;
  assessment_id: string;
  category: string;
  title: string;
  description: string;
  impact_level: 'high' | 'medium' | 'low';
  difficulty_level: 'easy' | 'medium' | 'hard';
  potential_reduction: number;
  priority: number;
  created_at: string;
}
