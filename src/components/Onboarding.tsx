import { User, Building2, Leaf } from 'lucide-react';
import type { ProfileType } from '../lib/supabase';
import './Onboarding.css';

interface OnboardingProps {
  onProfileSelect: (type: ProfileType) => void;
}

export default function Onboarding({ onProfileSelect }: OnboardingProps) {
  return (
    <div className="onboarding">
      <div className="onboarding-content">
        <div className="onboarding-intro">
          <Leaf size={64} className="intro-icon" />
          <h2>Bienvenue sur CarbTrack</h2>
          <p className="intro-text">
            Comprendre votre impact environnemental est la première étape vers un mode de vie plus durable.
            En quelques minutes, calculez votre empreinte carbone et découvrez des solutions concrètes pour la réduire.
          </p>

          <div className="info-cards">
            <div className="info-card">
              <h3>⏱️ Rapide</h3>
              <p>5 minutes pour un diagnostic complet</p>
            </div>
            <div className="info-card">
              <h3>📊 Précis</h3>
              <p>Basé sur des données scientifiques</p>
            </div>
            <div className="info-card">
              <h3>💡 Actionnable</h3>
              <p>Des conseils personnalisés et concrets</p>
            </div>
          </div>
        </div>

        <div className="profile-selection">
          <h3>Choisissez votre profil</h3>
          <div className="profile-cards">
            <button
              className="profile-card"
              onClick={() => onProfileSelect('individual')}
            >
              <User size={48} />
              <h4>Particulier</h4>
              <p>
                Calculez l'empreinte carbone de votre foyer :
                logement, transports, alimentation, consommation.
              </p>
              <span className="card-cta">Commencer →</span>
            </button>

            <button
              className="profile-card"
              onClick={() => onProfileSelect('business')}
            >
              <Building2 size={48} />
              <h4>Entreprise</h4>
              <p>
                Évaluez l'impact de votre TPE/PME :
                énergie, déplacements, achats, activité.
              </p>
              <span className="card-cta">Commencer →</span>
            </button>
          </div>
        </div>

        <div className="climate-context">
          <p className="context-text">
            🌍 <strong>Objectif climat 2050 :</strong> Pour limiter le réchauffement climatique à 1,5°C,
            nous devons réduire notre empreinte carbone à environ <strong>2 tonnes de CO₂ par personne et par an</strong>.
            Actuellement, la moyenne en France est d'environ 9 tonnes.
          </p>
        </div>
      </div>
    </div>
  );
}
