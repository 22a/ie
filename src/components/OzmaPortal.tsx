'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OzmaPortal() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true  // Enable transparency
    });
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    
    if (mountRef.current) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create an icosahedron (20-faced polygon)
    const geometry = new THREE.IcosahedronGeometry(2);
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = vUv - center;
        float dist = length(pos);
        
        float angle = atan(pos.y, pos.x);
        float spiral = sin(dist * 20.0 - time * 2.0 + angle * 5.0);
        float ripple = sin(dist * 40.0 - time * 3.0) * 0.5;
        float waves = sin(angle * 10.0 + time * 4.0) * 0.5;
        
        float pattern = spiral + ripple + waves;
        
        // More vibrant base colors
        vec3 color1 = vec3(0.2, 0.8, 1.0);   // Bright cyan
        vec3 color2 = vec3(1.0, 0.2, 0.8);   // Hot pink
        vec3 color3 = vec3(0.8, 0.3, 1.0);   // Purple
        vec3 color4 = vec3(0.1, 1.0, 0.5);   // Bright green
        vec3 color5 = vec3(1.0, 0.8, 0.2);   // Gold
        
        // Multiple color transitions based on different parameters
        float colorMix1 = sin(time + dist * 5.0) * 0.5 + 0.5;
        float colorMix2 = cos(time * 0.5 + angle * 2.0) * 0.5 + 0.5;
        float colorMix3 = sin(time * 0.7 + pattern * 3.0) * 0.5 + 0.5;
        
        // Complex color mixing
        vec3 finalColor = mix(
          mix(
            mix(color1, color2, colorMix1),
            mix(color3, color4, colorMix2),
            colorMix3
          ),
          color5,
          sin(time * 2.0 + length(pos) * 10.0) * 0.5 + 0.5
        );
        
        // Add some sparkle effect
        float sparkle = pow(sin(time * 3.0 + dist * 50.0) * 0.5 + 0.5, 5.0);
        finalColor += vec3(sparkle);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide
    });
    const polygon = new THREE.Mesh(geometry, material);

    // Add polygon to scene
    scene.add(polygon);

    camera.position.z = 5;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the polygon
      polygon.rotation.x += 0.005;
      polygon.rotation.y += 0.005;
      
      material.uniforms.time.value += 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store ref in variable for cleanup
    const mount = mountRef.current;
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} data-canvas-container className="absolute inset-0" />
  );
} 