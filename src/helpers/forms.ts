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
