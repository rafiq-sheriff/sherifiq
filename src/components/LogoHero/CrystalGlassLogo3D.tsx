'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Convert the SHERIFIQ SVG logo paths into Three.js Shape objects.
 * The SVG viewBox is 0 0 43 65; we center it around origin and flip Y.
 */
function createLogoShapes(): THREE.Shape[] {
  const cx = 21.5;
  const cy = 32.5;

  const tx = (x: number) => x - cx;
  const ty = (y: number) => cy - y;

  // ── Shape 1: Top arrow piece ──
  const shape1 = new THREE.Shape();
  shape1.moveTo(tx(0.56926), ty(26.5283));
  shape1.lineTo(tx(26.2157), ty(0.576049));
  shape1.bezierCurveTo(
    tx(27.4317), ty(-0.654514),
    tx(29.511),  ty(0.217021),
    tx(29.511),  ty(1.9573)
  );
  shape1.lineTo(tx(29.511), ty(29.8629));
  shape1.lineTo(tx(1.93424), ty(29.8629));
  shape1.bezierCurveTo(
    tx(0.214465),  ty(29.8629),
    tx(-0.646802), ty(27.7588),
    tx(0.56926),   ty(26.5283)
  );

  // ── Shape 2: Bottom arrow piece ──
  const shape2 = new THREE.Shape();
  shape2.moveTo(tx(42.4301), ty(38.4713));
  shape2.lineTo(tx(16.7836), ty(64.4236));
  shape2.bezierCurveTo(
    tx(15.5676), ty(65.6541),
    tx(13.4883), ty(64.7826),
    tx(13.4883), ty(63.0424)
  );
  shape2.lineTo(tx(13.4883), ty(35.1367));
  shape2.lineTo(tx(41.0651), ty(35.1367));
  shape2.bezierCurveTo(
    tx(42.7848), ty(35.1367),
    tx(43.6461), ty(37.2408),
    tx(42.4301), ty(38.4713)
  );

  return [shape1, shape2];
}

interface CrystalGlassLogo3DProps {
  interactive?: boolean;
}

export default function CrystalGlassLogo3D({ interactive = true }: CrystalGlassLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef(interactive);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // ─── Scene ───
    const scene = new THREE.Scene();

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.z = 100;

    // ─── Renderer with High Precision & Tone Mapping ───
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ─── Environment Map for Prismatic Glass Refractions & Glare ───
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();

    // Dark sky backdrop
    const skyGeo = new THREE.SphereGeometry(100, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x050508 });
    envScene.add(new THREE.Mesh(skyGeo, skyMat));

    // Prismatic glare light sources for chromatic glass reflections (Cyan, Royal Blue, Electric Purple, White Rim)
    const glareSources = [
      { pos: [45, 45, 50], color: 0x38bdf8, r: 16 },  // Electric Cyan Glare
      { pos: [-45, -45, 50], color: 0x818cf8, r: 16 }, // Soft Prismatic Violet
      { pos: [50, -30, 40], color: 0x60a5fa, r: 14 },  // Sky Blue Bevel Highlight
      { pos: [-50, 30, 40], color: 0xc084fc, r: 14 },  // Magenta Dispersion Flare
      { pos: [0, 60, 30], color: 0xffffff, r: 12 },    // Bright Specular Core
      { pos: [0, -60, -30], color: 0x38bdf8, r: 15 },  // Rim Light Reflection
    ];
    glareSources.forEach(({ pos, color, r }) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      m.position.set(pos[0], pos[1], pos[2]);
      envScene.add(m);
    });

    const envMap = pmremGenerator.fromScene(envScene, 0.05).texture;
    scene.environment = envMap;

    // ─── Physical Crystal Glass Material ───
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.98,
      roughness: 0.04,          // Ultra-smooth, crystal clear surface finish
      metalness: 0.0,
      transmission: 0.96,       // Light passes through for real physical glass transparency
      ior: 1.52,                // Index of refraction for crystal glass
      thickness: 4.5,           // Internal refraction depth & caustics
      dispersion: 0.09,         // Chromatic dispersion (rainbow prismatic bevel edges!)
      reflectivity: 0.95,
      clearcoat: 1.0,           // Glossy clearcoat layer
      clearcoatRoughness: 0.02,
      envMapIntensity: 4.2,
      side: THREE.DoubleSide,
    });

    // ─── Logo Extruded Geometry ───
    const shapes = createLogoShapes();
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 6.5,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 1.6,
      bevelOffset: 0,
      bevelSegments: 20,
    };

    const group = new THREE.Group();
    shapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geo, crystalMaterial);
      group.add(mesh);
    });

    // Center pivot point
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.set(-center.x, -center.y, -center.z);

    const pivot = new THREE.Group();
    pivot.add(group);
    scene.add(pivot);

    // ─── Lighting Setup ───
    scene.add(new THREE.AmbientLight(0x050510, 0.5));

    // Directional Key Lights for Sharp Edge Specular Highlights & Bevel Flare
    const keyLight1 = new THREE.DirectionalLight(0xe0f2fe, 4.5);
    keyLight1.position.set(40, 35, 60);
    scene.add(keyLight1);

    const keyLight2 = new THREE.DirectionalLight(0x818cf8, 4.0);
    keyLight2.position.set(-40, -35, 50);
    scene.add(keyLight2);

    const rimLight = new THREE.PointLight(0x38bdf8, 5.0, 200);
    rimLight.position.set(0, 0, 80);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0xffffff, 2.5);
    topFill.position.set(0, 50, 20);
    scene.add(topFill);

    // ─── Mouse tracking ───
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (e: MouseEvent) => {
      if (!interactiveRef.current) {
        mouse.tx = 0;
        mouse.ty = 0;
        return;
      }
      mouse.tx = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
      mouse.ty = -(e.clientY / (window.innerHeight || 1) - 0.5) * 2;
    };
    const onMouseLeave = () => {
      mouse.tx = 0;
      mouse.ty = 0;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // ─── Animation loop with Visibility Observer ───
    let time = 0;
    let raf = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !raf) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }

      time += 0.005;

      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      // Mouse interactive tilt + smooth continuous 3D floating animation
      pivot.rotation.y = mouse.x * 0.5 + Math.sin(time) * 0.06;
      pivot.rotation.x = -mouse.y * 0.35 + Math.cos(time * 0.8) * 0.04;

      // Gentle floating animation
      pivot.position.y = Math.sin(time * 1.2) * 0.8;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // ─── Resize Handler ───
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ─── Cleanup ───
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      pmremGenerator.dispose();
      envMap.dispose();
      crystalMaterial.dispose();
      shapes.forEach((_, i) => {
        const mesh = group.children[i] as THREE.Mesh;
        mesh.geometry.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
