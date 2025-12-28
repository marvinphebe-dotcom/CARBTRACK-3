import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { Assessment } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import './History.css';

interface HistoryProps {
  onBack: () => void;
  onRestart: () => void;
}

const FRANCE_AVERAGE = 9.0;
const TARGET_2050 = 2.0;

export default function History({ onBack, onRestart }: HistoryProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('completed_at', { ascending: true });

      if (error) throw error;
      setAssessments(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="history-loading">
        <div className="spinner" />
        <p>Chargement de l'historique...</p>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="history-empty">
        <h2>Aucun historique</h2>
        <p>Vous n'avez pas encore réalisé d'évaluation.</p>
        <button className="primary-button" onClick={onRestart}>
          Commencer une évaluation
        </button>
      </div>
    );
  }

  const chartData = assessments.map((assessment, index) => ({
    name: `#${index + 1}`,
    date: new Date(assessment.completed_at).toLocaleDateString('fr-FR'),
    emissions: assessment.total_emissions,
    moyenne: FRANCE_AVERAGE,
    objectif: TARGET_2050,
  }));

  const latestAssessment = assessments[assessments.length - 1];
  const previousAssessment = assessments.length > 1 ? assessments[assessments.length - 2] : null;

  let trend: 'up' | 'down' | 'stable' = 'stable';
  let trendValue = 0;

  if (previousAssessment) {
    const diff = latestAssessment.total_emissions - previousAssessment.total_emissions;
    trendValue = Math.abs(diff);
    if (diff > 0.1) trend = 'up';
    else if (diff < -0.1) trend = 'down';
  }

  const totalReduction = assessments.length > 1
    ? assessments[0].total_emissions - latestAssessment.total_emissions
    : 0;

  return (
    <div className="history">
      <div className="history-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Retour aux résultats
        </button>
        <h2>Historique de vos évaluations</h2>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-label">Dernière évaluation</div>
          <div className="stat-value">
            {latestAssessment.total_emissions.toFixed(1)} <span className="stat-unit">tCO₂e/an</span>
          </div>
          <div className="stat-date">
            {new Date(latestAssessment.completed_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>

        {previousAssessment && (
          <div className="stat-card">
            <div className="stat-label">Évolution</div>
            <div className={`stat-value trend-${trend}`}>
              {trend === 'up' && <TrendingUp size={24} />}
              {trend === 'down' && <TrendingDown size={24} />}
              {trend === 'stable' && <Minus size={24} />}
              <span>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
                {trendValue.toFixed(1)} tCO₂e
              </span>
            </div>
            <div className="stat-description">
              {trend === 'down' && 'Bravo, vous progressez !'}
              {trend === 'up' && 'Attention, votre empreinte augmente'}
              {trend === 'stable' && 'Votre empreinte est stable'}
            </div>
          </div>
        )}

        {assessments.length > 1 && (
          <div className="stat-card">
            <div className="stat-label">Réduction totale</div>
            <div className={`stat-value ${totalReduction > 0 ? 'trend-down' : totalReduction < 0 ? 'trend-up' : ''}`}>
              {totalReduction > 0 && <TrendingDown size={24} />}
              {totalReduction < 0 && <TrendingUp size={24} />}
              <span>
                {totalReduction > 0 ? '-' : totalReduction < 0 ? '+' : ''}
                {Math.abs(totalReduction).toFixed(1)} tCO₂e
              </span>
            </div>
            <div className="stat-description">
              Depuis la première évaluation
            </div>
          </div>
        )}
      </div>

      <div className="chart-section">
        <h3>Évolution de votre empreinte carbone</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'tCO₂e/an', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `${Number(value ?? 0).toFixed(1)} tCO₂e`}
              labelFormatter={(label) => {
                const dataPoint = chartData.find(d => d.name === label);
                return dataPoint ? `Évaluation ${label} - ${dataPoint.date}` : label;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="emissions"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Votre empreinte"
              dot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="moyenne"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Moyenne France"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="objectif"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Objectif 2050"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="assessments-list">
        <h3>Toutes vos évaluations ({assessments.length})</h3>
        <div className="assessments-table">
          {assessments.slice().reverse().map((assessment, index) => (
            <div key={assessment.id} className="assessment-row">
              <div className="assessment-number">
                #{assessments.length - index}
              </div>
              <div className="assessment-date">
                {new Date(assessment.completed_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div className="assessment-type">
                {assessment.profile_type === 'individual' ? 'Particulier' : 'Entreprise'}
              </div>
              <div className="assessment-score">
                {assessment.total_emissions.toFixed(1)} tCO₂e/an
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="history-actions">
        <button className="primary-button" onClick={onRestart}>
          Nouvelle évaluation
        </button>
      </div>
    </div>
  );
}
