import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sun, Moon, Sparkles, Box, Info } from 'lucide-react';

export const ThreeHeritageViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<'gold' | 'silver' | 'amber'>('gold');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('shikhara');
  const [autoRotate, setAutoRotate] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with Pure Deep Black Background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 8.8);
    camera.lookAt(0, 1.3, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lights - Dramatic museum rim & key lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.6);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    dirLight.position.set(6, 12, 6);
    directionalLightRef.current = dirLight;
    scene.add(dirLight);

    const backRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    backRimLight.position.set(-6, 4, -6);
    scene.add(backRimLight);

    // 5. Build 3D Architectural Temple & Spire Geometry
    const templeGroup = new THREE.Group();

    // Dark Obsidian Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(4.2, 4.6, 0.35, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.2;
    templeGroup.add(baseMesh);

    // Golden Stepped Terraces (Pitha)
    const tierGeo = new THREE.CylinderGeometry(3.2, 3.7, 0.25, 24);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.25,
      metalness: 0.7,
    });
    const tierMesh = new THREE.Mesh(tierGeo, goldMat);
    tierMesh.position.y = 0.12;
    templeGroup.add(tierMesh);

    // Sacred Sanctum Hall (Garbhagriha & Mandapa)
    const mandapaGeo = new THREE.BoxGeometry(2.2, 1.3, 2.2);
    const mandapaMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.4,
      metalness: 0.5,
    });
    const mandapa = new THREE.Mesh(mandapaGeo, mandapaMat);
    mandapa.position.y = 0.9;
    templeGroup.add(mandapa);

    // 8 Elegant Slender Columns
    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.3, 12);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 });
    const pillarOffsets = [
      [-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3],
      [0, -1.35], [0, 1.35], [-1.35, 0], [1.35, 0]
    ];
    pillarOffsets.forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 0.9, pz);
      templeGroup.add(pillar);
    });

    // Curvilinear Shikhara / Mountain Spire
    const spireGroup = new THREE.Group();
    const levels = 7;
    for (let i = 0; i < levels; i++) {
      const rTop = 1.1 * (1 - i / levels);
      const rBottom = 1.4 * (1 - (i - 0.2) / levels);
      const levelGeo = new THREE.CylinderGeometry(rTop, rBottom, 0.38, 16);
      const levelMesh = new THREE.Mesh(levelGeo, new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xd97706 : 0x78350f,
        roughness: 0.3,
        metalness: 0.65,
      }));
      levelMesh.position.y = 1.55 + i * 0.36;
      spireGroup.add(levelMesh);
    }

    // Amalaka (Ribbed Sun Disc Crown)
    const amalakaGeo = new THREE.TorusGeometry(0.3, 0.14, 12, 24);
    const amalakaMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, metalness: 0.9, roughness: 0.1 });
    const amalaka = new THREE.Mesh(amalakaGeo, amalakaMat);
    amalaka.rotation.x = Math.PI / 2;
    amalaka.position.y = 1.55 + levels * 0.36 + 0.1;
    spireGroup.add(amalaka);

    // Sacred Kalasha (Golden Pinnacle Finial)
    const kalashaGeo = new THREE.ConeGeometry(0.18, 0.55, 16);
    const kalasha = new THREE.Mesh(kalashaGeo, amalakaMat);
    kalasha.position.y = 1.55 + levels * 0.36 + 0.42;
    spireGroup.add(kalasha);

    templeGroup.add(spireGroup);
    scene.add(templeGroup);

    // 6. Floating Golden Firefly Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = Math.random() * 7;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Interactive Drag to Orbit
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
      templeGroup.rotation.y += deltaX * 0.007;
      templeGroup.rotation.x = Math.max(-0.35, Math.min(0.35, templeGroup.rotation.x + deltaY * 0.004));
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
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging) {
        templeGroup.rotation.y += 0.004;
      }
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize
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

  // Lighting theme switch
  useEffect(() => {
    if (!directionalLightRef.current || !ambientLightRef.current || !sceneRef.current) return;
    if (activeTheme === 'gold') {
      directionalLightRef.current.color.setHex(0xf59e0b);
      directionalLightRef.current.intensity = 2.6;
    } else if (activeTheme === 'amber') {
      directionalLightRef.current.color.setHex(0xea580c);
      directionalLightRef.current.intensity = 2.8;
    } else if (activeTheme === 'silver') {
      directionalLightRef.current.color.setHex(0xe0f2fe);
      directionalLightRef.current.intensity = 2.0;
    }
  }, [activeTheme]);

  return (
    <div className="w-full h-full flex flex-col bg-black relative overflow-hidden select-none">
      {/* Real-time WebGL Canvas */}
      <div 
        ref={containerRef} 
        className="w-full flex-1 relative cursor-grab active:cursor-grabbing"
      />

      {/* Sleek Minimalist Top HUD Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto bg-zinc-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
          <Box className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-zinc-200">
            3D Sacred Temple Shikhara • Real-time WebGL
          </span>
        </div>

        {/* Lighting Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-zinc-950/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
          {[
            { id: 'gold', label: 'Golden Light' },
            { id: 'amber', label: 'Sacred Amber' },
            { id: 'silver', label: 'Moonlit Silver' },
          ].map(theme => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTheme === theme.id 
                  ? 'bg-amber-500 text-black shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {theme.label}
            </button>
          ))}
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

      {/* Bottom Minimalist Hotspots */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {[
            { id: 'shikhara', title: 'Mountain Spire (Shikhara)' },
            { id: 'kalasha', title: 'Pinnacle Urn (Kalasha)' },
            { id: 'mandapa', title: 'Pillared Hall (Mandapa)' },
            { id: 'jagati', title: 'Terrace Plinth (Jagati)' },
          ].map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedHotspot(selectedHotspot === part.id ? null : part.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedHotspot === part.id
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white'
              }`}
            >
              {part.title}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto text-[11px] text-zinc-400 bg-zinc-950/90 px-3 py-1.5 rounded-full border border-white/10 hidden sm:flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Click & drag to rotate 3D view</span>
        </div>
      </div>

      {/* Hotspot Floating Dossier */}
      {selectedHotspot && (
        <div className="absolute top-18 right-4 max-w-xs p-4 rounded-2xl bg-zinc-950/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl text-zinc-100 z-20">
          <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-1">
            Architectural Geometry
          </div>
          <h4 className="font-heritage text-sm font-bold text-white">
            {selectedHotspot === 'shikhara' && 'Nagara Shikhara (Mountain Spire)'}
            {selectedHotspot === 'kalasha' && 'Golden Kalasha & Amalaka'}
            {selectedHotspot === 'mandapa' && 'Pillared Mandapa Assembly'}
            {selectedHotspot === 'jagati' && 'Elevated Jagati Terrace'}
          </h4>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            {selectedHotspot === 'shikhara' && 'Modeled after Mount Meru, rising in curvilinear mathematical tiers toward unity with the cosmic center.'}
            {selectedHotspot === 'kalasha' && 'The fluted solar stone wheel (Amalaka) topped by the sacred water pot (Kalasha), conducting spiritual resonance.'}
            {selectedHotspot === 'mandapa' && 'Open pillared pavilion where pilgrims chant and congregate before entering the inner sanctum.'}
            {selectedHotspot === 'jagati' && 'Stone terrace raising the sacred monument above mundane ground, designed for clockwise circumambulation (Pradakshina).'}
          </p>
        </div>
      )}
    </div>
  );
};
