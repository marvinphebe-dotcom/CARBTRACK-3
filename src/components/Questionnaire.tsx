import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { ProfileType } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { individualQuestions, businessQuestions, categoryLabels } from '../data/questions';
import { generateRecommendations } from '../data/recommendations';
import './Questionnaire.css';

interface QuestionnaireProps {
  profileType: ProfileType;
  onComplete: (assessmentId: string) => void;
  onBack: () => void;
}

export default function Questionnaire({ profileType, onComplete, onBack }: QuestionnaireProps) {
  const questions = profileType === 'individual' ? individualQuestions : businessQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, { value: string; coefficient: number; category: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswer = responses[currentQuestion.key] !== undefined;

  const handleAnswer = (value: string, coefficient: number) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.key]: {
        value,
        coefficient,
        category: currentQuestion.category,
      },
    }));
  };

  const handleNext = () => {
    if (hasAnswer && !isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (hasAnswer && isLastQuestion) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const emissionsByCategory: Record<string, number> = {};
      Object.values(responses).forEach(response => {
        if (!emissionsByCategory[response.category]) {
          emissionsByCategory[response.category] = 0;
        }
        emissionsByCategory[response.category] += response.coefficient;
      });

      const totalEmissions = Object.values(emissionsByCategory).reduce((sum, val) => sum + val, 0);

      const topCategories = Object.entries(emissionsByCategory)
        .map(([category, emissions]) => ({ category, emissions }))
        .sort((a, b) => b.emissions - a.emissions)
        .slice(0, 3);

      const { data: assessment, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          profile_type: profileType,
          total_emissions: totalEmissions,
          emissions_by_category: emissionsByCategory,
          top_categories: topCategories,
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      const responseInserts = Object.entries(responses).map(([key, response]) => ({
        assessment_id: assessment.id,
        category: response.category,
        question_key: key,
        response_value: response.value,
        carbon_coefficient: response.coefficient,
      }));

      const { error: responsesError } = await supabase
        .from('assessment_responses')
        .insert(responseInserts);

      if (responsesError) throw responsesError;

      const recommendations = generateRecommendations(profileType, topCategories);
      const recommendationInserts = recommendations.map(rec => ({
        assessment_id: assessment.id,
        ...rec,
      }));

      const { error: recommendationsError } = await supabase
        .from('recommendations')
        .insert(recommendationInserts);

      if (recommendationsError) throw recommendationsError;

      onComplete(assessment.id);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="questionnaire">
      <div className="questionnaire-header">
        <button className="back-button" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft size={20} />
          Retour
        </button>
        <div className="progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} sur {questions.length}
          </span>
        </div>
      </div>

      <div className="question-container">
        <div className="question-category">
          {categoryLabels[currentQuestion.category]}
        </div>
        <h2 className="question-text">{currentQuestion.text}</h2>

        <div className="options-grid">
          {currentQuestion.options.map((option) => {
            const isSelected = responses[currentQuestion.key]?.value === option.value;
            return (
              <button
                key={option.value}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.value, option.coefficient)}
                disabled={isSubmitting}
              >
                <span className="option-label">{option.label}</span>
                {isSelected && (
                  <Check className="check-icon" size={20} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="questionnaire-footer">
        <button
          className="nav-button secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          <ArrowLeft size={20} />
          Précédent
        </button>

        <button
          className="nav-button primary"
          onClick={handleNext}
          disabled={!hasAnswer || isSubmitting}
        >
          {isLastQuestion ? (
            <>
              {isSubmitting ? 'Calcul en cours...' : 'Voir mes résultats'}
              <Check size={20} />
            </>
          ) : (
            <>
              Suivant
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
