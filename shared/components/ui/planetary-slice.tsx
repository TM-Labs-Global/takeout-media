'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';

// Vertex shader - standard pass-through
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - planetary slice effect
const fragmentShader = `
  uniform float progress;
  uniform float intensity;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform vec4 resolution1;
  uniform vec4 resolution2;
  varying vec2 vUv;
  
  mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }
  
  void main() {
    vec2 newUV1 = (vUv - vec2(0.5)) * resolution1.zw + vec2(0.5);
    vec2 newUV2 = (vUv - vec2(0.5)) * resolution2.zw + vec2(0.5);
    
    vec2 uvDivided1 = fract(newUV1 * vec2(intensity, 1.));
    vec2 uvDivided2 = fract(newUV2 * vec2(intensity, 1.));
    
    vec2 uvDisplaced1 = newUV1 + rotate(3.1415926 / 4.) * uvDivided1 * progress * 0.1;
    vec2 uvDisplaced2 = newUV2 + rotate(3.1415926 / 4.) * uvDivided2 * (1. - progress) * 0.1;
    
    vec4 t1 = texture2D(texture1, uvDisplaced1);
    vec4 t2 = texture2D(texture2, uvDisplaced2);
    
    gl_FragColor = mix(t1, t2, progress);
  }
`;

interface ImageTransitionProps {
  images: string[];
  intensity?: number;
  duration?: number;
  easing?: string;
  intervalMs?: number;
}

function ImagePlane({
  images,
  intensity = 50,
  duration = 1.5,
  easing = 'power2.inOut',
  intervalMs = 2000
}: ImageTransitionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { size, viewport } = useThree();

  // Load textures and manage cleanup to prevent GPU memory leaks
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let isMounted = true;
    const loadedList: THREE.Texture[] = [];

    const promises = images.map((url) =>
      new Promise<THREE.Texture>((resolve) => {
        loader.load(url, (texture) => {
          loadedList.push(texture);
          resolve(texture);
        });
      })
    );

    Promise.all(promises).then((loadedTextures) => {
      if (isMounted) {
        setTextures(loadedTextures);
      } else {
        loadedTextures.forEach(t => t.dispose());
      }
    });

    return () => {
      isMounted = false;
      loadedList.forEach(t => t.dispose());
    };
  }, [images.join(',')]); // Use serialized string dependency to prevent reload loop on new array references

  const getResolutionVector = (texture: THREE.Texture, width: number, height: number) => {
    if (!texture || !texture.image) return [1, 1];
    const img = texture.image as HTMLImageElement;
    const imageAspect = img.height / img.width;
    let a1 = 1;
    let a2 = 1;

    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (height / width) / imageAspect;
    }
    return [a1, a2];
  };

  // Handle aspect ratio updates and resolution uniforms inside useFrame render loop
  // to ensure WebGL context correctly updates right before canvas rendering.
  useFrame(() => {
    if (materialRef.current && textures.length > 0) {
      const tex1 = textures[currentImage];
      const tex2 = textures[(currentImage + 1) % textures.length];
      if (tex1 && tex2) {
        const [a1_1, a2_1] = getResolutionVector(tex1, size.width, size.height);
        const [a1_2, a2_2] = getResolutionVector(tex2, size.width, size.height);

        materialRef.current.uniforms.resolution1.value.set(size.width, size.height, a1_1, a2_1);
        materialRef.current.uniforms.resolution2.value.set(size.width, size.height, a1_2, a2_2);
      }
    }
  });

  // Transition animation using GSAP on interval
  useEffect(() => {
    if (textures.length === 0 || isAnimating) return;

    const intervalId = setInterval(() => {
      const nextIndex = (currentImage + 1) % textures.length;
      const nextTexture = textures[nextIndex];

      if (materialRef.current) {
        setIsAnimating(true);
        materialRef.current.uniforms.texture2.value = nextTexture;

        gsap.to(materialRef.current.uniforms.progress, {
          value: 1,
          duration,
          ease: easing,
          onComplete: () => {
            setCurrentImage(nextIndex);
            if (materialRef.current) {
              materialRef.current.uniforms.texture1.value = nextTexture;
              materialRef.current.uniforms.progress.value = 0;
            }
            setIsAnimating(false);
          },
        });
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [currentImage, textures, isAnimating, duration, easing, intervalMs]);

  if (textures.length === 0) return null;

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 2, 2]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        uniforms={{
          progress: { value: 0 },
          intensity: { value: intensity },
          texture1: { value: textures[currentImage] },
          texture2: { value: textures[(currentImage + 1) % textures.length] },
          resolution1: { value: new THREE.Vector4() },
          resolution2: { value: new THREE.Vector4() },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function PlanetarySlice({ images }: { images: string[] }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-secondary-500 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 70 }}
        dpr={[1, 2]}
      >
        <ImagePlane
          images={images}
          intensity={50}
          duration={1.5}
          easing="power2.inOut"
          intervalMs={2000}
        />
      </Canvas>
    </div>
  );
}
