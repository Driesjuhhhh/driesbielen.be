const CV_URL_NL = 'https://canva.link/vxnu27dtrlh5cq0';
const CV_URL_EN = 'https://canva.link/k8tnkckzwzj2ab1';

export function getCvUrl(): string {
  if (typeof navigator === 'undefined') return CV_URL_EN;
  return navigator.language.toLowerCase().startsWith('nl') ? CV_URL_NL : CV_URL_EN;
}
