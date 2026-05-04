export function getCvUrl(lang: string, theme: string): string {
  const safeLang = ['en', 'es', 'dk'].includes(lang) ? lang : 'en';
  return `/cv/Eduardo_Inerarte_CV_${safeLang}_${theme}.pdf`;
}
