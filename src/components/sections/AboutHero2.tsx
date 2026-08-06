export default function AboutHero2() {
  return (
    <section className="relative w-full h-screen min-h-screen bg-black overflow-hidden select-none">
      {/* ── Screen-Size Video Background (Version 2) - Natural size without zoom ── */}
      <video
        src="/assets/video/about-section/about_version2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
    </section>
  );
}
