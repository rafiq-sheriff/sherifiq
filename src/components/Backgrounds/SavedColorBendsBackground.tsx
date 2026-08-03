import ColorBends from '../LogoHero/ColorBends';

/**
 * Saved Background Component (ColorBends)
 * Retained for future use per user request.
 */
export default function SavedColorBendsBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <ColorBends
        colors={["#2563eb", "#3b82f6", "#1d4ed8"]}
        rotation={90}
        speed={0.4}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        noise={0}
        parallax={0.5}
        iterations={1}
        intensity={2.2}
        bandWidth={6}
        transparent
        autoRotate={0}
        color="#2563eb"
      />
    </div>
  );
}
