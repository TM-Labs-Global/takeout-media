'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uParallax;
  uniform float uUvScale;
  uniform float uShaderMultiplier;

  vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageResolution);
    uv.x += uParallax * uShaderMultiplier;
    uv -= 0.5;
    uv *= uUvScale; 
    uv += 0.5;
    vec3 col = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const PROJECTS = [
  {
    title: "SURWASH",
    description: "Empowering a WASH Revolution with SURWASH: A Data-driven Social & Behavioral Change Communication Campaign.",
    src: "/pictures/surwash/surwash-softcover.png",
    href: "#"
  },
  {
    title: "NIS",
    description: "Reshaping the Narrative - Nigerian Police Reform.",
    src: "/pictures/nis/stage2.jpg",
    href: "#"
  },
  {
    title: "DELIGHT FINANCE",
    description: "Building the Future of Real Estate with Cosgrove.",
    src: "/pictures/delight-finance/phone-mockup.png",
    href: "#"
  },
  {
    title: "RIPPLE",
    description: "Brand Launch",
    src: "/pictures/ripple/city-billboard-mockup.png",
    href: "#"
  },
  {
    title: "TOTAL ENERGIES",
    description: "Energizing a Global Brand: TotalEnergies’ Journey to Sustainability",
    src: "/pictures/total/te-vals-day-poster-01.png",
    href: "#"
  },
  {
    title: "TOKUNBO",
    description: "Everything is on the line. The journey continues.",
    src: "/pictures/tokunbo/artboard1-large.jpeg",
    href: "#"
  }
];

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export const OurProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState('400vh');

  const state = useRef({
    scroll: { current: 0, target: 0, ease: 0.08, limit: 0 },
    medias: [] as {
      el: HTMLImageElement;
      mesh: THREE.Mesh;
      material: THREE.ShaderMaterial;
      textEl: HTMLDivElement | null;
    }[],
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    viewport: { width: 0, height: 0 }
  });

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // 1. Scene Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fov = 2 * Math.atan(window.innerHeight / 2 / 100) * (180 / Math.PI);
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    state.current.renderer = renderer;
    state.current.scene = scene;
    state.current.camera = camera;
    state.current.viewport = { width: window.innerWidth, height: window.innerHeight };

    // 2. Meshes Creation
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    const textureLoader = new THREE.TextureLoader();

    const initMeshes = () => {
      // Clear existing meshes if any (prevent duplication on hot reload)
      state.current.medias.forEach(m => scene.remove(m.mesh));
      state.current.medias = [];

      const cardEls = document.querySelectorAll('.project-card');
      cardEls.forEach((card) => {
        const img = card.querySelector('.gallery-media-proxy') as HTMLImageElement;
        const text = card.querySelector('.project-card-text') as HTMLDivElement;
        if (!img) return;

        const texture = textureLoader.load(img.src, (tex) => {
          material.uniforms.uImageResolution.value.set(tex.image.width, tex.image.height);
        });

        const bounds = img.getBoundingClientRect();
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector2(bounds.width, bounds.height) },
            uImageResolution: { value: new THREE.Vector2(1, 1) },
            uParallax: { value: 0 },
            uUvScale: { value: 0.82 },
            uShaderMultiplier: { value: 1.2 },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(bounds.width, bounds.height, 1);
        scene.add(mesh);

        state.current.medias.push({
          el: img,
          mesh,
          material,
          textEl: text
        });
      });
    };

    // 3. ScrollTrigger Logic
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80px',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        state.current.scroll.target = self.progress * state.current.scroll.limit;
      }
    });

    // 4. Animation Loop
    const render = () => {
      const { scroll, medias, renderer, scene, camera, viewport } = state.current;
      if (!renderer || !scene || !camera) return;

      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${-scroll.current}px)`;
      }

      medias.forEach((item) => {
        const { mesh, material, el, textEl } = item;

        const bounds = el.getBoundingClientRect();
        const x = bounds.left - viewport.width / 2 + bounds.width / 2;
        const y = -bounds.top + viewport.height / 2 - bounds.height / 2;

        mesh.position.set(x, y, 0);
        mesh.scale.set(bounds.width, bounds.height, 1);
        material.uniforms.uResolution.value.set(bounds.width, bounds.height);

        const elementCenter = bounds.left + bounds.width / 2;
        const distance = (elementCenter - viewport.width / 2) / viewport.width;

        material.uniforms.uParallax.value = distance * 0.45;

        if (textEl) {
          const textOffset = distance * 40;
          textEl.style.transform = `translateX(${textOffset}px)`;
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      state.current.viewport = { width, height };

      const scrollWidth = containerRef.current.scrollWidth;
      const limit = scrollWidth - width;
      state.current.scroll.limit = limit;

      setSectionHeight(`${limit + height}px`);

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.fov = 2 * Math.atan(height / 2 / 100) * (180 / Math.PI);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Delayed initialization to ensure DOM and layout are stable
    const initTimer = setTimeout(() => {
      initMeshes();
      handleResize();
      ScrollTrigger.refresh();
    }, 500);

    const rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initTimer);
      st.kill();
      cancelAnimationFrame(rafId);
      renderer.dispose();
      geometry.dispose();
      state.current.medias.forEach(m => {
        m.material.dispose();
        m.material.uniforms.uTexture.value.dispose();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight }}
      // Original: className="relative w-full bg-gradient-to-r from-[var(--color-tertiary-500)] to-[var(--color-primary-500)]"
      // Original: className="relative w-full bg-gradient-to-r from-[var(--color-secondary-500)] to-[var(--color-secondary-300)]"
      className="relative w-full bg-[var(--color-secondary-500)]"
    >
      <div className="sticky top-[80px] w-full h-[calc(100vh-80px)] overflow-hidden select-none">

        <div
          ref={containerRef}
          className="flex items-start pt-[12vh] h-full will-change-transform pl-[12vw] pr-[4vw]"
        >
          {/* 1. Introductory Block */}
          <div className="flex-shrink-0 w-[45vw] h-full flex flex-col justify-center pr-[5vw]">
            <h1 className="h1-desktop text-inverse mb-6 max-w-[500px]">
              Of Course, We Aren’t All Talk
            </h1>
            <p className="p3-main-body-text text-inverse max-w-md mb-8">
              See the results behind our reputation.
            </p>
            <a href="#" className="btn btn-outline-white w-fit">
              View More
            </a>
          </div>

          {/* 2. Project Cards */}
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.href}
              className="project-card flex-shrink-0 w-[35vw] mr-[1.5vw] flex flex-col group cursor-pointer"
            >
              <div className="relative w-full h-[55vh] overflow-hidden bg-zinc-900/10">
                <img
                  src={project.src}
                  alt={project.title}
                  className="gallery-media-proxy absolute inset-0 w-full h-full object-cover opacity-0"
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </div>
              <div className="project-card-text mt-8 will-change-transform">
                <h3 className="text-inverse italic text-4xl font-serif mb-6">{project.title}</h3>
                <p className="p3-main-body-text text-inverse max-w-lg opacity-90">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* WebGL Layer - Forced to front */}
        <div
          ref={canvasContainerRef}
          className="fixed inset-0 z-50 pointer-events-none"
        />
      </div>
    </section>
  );
};

export default OurProjects;
