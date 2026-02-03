export function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-50 pointer-events-none">
      <div className="animated-bg absolute inset-0" />
      <div className="animated-blob blob1" />
      <div className="animated-blob blob2" />
      <div className="animated-grid" />
      <div className="animated-noise" />
    </div>
  );
}

export default AnimatedBackground;
