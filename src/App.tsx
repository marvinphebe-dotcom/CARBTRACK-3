import { useState } from 'react';
import type { ProfileType } from './lib/supabase';
import Onboarding from './components/Onboarding';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import History from './components/History';
import './App.css';

type AppState = 'onboarding' | 'questionnaire' | 'results' | 'history';

function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const handleProfileSelect = (type: ProfileType) => {
    setProfileType(type);
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = (id: string) => {
    setAssessmentId(id);
    setAppState('results');
  };

  const handleRestart = () => {
    setProfileType(null);
    setAssessmentId(null);
    setAppState('onboarding');
  };

  const handleViewHistory = () => {
    setAppState('history');
  };

  const handleBackToResults = () => {
    setAppState('results');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">🌱 CarbTrack</h1>
        <p className="tagline">Comprendre et réduire votre empreinte carbone</p>
      </header>

      <main className="app-main">
        {appState === 'onboarding' && (
          <Onboarding onProfileSelect={handleProfileSelect} />
        )}

        {appState === 'questionnaire' && profileType && (
          <Questionnaire
            profileType={profileType}
            onComplete={handleQuestionnaireComplete}
            onBack={handleRestart}
          />
        )}

        {appState === 'results' && assessmentId && (
          <Results
            assessmentId={assessmentId}
            onRestart={handleRestart}
            onViewHistory={handleViewHistory}
          />
        )}

        {appState === 'history' && (
          <History
            onBack={handleBackToResults}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 CarbTrack - Agir ensemble pour le climat</p>
      </footer>
    </div>
  );
}

export default App;
