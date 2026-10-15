import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sun, Flame, Moon, Sparkles, Compass, Info, Flag, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientAudio } from '../utils/ambientAudio';

export const RamMandir3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLighting, setActiveLighting] = useState<'aarti' | 'dawn' | 'dusk'>('aarti');
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMandap, setActiveMandap] = useState<string | null>('shikhara');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const flagMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 11);
    camera.lookAt(0, 1.8, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffedd5, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
    dirLight.position.set(7, 14, 8);
    dirLightRef.current = dirLight;
    scene.add(dirLight);

    const backRim = new THREE.DirectionalLight(0xea580c, 1.4);
    backRim.position.set(-6, 6, -8);
    scene.add(backRim);

    // 5. Ram Mandir Architectural Model Construction (Nagara Style, 3-Tiered)
    const mandirGroup = new THREE.Group();

    // Sandstone Material (Bansi Paharpur Pink Sandstone tone)
    const sandstoneMat = new THREE.MeshStandardMaterial({
      color: 0xc27845,
      roughness: 0.45,
      metalness: 0.15,
    });

    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.8,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.2,
      metalness: 0.9,
    });

    // Tier 1: Monumental Elevated Jagati Plinth (Grand Terrace)
    const jagatiGeo = new THREE.BoxGeometry(7.2, 0.4, 11.0);
    const jagati = new THREE.Mesh(jagatiGeo, darkStoneMat);
    jagati.position.y = -0.2;
    mandirGroup.add(jagati);

    // Stepped Upper Plinth (Pitha with decorative molding)
    const pithaGeo = new THREE.BoxGeometry(6.4, 0.3, 9.8);
    const pitha = new THREE.Mesh(pithaGeo, sandstoneMat);
    pitha.position.y = 0.15;
    mandirGroup.add(pitha);

    // Grand Entrance Flight of Steps (Singh Dwar - 32 steps representation)
    for (let s = 0; s < 6; s++) {
      const stepGeo = new THREE.BoxGeometry(2.4 - s * 0.15, 0.08, 0.35);
      const step = new THREE.Mesh(stepGeo, sandstoneMat);
      step.position.set(0, -0.15 + s * 0.07, 5.1 + s * 0.25);
      mandirGroup.add(step);
    }

    // Five Interconnected Mandapas (Garbhagriha, Gudh, Rang, Nritya, Prarthana)
    // Structure Length: from z = -3.5 (Sanctum) to z = +3.8 (Entrance)
    const mandapaSections = [
      { name: 'sanctum', x: 0, y: 1.1, z: -2.6, w: 3.2, h: 1.8, d: 3.2, shikharaHeight: 4.8 },
      { name: 'gudh', x: 0, y: 0.95, z: -0.6, w: 2.8, h: 1.5, d: 2.4, shikharaHeight: 3.2 },
      { name: 'rang', x: 0, y: 0.9, z: 1.4, w: 3.4, h: 1.4, d: 2.2, shikharaHeight: 2.5 },
      { name: 'nritya', x: 0, y: 0.85, z: 3.2, w: 2.6, h: 1.3, d: 2.0, shikharaHeight: 2.0 }
    ];

    mandapaSections.forEach((section) => {
      // Main hall block
      const hallGeo = new THREE.BoxGeometry(section.w, section.h, section.d);
      const hall = new THREE.Mesh(hallGeo, sandstoneMat);
      hall.position.set(section.x, section.y, section.z);
      mandirGroup.add(hall);

      // Carved Pillars along hall perimeter
      const pCountX = 4;
      const pCountZ = 3;
      for (let ix = 0; ix < pCountX; ix++) {
        for (let iz = 0; iz < pCountZ; iz++) {
          if (ix === 0 || ix === pCountX - 1 || iz === 0 || iz === pCountZ - 1) {
            const px = section.x - section.w / 2 + (ix / (pCountX - 1)) * section.w * 0.95 + 0.08;
            const pz = section.z - section.d / 2 + (iz / (pCountZ - 1)) * section.d * 0.95 + 0.08;
            const pillarGeo = new THREE.CylinderGeometry(0.06, 0.08, section.h, 12);
            const pillar = new THREE.Mesh(pillarGeo, sandstoneMat);
            pillar.position.set(px, section.y, pz);
            mandirGroup.add(pillar);
          }
        }
      }
    });

    // Soaring Central Main Shikhara (Garbhagriha Spire - 161 feet proportion)
    const sanctumZ = -2.6;
    const sanctumY = 2.0;
    const shikharaTiers = 9;
    for (let t = 0; t < shikharaTiers; t++) {
      const scaleBottom = 1.4 * (1 - (t * 0.09));
      const scaleTop = 1.4 * (1 - ((t + 1) * 0.09));
      const tierGeo = new THREE.CylinderGeometry(scaleTop, scaleBottom, 0.35, 16);
      const tierMesh = new THREE.Mesh(tierGeo, sandstoneMat);
      tierMesh.position.set(0, sanctumY + t * 0.32, sanctumZ);
      mandirGroup.add(tierMesh);
    }

    // Top Amalaka (Ribbed Solar Disc) atop Main Shikhara
    const apexY = sanctumY + shikharaTiers * 0.32;
    const amalakaGeo = new THREE.TorusGeometry(0.38, 0.16, 12, 24);
    const amalaka = new THREE.Mesh(amalakaGeo, goldMat);
    amalaka.rotation.x = Math.PI / 2;
    amalaka.position.set(0, apexY + 0.08, sanctumZ);
    mandirGroup.add(amalaka);

    // Golden Kalash (Sacred Pinnacle Urn)
    const kalashGeo = new THREE.ConeGeometry(0.2, 0.6, 16);
    const kalash = new THREE.Mesh(kalashGeo, goldMat);
    kalash.position.set(0, apexY + 0.45, sanctumZ);
    mandirGroup.add(kalash);

    // Flagpole (Dhwaja Stambha)
    const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.1, 8);
    const pole = new THREE.Mesh(poleGeo, goldMat);
    pole.position.set(0, apexY + 0.95, sanctumZ);
    mandirGroup.add(pole);

    // Animated Saffron Dhwaja (Sacred Flag with Ram Navami Surya Motif)
    const flagGeo = new THREE.PlaneGeometry(0.65, 0.45, 12, 6);
    const flagMat = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      side: THREE.DoubleSide,
      roughness: 0.3,
    });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(0.35, apexY + 1.25, sanctumZ);
    mandirGroup.add(flagMesh);
    flagMeshRef.current = flagMesh;

    // Secondary Shikharas above Gudh Mandap and Rang Mandap
    const secondaryShikharas = [
      { z: -0.6, height: 2.2, tiers: 6 },
      { z: 1.4, height: 1.6, tiers: 4 }
    ];

    secondaryShikharas.forEach((sec) => {
      for (let st = 0; st < sec.tiers; st++) {
        const rB = 1.0 * (1 - (st * 0.12));
        const rT = 1.0 * (1 - ((st + 1) * 0.12));
        const sGeo = new THREE.CylinderGeometry(rT, rB, 0.28, 12);
        const sMesh = new THREE.Mesh(sGeo, sandstoneMat);
        sMesh.position.set(0, 1.7 + st * 0.25, sec.z);
        mandirGroup.add(sMesh);
      }
      // Mini golden kalash
      const mKalash = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 12), goldMat);
      mKalash.position.set(0, 1.7 + sec.tiers * 0.25 + 0.18, sec.z);
      mandirGroup.add(mKalash);
    });

    // 16 Flickering Golden Diyas around the Jagati terrace
    const diyaLights: THREE.PointLight[] = [];
    const diyaPositions = [
      [-3.3, 0.25, -4.5], [3.3, 0.25, -4.5], [-3.3, 0.25, 4.5], [3.3, 0.25, 4.5],
      [-3.3, 0.25, -1.5], [3.3, 0.25, -1.5], [-3.3, 0.25, 1.5], [3.3, 0.25, 1.5],
      [-1.5, 0.25, 5.0], [1.5, 0.25, 5.0], [-1.5, 0.25, -5.0], [1.5, 0.25, -5.0],
    ];

    diyaPositions.forEach(([dx, dy, dz]) => {
      // Small clay lamp base
      const dBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0x9a3412 }));
      dBase.position.set(dx, dy, dz);
      mandirGroup.add(dBase);

      // Golden flame light
      const pLight = new THREE.PointLight(0xf59e0b, 0.8, 3.5);
      pLight.position.set(dx, dy + 0.1, dz);
      mandirGroup.add(pLight);
      diyaLights.push(pLight);
    });

    scene.add(mandirGroup);

    // 6. Sacred Floating Incense / Golden Sparks
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = Math.random() * 8;
      positions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Interactive Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mandirGroup.rotation.y += deltaX * 0.007;
      mandirGroup.rotation.x = Math.max(-0.25, Math.min(0.4, mandirGroup.rotation.x + deltaY * 0.004));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 8. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle auto-rotation
      if (autoRotate && !isDragging) {
        mandirGroup.rotation.y += 0.0035;
      }

      // Animated Flag Wave (Simulating Sacred Flutter)
      if (flagMeshRef.current) {
        const flagPosition = flagMeshRef.current.geometry.attributes.position;
        for (let i = 0; i < flagPosition.count; i++) {
          const u = flagPosition.getX(i);
          const wave = Math.sin(time * 6 + u * 5) * 0.08 * (u + 0.3);
          flagPosition.setZ(i, wave);
        }
        flagPosition.needsUpdate = true;
      }

      // Subtle diya flicker
      diyaLights.forEach((light, idx) => {
        light.intensity = 0.65 + Math.sin(time * 8 + idx) * 0.25;
      });

      // Floating holy particles
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Lighting Mode Handler
  useEffect(() => {
    if (!dirLightRef.current || !sceneRef.current) return;
    if (activeLighting === 'aarti') {
      dirLightRef.current.color.setHex(0xf59e0b);
      dirLightRef.current.intensity = 3.2;
      sceneRef.current.background = new THREE.Color(0x000000);
    } else if (activeLighting === 'dawn') {
      dirLightRef.current.color.setHex(0xfed7aa);
      dirLightRef.current.intensity = 2.4;
      sceneRef.current.background = new THREE.Color(0x0a0502);
    } else if (activeLighting === 'dusk') {
      dirLightRef.current.color.setHex(0xea580c);
      dirLightRef.current.intensity = 2.8;
      sceneRef.current.background = new THREE.Color(0x0f0805);
    }
  }, [activeLighting]);

  return (
    <div className="w-full h-full flex flex-col bg-black relative overflow-hidden select-none">
      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full flex-1 relative cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto bg-zinc-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-zinc-100">
            Ayodhya Shri Ram Mandir • 3D Architectural Model
          </span>
          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Nagara Style
          </span>
        </div>

        {/* Atmosphere & Aarti Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-zinc-950/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
          {/* Perform Aarti Ceremony */}
          <button
            onClick={() => {
              setActiveLighting('aarti');
              ambientAudio.playAartiChimeSequence();
              confetti({
                colors: ['#f59e0b', '#ea580c', '#fde047', '#ffedd5'],
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
              });
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
            title="Begin Sacred Aarti with Chimes and Floral Shower"
          >
            <Flame className="w-3.5 h-3.5 text-black" />
            <span>Aarti Ceremony</span>
          </button>

          {/* Ring Bell */}
          <button
            onClick={() => ambientAudio.playTempleBell(720, 0.35)}
            className="p-1.5 px-2.5 rounded-lg text-xs font-semibold text-amber-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer border border-amber-500/20"
            title="Ring Sacred Temple Bell"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Ring Bell</span>
          </button>

          <button
            onClick={() => setActiveLighting('dawn')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              activeLighting === 'dawn' ? 'bg-amber-500 text-black shadow-sm font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dawn</span>
          </button>
          <button
            onClick={() => setActiveLighting('dusk')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              activeLighting === 'dusk' ? 'bg-amber-500 text-black shadow-sm font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dusk</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs transition-all border-l border-zinc-800 ml-1 cursor-pointer ${
              autoRotate ? 'text-amber-400' : 'text-zinc-600'
            }`}
            title="Toggle Orbit Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* Bottom Architectural Anatomy Selector */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {[
            { id: 'shikhara', title: '161-ft Main Shikhara & Flag' },
            { id: 'mandapas', title: '5 Mandapa Pavilions' },
            { id: 'pillars', title: '366 Carved Pillars' },
            { id: 'jagati', title: 'Elevated Jagati & 32 Steps' },
          ].map((part) => (
            <button
              key={part.id}
              onClick={() => setActiveMandap(activeMandap === part.id ? null : part.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeMandap === part.id
                  ? 'bg-amber-500 text-black shadow-sm font-bold'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white'
              }`}
            >
              {part.title}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto text-[11px] text-zinc-400 bg-zinc-950/90 px-3 py-1.5 rounded-full border border-white/10 hidden sm:flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Click & drag to orbit • Animated Saffron Dhwaja</span>
        </div>
      </div>

      {/* Architectural Specs Popover */}
      {activeMandap && (
        <div className="absolute top-18 right-4 max-w-xs p-4 rounded-2xl bg-zinc-950/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl text-zinc-100 z-20">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-1">
            <span>Ayodhya Architecture</span>
            <Flag className="w-3 h-3 text-amber-400" />
          </div>
          <h4 className="font-heritage text-sm font-bold text-white">
            {activeMandap === 'shikhara' && 'Main Shikhara & Saffron Dhwaja'}
            {activeMandap === 'mandapas' && 'Five Sacred Mandapas'}
            {activeMandap === 'pillars' && '366 Hand-Carved Pillars'}
            {activeMandap === 'jagati' && 'Elevated Jagati & Singh Dwar'}
          </h4>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            {activeMandap === 'shikhara' && 'The central sanctum spire soars 161 feet high, built with interlocking stone without steel or iron. It is crowned with a 3-ton golden Kalash and an animated fluttering saffron flag depicting the Sun.'}
            {activeMandap === 'mandapas' && 'Comprises Kudu Mandap, Rang Mandap, Nritya Mandap, Kirtan Mandap, and Prarthana Mandap, allowing devotees to experience varied devotional atmospheres.'}
            {activeMandap === 'pillars' && 'Features 366 uniquely sculpted stone pillars made of Rajasthan Bansi Paharpur pink sandstone, depicting 16 statues of deities on each column.'}
            {activeMandap === 'jagati' && 'Elevated 16.5-foot stone platform approached through the eastern Singh Dwar with 32 steps, safeguarding against floods with earthquake-resistant engineering.'}
          </p>
        </div>
      )}
    </div>
  );
};
