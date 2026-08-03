import HeroLightBeam from './HeroLightBeam';

/**
 * Saved Blue Wave Light Beam Background
 * Retained per user request for future reuse.
 */
export default function SavedBlueWaveLightBeam() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <HeroLightBeam beamY={-0.15} beamCurve={0} flareAmount={2.2} intensity={0.95} interactive={true} />
    </div>
  );
}
