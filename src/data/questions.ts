export interface Question {
  key: string;
  category: string;
  text: string;
  options: {
    label: string;
    value: string;
    coefficient: number;
  }[];
}

export const individualQuestions: Question[] = [
  {
    key: 'housing_type',
    category: 'logement',
    text: 'Quel type de logement habitez-vous ?',
    options: [
      { label: 'Appartement (<50m²)', value: 'apt_small', coefficient: 0.8 },
      { label: 'Appartement (50-100m²)', value: 'apt_medium', coefficient: 1.2 },
      { label: 'Appartement (>100m²)', value: 'apt_large', coefficient: 1.8 },
      { label: 'Maison (<100m²)', value: 'house_small', coefficient: 1.5 },
      { label: 'Maison (>100m²)', value: 'house_large', coefficient: 2.5 },
    ],
  },
  {
    key: 'heating',
    category: 'logement',
    text: 'Quel est votre mode de chauffage principal ?',
    options: [
      { label: 'Électricité', value: 'electric', coefficient: 0.5 },
      { label: 'Gaz naturel', value: 'gas', coefficient: 1.2 },
      { label: 'Fioul', value: 'oil', coefficient: 2.5 },
      { label: 'Bois/Pompe à chaleur', value: 'renewable', coefficient: 0.3 },
    ],
  },
  {
    key: 'energy_consumption',
    category: 'logement',
    text: 'Quelle est votre consommation énergétique ?',
    options: [
      { label: 'Très économe (DPE A-B)', value: 'low', coefficient: 0.3 },
      { label: 'Moyenne (DPE C-D)', value: 'medium', coefficient: 0.8 },
      { label: 'Élevée (DPE E-F-G)', value: 'high', coefficient: 1.5 },
    ],
  },
  {
    key: 'daily_transport',
    category: 'transports',
    text: 'Quel est votre mode de transport quotidien principal ?',
    options: [
      { label: 'Marche/Vélo', value: 'walk_bike', coefficient: 0 },
      { label: 'Transports en commun', value: 'public', coefficient: 0.3 },
      { label: 'Voiture électrique', value: 'electric_car', coefficient: 0.5 },
      { label: 'Voiture thermique (seul)', value: 'car_alone', coefficient: 2.0 },
      { label: 'Voiture thermique (covoiturage)', value: 'car_shared', coefficient: 1.0 },
    ],
  },
  {
    key: 'annual_km',
    category: 'transports',
    text: 'Combien de kilomètres parcourez-vous par an en voiture ?',
    options: [
      { label: 'Moins de 5 000 km', value: 'low', coefficient: 0.3 },
      { label: '5 000 à 15 000 km', value: 'medium', coefficient: 1.2 },
      { label: 'Plus de 15 000 km', value: 'high', coefficient: 2.5 },
    ],
  },
  {
    key: 'flights',
    category: 'transports',
    text: 'Combien de vols en avion par an ?',
    options: [
      { label: 'Aucun', value: 'none', coefficient: 0 },
      { label: '1-2 courts courriers', value: 'short', coefficient: 0.5 },
      { label: '1 long courrier ou 3-4 courts courriers', value: 'medium', coefficient: 1.5 },
      { label: 'Plus de 2 longs courriers', value: 'high', coefficient: 3.5 },
    ],
  },
  {
    key: 'diet',
    category: 'alimentation',
    text: 'Quel est votre régime alimentaire ?',
    options: [
      { label: 'Végétalien', value: 'vegan', coefficient: 0.8 },
      { label: 'Végétarien', value: 'vegetarian', coefficient: 1.2 },
      { label: 'Peu de viande (1-2 fois/semaine)', value: 'flexitarian', coefficient: 1.5 },
      { label: 'Viande régulièrement', value: 'regular_meat', coefficient: 2.0 },
      { label: 'Viande tous les jours', value: 'daily_meat', coefficient: 2.8 },
    ],
  },
  {
    key: 'local_food',
    category: 'alimentation',
    text: 'Privilégiez-vous les produits locaux et de saison ?',
    options: [
      { label: 'Toujours', value: 'always', coefficient: 0.3 },
      { label: 'Souvent', value: 'often', coefficient: 0.6 },
      { label: 'Parfois', value: 'sometimes', coefficient: 0.9 },
      { label: 'Rarement', value: 'rarely', coefficient: 1.2 },
    ],
  },
  {
    key: 'food_waste',
    category: 'alimentation',
    text: 'Jetez-vous de la nourriture ?',
    options: [
      { label: 'Jamais ou presque', value: 'never', coefficient: 0.1 },
      { label: 'Peu', value: 'little', coefficient: 0.3 },
      { label: 'Régulièrement', value: 'often', coefficient: 0.6 },
    ],
  },
  {
    key: 'shopping_habits',
    category: 'consommation',
    text: 'À quelle fréquence achetez-vous des vêtements neufs ?',
    options: [
      { label: 'Très rarement (occasion/durable)', value: 'rare', coefficient: 0.2 },
      { label: 'Quelques fois par an', value: 'occasional', coefficient: 0.5 },
      { label: 'Mensuellement', value: 'monthly', coefficient: 1.0 },
      { label: 'Fréquemment (fast-fashion)', value: 'frequent', coefficient: 1.8 },
    ],
  },
  {
    key: 'electronics',
    category: 'consommation',
    text: 'À quelle fréquence renouvelez-vous vos appareils électroniques ?',
    options: [
      { label: 'Le moins possible (réparation)', value: 'minimal', coefficient: 0.3 },
      { label: 'Tous les 4-5 ans', value: 'moderate', coefficient: 0.6 },
      { label: 'Tous les 2-3 ans', value: 'regular', coefficient: 1.0 },
      { label: 'Chaque année', value: 'frequent', coefficient: 1.5 },
    ],
  },
  {
    key: 'consumption_habits',
    category: 'consommation',
    text: 'Vos habitudes de consommation générales :',
    options: [
      { label: 'Minimaliste', value: 'minimal', coefficient: 0.3 },
      { label: 'Modérée', value: 'moderate', coefficient: 0.8 },
      { label: 'Standard', value: 'standard', coefficient: 1.2 },
      { label: 'Importante', value: 'high', coefficient: 2.0 },
    ],
  },
  {
    key: 'digital_usage',
    category: 'numérique',
    text: 'Votre usage du numérique (streaming, réseaux sociaux) :',
    options: [
      { label: 'Limité (<1h/jour)', value: 'low', coefficient: 0.1 },
      { label: 'Modéré (1-3h/jour)', value: 'medium', coefficient: 0.3 },
      { label: 'Important (3-6h/jour)', value: 'high', coefficient: 0.5 },
      { label: 'Très important (>6h/jour)', value: 'very_high', coefficient: 0.8 },
    ],
  },
  {
    key: 'devices',
    category: 'numérique',
    text: 'Combien d\'appareils numériques possédez-vous ?',
    options: [
      { label: '1-2 appareils', value: 'minimal', coefficient: 0.1 },
      { label: '3-5 appareils', value: 'moderate', coefficient: 0.3 },
      { label: '6-10 appareils', value: 'many', coefficient: 0.5 },
      { label: 'Plus de 10 appareils', value: 'very_many', coefficient: 0.8 },
    ],
  },
];

export const businessQuestions: Question[] = [
  {
    key: 'building_size',
    category: 'énergie',
    text: 'Quelle est la surface de vos locaux ?',
    options: [
      { label: 'Moins de 100m²', value: 'small', coefficient: 1.5 },
      { label: '100-500m²', value: 'medium', coefficient: 4.0 },
      { label: '500-1000m²', value: 'large', coefficient: 8.0 },
      { label: 'Plus de 1000m²', value: 'very_large', coefficient: 15.0 },
    ],
  },
  {
    key: 'energy_source',
    category: 'énergie',
    text: 'Quelle est votre source d\'énergie principale ?',
    options: [
      { label: 'Électricité renouvelable', value: 'renewable', coefficient: 0.5 },
      { label: 'Électricité standard', value: 'electric', coefficient: 1.2 },
      { label: 'Gaz', value: 'gas', coefficient: 2.5 },
      { label: 'Mix énergétique', value: 'mix', coefficient: 1.8 },
    ],
  },
  {
    key: 'employees',
    category: 'déplacements',
    text: 'Combien d\'employés dans votre entreprise ?',
    options: [
      { label: '1-5 employés', value: 'micro', coefficient: 0.5 },
      { label: '6-20 employés', value: 'small', coefficient: 2.0 },
      { label: '21-50 employés', value: 'medium', coefficient: 5.0 },
      { label: 'Plus de 50 employés', value: 'large', coefficient: 10.0 },
    ],
  },
  {
    key: 'commute',
    category: 'déplacements',
    text: 'Mode de déplacement principal des employés :',
    options: [
      { label: 'Télétravail majoritaire', value: 'remote', coefficient: 0.2 },
      { label: 'Transports en commun', value: 'public', coefficient: 0.8 },
      { label: 'Voiture individuelle', value: 'car', coefficient: 2.5 },
      { label: 'Mix de transports', value: 'mixed', coefficient: 1.5 },
    ],
  },
  {
    key: 'business_travel',
    category: 'déplacements',
    text: 'Fréquence des déplacements professionnels :',
    options: [
      { label: 'Rares (visio privilégiée)', value: 'rare', coefficient: 0.3 },
      { label: 'Occasionnels (régional)', value: 'occasional', coefficient: 1.5 },
      { label: 'Réguliers (national)', value: 'regular', coefficient: 3.5 },
      { label: 'Fréquents (international)', value: 'frequent', coefficient: 7.0 },
    ],
  },
  {
    key: 'supply_chain',
    category: 'achats',
    text: 'Vos achats de matières premières/produits :',
    options: [
      { label: 'Locaux et éco-responsables', value: 'local_eco', coefficient: 1.0 },
      { label: 'Majoritairement locaux', value: 'mostly_local', coefficient: 2.0 },
      { label: 'Mix local/international', value: 'mixed', coefficient: 4.0 },
      { label: 'Majoritairement importés', value: 'imported', coefficient: 6.0 },
    ],
  },
  {
    key: 'equipment',
    category: 'achats',
    text: 'Politique d\'achat d\'équipements :',
    options: [
      { label: 'Reconditionné/durable', value: 'refurbished', coefficient: 0.5 },
      { label: 'Neuf avec critères éco', value: 'eco_new', coefficient: 1.0 },
      { label: 'Standard', value: 'standard', coefficient: 1.8 },
      { label: 'Renouvellement fréquent', value: 'frequent', coefficient: 3.0 },
    ],
  },
  {
    key: 'activity_type',
    category: 'activité',
    text: 'Type d\'activité principale :',
    options: [
      { label: 'Services (bureau)', value: 'services', coefficient: 1.0 },
      { label: 'Commerce/Retail', value: 'retail', coefficient: 2.5 },
      { label: 'Production légère', value: 'light_production', coefficient: 4.0 },
      { label: 'Production industrielle', value: 'industrial', coefficient: 8.0 },
    ],
  },
  {
    key: 'waste_management',
    category: 'activité',
    text: 'Gestion des déchets :',
    options: [
      { label: 'Tri et valorisation systématiques', value: 'excellent', coefficient: 0.3 },
      { label: 'Tri partiel', value: 'good', coefficient: 0.8 },
      { label: 'Tri basique', value: 'basic', coefficient: 1.5 },
      { label: 'Peu de tri', value: 'poor', coefficient: 2.5 },
    ],
  },
  {
    key: 'digital_infrastructure',
    category: 'numérique',
    text: 'Infrastructure numérique :',
    options: [
      { label: 'Cloud éco-responsable', value: 'eco_cloud', coefficient: 0.3 },
      { label: 'Cloud standard', value: 'standard_cloud', coefficient: 0.8 },
      { label: 'Serveurs locaux optimisés', value: 'optimized_local', coefficient: 1.2 },
      { label: 'Serveurs locaux standards', value: 'standard_local', coefficient: 2.0 },
    ],
  },
  {
    key: 'digital_practices',
    category: 'numérique',
    text: 'Pratiques numériques de l\'entreprise :',
    options: [
      { label: 'Politique numérique responsable', value: 'responsible', coefficient: 0.2 },
      { label: 'Sensibilisation en cours', value: 'aware', coefficient: 0.6 },
      { label: 'Standard', value: 'standard', coefficient: 1.0 },
      { label: 'Peu d\'attention', value: 'low_attention', coefficient: 1.5 },
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  logement: 'Logement',
  transports: 'Transports',
  alimentation: 'Alimentation',
  consommation: 'Consommation',
  numérique: 'Numérique',
  énergie: 'Énergie',
  déplacements: 'Déplacements',
  achats: 'Achats',
  activité: 'Activité',
};
