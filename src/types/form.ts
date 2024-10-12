// Interface pour représenter un champ (field)
export interface FieldType {
  id: number;
  name: string;           // Nom du champ
  placeholder: string;    // Placeholder pour le champ
  required: boolean;      // Indique si le champ est requis
  crypted: boolean;       // Indique si le champ doit être chiffré
  type: string;           // Type du champ (ex: 'input')
  key: string;            // Clé unique du champ
}

// Interface pour représenter une ligne de champs (field line)
export interface FieldLigneType {
  id: number;
  column_count: number;   // Nombre de colonnes dans la ligne
  fields: FieldType[];    // Liste des champs dans la ligne
}

// Exemple de données conformes aux interfaces
export const exempleLignes: FieldLigneType[] = [
  {
    id: 5,
    column_count: 2,
    fields: [
      {
        id: 1,
        name: "Votre nom",
        placeholder: "Entrez votre tel",
        required: true,
        crypted: true,
        type: "input",
        key: "firstname"
      },
      {
        id: 2,
        name: "Telephone",
        placeholder: "Entrez votre tel",
        required: true,
        crypted: true,
        type: "input",
        key: "tel"
      }
    ]
  }
];

export interface PostRequestFormData {
  name: string;
  validated_user_id: string;
  lignes: FieldLigneType[];
}

