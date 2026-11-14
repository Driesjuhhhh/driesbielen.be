export function AnimatedBackground() {
  return (
    <div aria-hidden className="portfolio-background fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <span className="background-glow background-glow--cyan" />
      <span className="background-glow background-glow--indigo" />
      <span className="background-glow background-glow--teal" />
    </div>
  );
}

export default AnimatedBackground;
