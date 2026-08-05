import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragShader = `
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uBeamY;
uniform float uBeamCurve;
uniform float uFlareAmount;
uniform float uIntensity;

varying vec2 vUv;

// Simple 2D simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  p.x *= aspect;

  // Subtle mouse influence
  p += uMouse * 0.08;

  float t = uTime * 0.35;

  // Gentle organic wave motion
  float n1 = snoise(vec2(p.x * 0.9 + t * 0.4, t * 0.2)) * 0.05;
  float n2 = snoise(vec2(p.x * 2.2 - t * 0.3, p.y * 1.2)) * 0.025;

  // Horizontal light beam path
  float waveOffset = (n1 + n2) * uBeamCurve;
  float beamYCenter = uBeamY + uBeamCurve * (p.x * p.x) * 0.22 + waveOffset;
  
  float rawDist = abs(p.y - beamYCenter);

  // Hourglass Flare scale: 1.0 in center (THIN), up to 3.2+ at corners (BIG!)
  float xNorm = p.x / aspect;
  float flareScale = 1.0 + uFlareAmount * (xNorm * xNorm);

  // Effective distance scaled down towards corners so glow expands vertically
  float dist = rawDist / flareScale;

  // Multi-tier luminance falloffs for rich glowing effect
  float core = exp(-dist * 42.0) * 2.5;         // Pure bright core (thin center)
  float innerGlow = exp(-dist * 12.0) * 1.6;    // Radiant purple (thin center, big corners)
  float midGlow = exp(-dist * 4.5) * 1.0;       // Electric violet bloom (thin center, big corners)
  float outerGlow = exp(-dist * 1.7) * 0.6;     // Cosmic indigo halo (thin center, big corners)

  // Darkened Color Palette matched to SavedColorBendsBackground (#2563eb, #3b82f6, #1d4ed8)
  vec3 bgTop = vec3(0.005, 0.009, 0.024);       // Deep midnight space blue
  vec3 bgBottom = vec3(0.002, 0.004, 0.012);    // Ultra dark obsidian black

  vec3 coreColor = vec3(0.85, 0.92, 1.0);        // Soft white-blue light core
  vec3 innerColor = vec3(0.20, 0.45, 0.85);      // Rich dark electric sky blue
  vec3 midColor = vec3(0.09, 0.25, 0.68);       // Deep royal blue
  vec3 outerColor = vec3(0.05, 0.14, 0.48);     // Midnight ocean halo

  // Vertical background color fill
  vec3 col = mix(bgBottom, bgTop, (vUv.y + 1.0) * 0.5);

  // Add light layers
  col += outerColor * outerGlow * uIntensity;
  col += midColor * midGlow * uIntensity;
  col += innerColor * innerGlow * uIntensity;
  col += coreColor * core * uIntensity;

  // Anti-banding subtle noise
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.018;
  col += dither;

  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface HeroLightBeamProps {
  className?: string;
  beamY?: number;       // Y offset of beam center (-1 to 1)
  beamCurve?: number;   // Curve depth factor
  flareAmount?: number; // How big the glow expands at left/right corners vs center
  intensity?: number;   // Brightness intensity multiplier
  interactive?: boolean;
}

export default function HeroLightBeam({
  className = '',
  beamY = -0.15,
  beamCurve = 0,
  flareAmount = 2.2,
  intensity = 1.25,
  interactive = true,
}: HeroLightBeamProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uBeamY: { value: beamY },
        uBeamCurve: { value: beamCurve },
        uFlareAmount: { value: flareAmount },
        uIntensity: { value: intensity },
      },
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.uResolution.value.set(w, h);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      const y = -((e.clientY / (window.innerHeight || 1)) * 2 - 1);
      targetMouseRef.current.set(x, y);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const clock = new THREE.Clock();
    let animId: number = 0;
    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          loop();
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const loop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      material.uniforms.uTime.value = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.lerp(targetMouseRef.current, 0.05);
      material.uniforms.uMouse.value.copy(mouseRef.current);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [beamY, beamCurve, flareAmount, intensity, interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}
