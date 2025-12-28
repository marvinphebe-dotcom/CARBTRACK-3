interface RecommendationTemplate {
  category: string;
  title: string;
  description: string;
  impact_level: 'high' | 'medium' | 'low';
  difficulty_level: 'easy' | 'medium' | 'hard';
  potential_reduction_percent: number;
}

export const individualRecommendations: Record<string, RecommendationTemplate[]> = {
  logement: [
    {
      category: 'logement',
      title: 'Améliorer l\'isolation de votre logement',
      description: 'Isoler les combles, les murs et changer les fenêtres peut réduire votre consommation de chauffage de 30 à 50%.',
      impact_level: 'high',
      difficulty_level: 'hard',
      potential_reduction_percent: 40,
    },
    {
      category: 'logement',
      title: 'Baisser le chauffage de 1°C',
      description: 'Réduire la température de 19°C à 18°C permet d\'économiser environ 7% d\'énergie. Portez un pull !',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 7,
    },
    {
      category: 'logement',
      title: 'Passer à un fournisseur d\'électricité verte',
      description: 'Choisir un fournisseur qui investit dans les énergies renouvelables réduit l\'empreinte carbone de votre consommation électrique.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 15,
    },
  ],
  transports: [
    {
      category: 'transports',
      title: 'Privilégier les transports en commun ou le vélo',
      description: 'Remplacer la voiture par le vélo ou les transports en commun pour les trajets quotidiens peut réduire vos émissions de 80%.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 80,
    },
    {
      category: 'transports',
      title: 'Pratiquer l\'écoconduite',
      description: 'Adopter une conduite souple, anticiper les freinages et respecter les limitations peut économiser jusqu\'à 20% de carburant.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 20,
    },
    {
      category: 'transports',
      title: 'Limiter les voyages en avion',
      description: 'Privilégier le train pour les distances moyennes et limiter les vols longs courriers à l\'essentiel.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 50,
    },
    {
      category: 'transports',
      title: 'Opter pour le covoiturage',
      description: 'Partager ses trajets permet de diviser les émissions par le nombre de passagers.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 50,
    },
  ],
  alimentation: [
    {
      category: 'alimentation',
      title: 'Réduire sa consommation de viande',
      description: 'Passer à 1-2 repas avec viande par semaine plutôt que quotidiennement peut réduire votre empreinte alimentaire de 40%.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 40,
    },
    {
      category: 'alimentation',
      title: 'Privilégier les produits locaux et de saison',
      description: 'Acheter des produits locaux et de saison réduit les émissions liées au transport et à la production hors saison.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 20,
    },
    {
      category: 'alimentation',
      title: 'Réduire le gaspillage alimentaire',
      description: 'Planifier ses repas, bien conserver les aliments et cuisiner les restes peut réduire le gaspillage de 50%.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 15,
    },
    {
      category: 'alimentation',
      title: 'Acheter en vrac et limiter les emballages',
      description: 'Privilégier les produits en vrac et les contenants réutilisables réduit les déchets et les émissions de production.',
      impact_level: 'low',
      difficulty_level: 'easy',
      potential_reduction_percent: 10,
    },
  ],
  consommation: [
    {
      category: 'consommation',
      title: 'Acheter d\'occasion ou reconditionné',
      description: 'Privilégier les vêtements et appareils d\'occasion permet d\'éviter la production de nouveaux biens et réduit fortement l\'empreinte.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 60,
    },
    {
      category: 'consommation',
      title: 'Réparer plutôt que remplacer',
      description: 'Faire réparer ses appareils électroniques et vêtements prolonge leur durée de vie et évite de nouvelles productions.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 40,
    },
    {
      category: 'consommation',
      title: 'Adopter une approche minimaliste',
      description: 'Se demander si chaque achat est vraiment nécessaire permet de réduire sa consommation globale.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 50,
    },
  ],
  numérique: [
    {
      category: 'numérique',
      title: 'Limiter le streaming vidéo',
      description: 'Réduire la qualité de streaming (SD au lieu de HD) et télécharger plutôt que streamer en ligne réduit la consommation énergétique.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 30,
    },
    {
      category: 'numérique',
      title: 'Nettoyer sa boîte mail et le cloud',
      description: 'Supprimer les emails inutiles et les fichiers stockés en ligne réduit la consommation des data centers.',
      impact_level: 'low',
      difficulty_level: 'easy',
      potential_reduction_percent: 10,
    },
    {
      category: 'numérique',
      title: 'Conserver ses appareils plus longtemps',
      description: 'Garder son smartphone et ordinateur 4-5 ans au lieu de 2-3 ans réduit significativement l\'impact de leur fabrication.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 40,
    },
  ],
};

export const businessRecommendations: Record<string, RecommendationTemplate[]> = {
  énergie: [
    {
      category: 'énergie',
      title: 'Passer à l\'électricité verte certifiée',
      description: 'Choisir un fournisseur d\'électricité 100% renouvelable avec garanties d\'origine réduit drastiquement l\'empreinte énergétique.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 50,
    },
    {
      category: 'énergie',
      title: 'Améliorer l\'isolation des locaux',
      description: 'Isoler les bâtiments et optimiser le chauffage/climatisation peut réduire la consommation énergétique de 30 à 50%.',
      impact_level: 'high',
      difficulty_level: 'hard',
      potential_reduction_percent: 40,
    },
    {
      category: 'énergie',
      title: 'Installer des panneaux solaires',
      description: 'Produire votre propre électricité via des panneaux photovoltaïques réduit votre dépendance au réseau.',
      impact_level: 'high',
      difficulty_level: 'hard',
      potential_reduction_percent: 35,
    },
  ],
  déplacements: [
    {
      category: 'déplacements',
      title: 'Mettre en place le télétravail',
      description: 'Permettre 2-3 jours de télétravail par semaine réduit les émissions liées aux trajets domicile-travail de 40 à 60%.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 50,
    },
    {
      category: 'déplacements',
      title: 'Encourager les mobilités douces',
      description: 'Proposer des indemnités vélo, des parkings sécurisés et des douches incite les employés à utiliser le vélo.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 30,
    },
    {
      category: 'déplacements',
      title: 'Privilégier la visioconférence',
      description: 'Remplacer les déplacements professionnels par des réunions en ligne quand c\'est possible.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 60,
    },
    {
      category: 'déplacements',
      title: 'Passer à une flotte de véhicules électriques',
      description: 'Remplacer progressivement les véhicules thermiques par des véhicules électriques ou hybrides.',
      impact_level: 'high',
      difficulty_level: 'hard',
      potential_reduction_percent: 45,
    },
  ],
  achats: [
    {
      category: 'achats',
      title: 'Privilégier les fournisseurs locaux',
      description: 'Sélectionner des fournisseurs dans un rayon de 200 km réduit les émissions de transport et soutient l\'économie locale.',
      impact_level: 'high',
      difficulty_level: 'medium',
      potential_reduction_percent: 40,
    },
    {
      category: 'achats',
      title: 'Acheter du matériel reconditionné',
      description: 'Opter pour des équipements informatiques et du mobilier reconditionné réduit l\'impact de fabrication de 70%.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 70,
    },
    {
      category: 'achats',
      title: 'Mettre en place des critères RSE',
      description: 'Intégrer des critères environnementaux et sociaux dans votre politique d\'achats.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 30,
    },
  ],
  activité: [
    {
      category: 'activité',
      title: 'Optimiser la gestion des déchets',
      description: 'Mettre en place un tri sélectif complet, composter les biodéchets et travailler avec des filières de valorisation.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 25,
    },
    {
      category: 'activité',
      title: 'Réduire l\'usage du papier',
      description: 'Digitaliser les processus, imprimer recto-verso et utiliser du papier recyclé peut réduire les déchets de 60%.',
      impact_level: 'low',
      difficulty_level: 'easy',
      potential_reduction_percent: 15,
    },
    {
      category: 'activité',
      title: 'Former les équipes aux éco-gestes',
      description: 'Sensibiliser et former vos collaborateurs aux bonnes pratiques environnementales multiplie l\'impact.',
      impact_level: 'medium',
      difficulty_level: 'easy',
      potential_reduction_percent: 20,
    },
  ],
  numérique: [
    {
      category: 'numérique',
      title: 'Migrer vers un hébergement vert',
      description: 'Choisir un hébergeur utilisant des énergies renouvelables et optimisant ses data centers.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 40,
    },
    {
      category: 'numérique',
      title: 'Optimiser le code et les applications',
      description: 'Un code optimisé consomme moins de ressources serveur et d\'énergie. Former les équipes techniques aux bonnes pratiques.',
      impact_level: 'medium',
      difficulty_level: 'medium',
      potential_reduction_percent: 30,
    },
    {
      category: 'numérique',
      title: 'Prolonger la durée de vie des équipements',
      description: 'Passer d\'un renouvellement tous les 3 ans à tous les 5 ans réduit l\'impact de 40%.',
      impact_level: 'high',
      difficulty_level: 'easy',
      potential_reduction_percent: 40,
    },
  ],
};

export function generateRecommendations(
  profileType: 'individual' | 'business',
  topCategories: Array<{ category: string; emissions: number }>
): Array<{
  category: string;
  title: string;
  description: string;
  impact_level: 'high' | 'medium' | 'low';
  difficulty_level: 'easy' | 'medium' | 'hard';
  potential_reduction: number;
  priority: number;
}> {
  const recommendations =
    profileType === 'individual' ? individualRecommendations : businessRecommendations;

  const result: Array<{
    category: string;
    title: string;
    description: string;
    impact_level: 'high' | 'medium' | 'low';
    difficulty_level: 'easy' | 'medium' | 'hard';
    potential_reduction: number;
    priority: number;
  }> = [];

  topCategories.forEach((topCat, index) => {
    const categoryRecommendations = recommendations[topCat.category] || [];
    categoryRecommendations.forEach((rec, recIndex) => {
      const potentialReduction = (topCat.emissions * rec.potential_reduction_percent) / 100;
      result.push({
        ...rec,
        potential_reduction: potentialReduction,
        priority: index * 100 + recIndex,
      });
    });
  });

  result.sort((a, b) => {
    if (a.impact_level === 'high' && b.impact_level !== 'high') return -1;
    if (a.impact_level !== 'high' && b.impact_level === 'high') return 1;
    if (a.difficulty_level === 'easy' && b.difficulty_level !== 'easy') return -1;
    if (a.difficulty_level !== 'easy' && b.difficulty_level === 'easy') return 1;
    return b.potential_reduction - a.potential_reduction;
  });

  return result.slice(0, 8);
}
