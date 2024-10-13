import { OptionKeyValueType, PostRequestFormData } from "@/types/form";

const monthNamesFR = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
];

/**
 * Convertir une chaîne de date ISO en une date formatée comme '25 Nov 2023 à 14h30' en français.
 * @param isoDate - La chaîne de date ISO (par exemple, '2024-10-12T07:55:01.000000Z').
 * @returns Une chaîne de date formatée en français (par exemple, '25 Nov 2023 à 14h30').
 */
export const formatDateFR = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getUTCDate();
  const month = monthNamesFR[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} à ${hours}h${minutes}`;
};


type Option = {
  key: string;
  value: string;
};

/**
 * 
 * 
  Exemple d'utilisation :
  const optionsArray = [
    {
      key: "option_1",
      value: "Code d'ivoire"
    },
    {
      key: "option_2",
      value: "Congo"
    }
  ];
  const result = convertArrayToObject(optionsArray);
  console.log(result);

  Résultat attendu:
  {
    option_1: "Code d'ivoire",
    option_2: "Congo"
  }
 */
// Conversion des options de tableau en objet
export const convertArrayOptionToObject = (array: OptionKeyValueType[]): { [key: string]: string } => {
  return array.reduce((acc, current) => {
    acc[current.key] = current.value;
    return acc;
  }, {} as { [key: string]: string });
};

// Fonction helper pour formater les options dans chaque champ (field)
export const formatFieldsOptions = (form: PostRequestFormData): PostRequestFormData => {
  const updatedLignes = form.lignes.map((ligne) => {
    const updatedFields = ligne.fields.map((field) => {
      if (field.options) {
        // Si le champ a des options, les formater
        const formattedOptions = convertArrayOptionToObject(field.options);
        return { ...field, options: formattedOptions };
      }
      return field;
    });

    return { ...ligne, fields: updatedFields };
  });

  return { ...form, lignes: updatedLignes };
};

