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

  // Transform SVG coords → Three.js coords (center + flip Y)
  const tx = (x: number) => x - cx;
  const ty = (y: number) => cy - y;

  // ── Shape 1: Top-left arrow piece ──
  // SVG: M0.56926 26.5283 L26.2157 0.576049
  //      C27.4317 -0.654514 29.511 0.217021 29.511 1.9573
  //      V29.8629 H1.93424
  //      C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283 Z
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

  // ── Shape 2: Bottom-right arrow piece ──
  // SVG: M42.4301 38.4713 L16.7836 64.4236
  //      C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424
  //      V35.1367 H41.0651
  //      C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713 Z
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

interface Logo3DProps {
  tintColor?: string;
  interactive?: boolean;
}

export default function Logo3D({ tintColor = '#8b5cf6', interactive = true }: Logo3DProps) {
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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 100;

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // ─── Environment Map (dark neutral for chrome contrast) ───
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();

    const skyGeo = new THREE.SphereGeometry(100, 32, 32);
    const skyColors = new Float32Array(skyGeo.attributes.position.count * 3);
    for (let i = 0; i < skyGeo.attributes.position.count; i++) {
      const y = skyGeo.attributes.position.getY(i);
      const t = (y + 100) / 200;
      const v = 0.02 + t * 0.10;
      skyColors[i * 3]     = v;
      skyColors[i * 3 + 1] = v;
      skyColors[i * 3 + 2] = v;
    }
    skyGeo.setAttribute('color', new THREE.Float32BufferAttribute(skyColors, 3));
    envScene.add(
      new THREE.Mesh(
        skyGeo,
        new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })
      )
    );

    // 3 Blue shades matched to hero background palette (#38bdf8, #2563eb, #1d4ed8)
    const spots = [
      { pos: [35, 30, 30], color: 0x38bdf8, r: 14 },   // Shade 1: Electric Sky Blue Glare Spot
      { pos: [40, -15, 20], color: 0x60a5fa, r: 12 },  // Shade 1 Accent: Bright Cyan Blue
      { pos: [-35, -30, 30], color: 0x2563eb, r: 14 }, // Shade 2: Royal Electric Blue Glare Spot
      { pos: [-40, 15, 20], color: 0x1d4ed8, r: 12 },  // Shade 3: Deep Ocean Blue Spot
      { pos: [0, 0, 45], color: 0x93c5fd, r: 8 },      // Soft Electric Blue Specular Core (No white!)
    ] as const;
    spots.forEach(({ pos, color, r }) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      m.position.set(pos[0], pos[1], pos[2]);
      envScene.add(m);
    });

    // Blurred PMREM environment map generation for dreamy, soft-focus shader reflections
    const envMap = pmremGenerator.fromScene(envScene, 0.25).texture;
    scene.environment = envMap;

    // ─── Material (Soft Blurry Metallic Shader Finish) ───
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#555555'),
      metalness: 0.92,
      roughness: 0.38,             // Diffuses specular highlights into smooth, soft, blurry blue glares
      clearcoat: 0.9,
      clearcoatRoughness: 0.25,    // Soft blurry clearcoat gloss
      reflectivity: 1.0,
      envMap,
      envMapIntensity: 4.8,        // Radiant, soft-focus blue shader glare
      side: THREE.DoubleSide,
    });

    // ─── Logo Geometry ───
    const shapes = createLogoShapes();
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 6,
      bevelEnabled: true,
      bevelThickness: 1.4,
      bevelSize: 1.0,
      bevelOffset: 0,
      bevelSegments: 12,
    };

    const group = new THREE.Group();
    shapes.forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geo, material);
      group.add(mesh);
    });

    // Center the whole group
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.set(-center.x, -center.y, -center.z);

    // Wrap in pivot so rotations happen around the center
    const pivot = new THREE.Group();
    pivot.add(group);
    scene.add(pivot);

    // ─── Lights (3 Matching Blue Background Shades) ───
    scene.add(new THREE.AmbientLight(0x0a1638, 0.6));

    // Shade 1: Electric Sky Blue Light (right/top)
    const cyanKey = new THREE.DirectionalLight(0x38bdf8, 5.0);
    cyanKey.position.set(40, 25, 30);
    scene.add(cyanKey);

    const cyanAccent = new THREE.PointLight(0x60a5fa, 4.2, 300);
    cyanAccent.position.set(35, -10, 45);
    scene.add(cyanAccent);

    // Shade 2: Royal Electric Blue Light (left/bottom)
    const blueKey = new THREE.DirectionalLight(0x2563eb, 5.0);
    blueKey.position.set(-40, -25, 30);
    scene.add(blueKey);

    // Shade 3: Deep Ocean Blue Light
    const deepBlueAccent = new THREE.PointLight(0x1d4ed8, 4.2, 300);
    deepBlueAccent.position.set(-35, 15, 45);
    scene.add(deepBlueAccent);

    // Front Fill Light: Electric Sky Blue Tint (Replaced plain white light)
    const frontFill = new THREE.DirectionalLight(0x93c5fd, 1.8);
    frontFill.position.set(0, 0, 60);
    scene.add(frontFill);

    // ─── Mouse tracking (optimized zero-reflow relative viewport tracking) ───
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (e: MouseEvent) => {
      if (
        !interactiveRef.current ||
        (typeof window !== 'undefined' && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches))
      ) {
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

    // ─── Animation loop with IntersectionObserver Visibility Pause ───
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

      time += 0.004;

      // Fast lerp toward mouse target position
      mouse.x += (mouse.tx - mouse.x) * 0.22;
      mouse.y += (mouse.ty - mouse.y) * 0.22;

      // Mouse-driven rotation + subtle idle sway
      pivot.rotation.y = mouse.x * 0.55 + Math.sin(time) * 0.08;
      pivot.rotation.x = -mouse.y * 0.4 + Math.cos(time * 0.7) * 0.04;

      // Subtle floating
      pivot.position.y = Math.sin(time * 1.3) * 0.6;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // ─── Resize ───
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
      material.dispose();
      shapes.forEach((_, i) => {
        const mesh = group.children[i] as THREE.Mesh;
        mesh.geometry.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [tintColor]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none lg:pointer-events-auto"
      style={{ touchAction: 'auto' }}
    />
  );
}
