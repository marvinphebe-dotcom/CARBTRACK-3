import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingDown, Target, AlertCircle, RefreshCw, History as HistoryIcon, Lightbulb } from 'lucide-react';
import type { Assessment, Recommendation } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { categoryLabels } from '../data/questions';
import './Results.css';

interface ResultsProps {
  assessmentId: string;
  onRestart: () => void;
  onViewHistory: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const FRANCE_AVERAGE = 9.0;
const TARGET_2050 = 2.0;

export default function Results({ assessmentId, onRestart, onViewHistory }: ResultsProps) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [assessmentId]);

  const loadResults = async () => {
    try {
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (assessmentError) throw assessmentError;
      setAssessment(assessmentData);

      const { data: recommendationsData, error: recommendationsError } = await supabase
        .from('recommendations')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('priority', { ascending: true });

      if (recommendationsError) throw recommendationsError;
      setRecommendations(recommendationsData);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="results-loading">
        <div className="spinner" />
        <p>Calcul de votre empreinte carbone...</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="results-error">
        <AlertCircle size={48} />
        <p>Impossible de charger les résultats</p>
        <button onClick={onRestart}>Recommencer</button>
      </div>
    );
  }

  const chartData = Object.entries(assessment.emissions_by_category).map(([category, emissions]) => ({
    name: categoryLabels[category] || category,
    value: Number(emissions),
    emissions: Number(emissions),
  }));

  const comparisonData = [
    { name: 'Votre empreinte', value: assessment.total_emissions },
    { name: 'Moyenne France', value: FRANCE_AVERAGE },
    { name: 'Objectif 2050', value: TARGET_2050 },
  ];

  const getScoreLevel = (score: number) => {
    if (score <= TARGET_2050) return 'excellent';
    if (score <= 4) return 'good';
    if (score <= 7) return 'average';
    return 'high';
  };

  const scoreLevel = getScoreLevel(assessment.total_emissions);

  const potentialReduction = recommendations.reduce((sum, rec) => sum + rec.potential_reduction, 0);
  const averageGap = assessment.total_emissions - FRANCE_AVERAGE;
  const targetGap = Math.max(assessment.total_emissions - TARGET_2050, 0);
  const potentialReductionPercent = assessment.total_emissions > 0
    ? (potentialReduction / assessment.total_emissions) * 100
    : 0;

  return (
    <div className="results">
      <div className="results-header">
        <h2>Votre bilan carbone</h2>
        <div className="header-actions">
          <button className="action-button secondary" onClick={onViewHistory}>
            <HistoryIcon size={20} />
            Historique
          </button>
          <button className="action-button secondary" onClick={onRestart}>
            <RefreshCw size={20} />
            Nouveau calcul
          </button>
        </div>
      </div>

      <div className="score-card">
        <div className={`score-badge ${scoreLevel}`}>
          <div className="score-value">
            <span className="score-number">{assessment.total_emissions.toFixed(1)}</span>
            <span className="score-unit">tonnes CO₂e/an</span>
          </div>
          <div className="score-label">Votre empreinte carbone</div>
        </div>

        <div className="score-insights">
          {assessment.total_emissions <= TARGET_2050 && (
            <div className="insight excellent">
              <Target size={24} />
              <div>
                <strong>Objectif atteint !</strong>
                <p>Vous êtes en dessous de l'objectif climat 2050</p>
              </div>
            </div>
          )}
          {assessment.total_emissions > TARGET_2050 && (
            <div className="insight warning">
              <TrendingDown size={24} />
              <div>
                <strong>Réduction nécessaire</strong>
                <p>
                  Pour atteindre l'objectif climat, vous devez réduire de{' '}
                  <strong>{(assessment.total_emissions - TARGET_2050).toFixed(1)} tonnes</strong>
                </p>
              </div>
            </div>
          )}
          {potentialReduction > 0 && (
            <div className="insight info">
              <Lightbulb size={24} />
              <div>
                <strong>Potentiel de réduction</strong>
                <p>
                  En suivant nos recommandations, vous pouvez réduire jusqu'à{' '}
                  <strong>{potentialReduction.toFixed(1)} tonnes</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="indicators-grid">
        <div className="indicator-card">
          <div className="indicator-label">Écart avec la moyenne française</div>
          <div className={`indicator-value ${averageGap <= 0 ? 'positive' : 'negative'}`}>
            {averageGap > 0 ? '+' : ''}{averageGap.toFixed(1)} tCO₂e
          </div>
          <p className="indicator-helper">
            {averageGap > 0
              ? 'Votre empreinte dépasse la moyenne nationale. Identifiez les postes prioritaires.'
              : 'Votre empreinte est inférieure à la moyenne française, continuez vos efforts !'}
          </p>
        </div>

        <div className="indicator-card">
          <div className="indicator-label">Distance à l'objectif 2050</div>
          <div className={`indicator-value ${targetGap === 0 ? 'positive' : 'negative'}`}>
            {targetGap === 0 ? 'Objectif atteint' : `${targetGap.toFixed(1)} tCO₂e à réduire`}
          </div>
          <p className="indicator-helper">
            {targetGap === 0
              ? 'Vous êtes déjà au niveau requis pour 2050.'
              : 'Combinez les recommandations pour vous rapprocher de l’objectif.'}
          </p>
        </div>

        <div className="indicator-card">
          <div className="indicator-label">Potentiel de réduction</div>
          <div className="indicator-value positive">
            {potentialReduction.toFixed(1)} tCO₂e
            <span className="indicator-chip">{potentialReductionPercent.toFixed(0)}%</span>
          </div>
          <p className="indicator-helper">
            Gain estimé en appliquant toutes les recommandations suggérées.
          </p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${Number(value ?? 0).toFixed(2)} tCO₂e`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Comparaison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'tCO₂e/an', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${Number(value ?? 0).toFixed(1)} tCO₂e`} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="top-categories">
        <h3>Top 3 des postes les plus émetteurs</h3>
        <div className="categories-list">
          {assessment.top_categories.map((cat, index) => (
            <div key={index} className="category-item">
              <div className="category-rank">#{index + 1}</div>
              <div className="category-info">
                <span className="category-name">{categoryLabels[cat.category] || cat.category}</span>
                <span className="category-emissions">{cat.emissions.toFixed(2)} tCO₂e/an</span>
              </div>
              <div className="category-bar">
                <div
                  className="category-bar-fill"
                  style={{
                    width: `${(cat.emissions / assessment.total_emissions) * 100}%`,
                    backgroundColor: COLORS[index],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Vos recommandations personnalisées</h3>
        <p className="recommendations-intro">
          Voici des actions concrètes pour réduire votre empreinte carbone, classées par impact et facilité.
        </p>
        <div className="recommendations-grid">
          {recommendations.map((rec) => (
            <div key={rec.id} className="recommendation-card">
              <div className="recommendation-header">
                <h4>{rec.title}</h4>
                <div className="recommendation-badges">
                  <span className={`badge impact-${rec.impact_level}`}>
                    {rec.impact_level === 'high' ? 'Fort impact' : rec.impact_level === 'medium' ? 'Impact moyen' : 'Faible impact'}
                  </span>
                  <span className={`badge difficulty-${rec.difficulty_level}`}>
                    {rec.difficulty_level === 'easy' ? 'Facile' : rec.difficulty_level === 'medium' ? 'Moyen' : 'Difficile'}
                  </span>
                </div>
              </div>
              <p className="recommendation-description">{rec.description}</p>
              <div className="recommendation-impact">
                <TrendingDown size={16} />
                <span>Économie potentielle : {rec.potential_reduction.toFixed(2)} tCO₂e/an</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
