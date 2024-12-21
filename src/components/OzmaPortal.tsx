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

    // Create a smoother icosahedron with more subdivisions
    const geometry = new THREE.IcosahedronGeometry(2, 4);  // Increased detail level from default to 4
    
    // Add some vertex displacement to soften edges
    const positions = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for(let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        vertex.normalize();
        vertex.multiplyScalar(1.8 + Math.random() * 0.2); // Slight random variation
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals(); // Recalculate normals for smooth shading

    const initialPositions = positions.array.slice(); // Store initial positions
    const faceCount = geometry.attributes.position.count / 3;
    const faceOffsets = new Array(faceCount).fill(0).map(() => Math.random() * 10); // Random starting phase for each face
    
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
        
        // Enhanced spiral effect with pulse
        float spiral = sin(dist * 15.0 - time * 2.0 + angle * 3.0 + sin(time) * 2.0) * 0.3;
        
        // More dynamic ripple effect
        float ripple = sin(dist * 20.0 - time * 3.0) * 0.2 * (1.0 + sin(time * 0.5) * 0.5);
        
        // Added vortex effect
        float vortex = sin(angle * 8.0 + dist * 10.0 - time * 4.0) * 0.2;
        
        // Pulsing waves
        float waves = sin(angle * 6.0 + time * 4.0) * (0.3 + sin(time) * 0.1);
        
        float pattern = smoothstep(0.0, 1.0, spiral + ripple + waves + vortex);
        
        // More vibrant, shifting colors
        vec3 color1 = vec3(0.3, 0.8, 1.0) * (1.0 + sin(time * 0.5) * 0.2);
        vec3 color2 = vec3(0.9, 0.3, 0.8) * (1.0 + cos(time * 0.6) * 0.2);
        vec3 color3 = vec3(0.7, 0.4, 1.0) * (1.0 + sin(time * 0.7) * 0.2);
        vec3 color4 = vec3(0.2, 0.9, 0.5) * (1.0 + cos(time * 0.8) * 0.2);
        vec3 color5 = vec3(0.9, 0.8, 0.3) * (1.0 + sin(time * 0.9) * 0.2);
        
        // Enhanced color mixing
        float colorMix1 = smoothstep(0.0, 1.0, sin(time + dist * 3.0 + pattern) * 0.5 + 0.5);
        float colorMix2 = smoothstep(0.0, 1.0, cos(time * 0.5 + angle * 1.5 + vortex) * 0.5 + 0.5);
        float colorMix3 = smoothstep(0.0, 1.0, sin(time * 0.7 + pattern * 2.0 + spiral) * 0.5 + 0.5);
        
        vec3 finalColor = mix(
          mix(
            mix(color1, color2, colorMix1),
            mix(color3, color4, colorMix2),
            colorMix3
          ),
          color5,
          smoothstep(0.0, 1.0, sin(time * 1.5 + length(pos) * 8.0) * 0.5 + 0.5)
        );
        
        // Enhanced sparkle effect with pulse
        float sparkle = pow(sin(time * 2.0 + dist * 30.0 + angle * 5.0) * 0.5 + 0.5, 8.0) * 
                       (0.3 + sin(time) * 0.1);
        
        // Add edge glow
        float edge = smoothstep(0.8, 1.0, dist) * 0.5;
        finalColor += vec3(edge) * vec3(0.5, 0.8, 1.0);
        
        // Add sparkle
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

    // After creating the first polygon
    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 4); // Smaller radius
    
    // Add vertex displacement to inner sphere
    const innerPositions = innerGeometry.attributes.position;
    const innerVertex = new THREE.Vector3();
    
    for(let i = 0; i < innerPositions.count; i++) {
        innerVertex.fromBufferAttribute(innerPositions, i);
        innerVertex.normalize();
        innerVertex.multiplyScalar(1.0 + Math.random() * 0.1);
        innerPositions.setXYZ(i, innerVertex.x, innerVertex.y, innerVertex.z);
    }
    
    innerGeometry.computeVertexNormals();
    
    const innerInitialPositions = innerPositions.array.slice();
    const innerFaceCount = innerGeometry.attributes.position.count / 3;
    const innerFaceOffsets = new Array(innerFaceCount).fill(0).map(() => Math.random() * 10);
    
    const innerPolygon = new THREE.Mesh(innerGeometry, material); // Using same material
    scene.add(innerPolygon);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Outer polygon animation
      for(let face = 0; face < faceCount; face++) {
        const faceScale = 1.0 + Math.sin(time * 0.5 + faceOffsets[face]) * 0.1;
        for(let i = 0; i < 3; i++) {
          const vertexIndex = face * 3 + i;
          const i3 = vertexIndex * 3;
          positions.setXYZ(
            vertexIndex,
            initialPositions[i3] * faceScale,
            initialPositions[i3 + 1] * faceScale,
            initialPositions[i3 + 2] * faceScale
          );
        }
      }
      positions.needsUpdate = true;
      
      // Inner polygon animation (opposite phase)
      for(let face = 0; face < innerFaceCount; face++) {
        const faceScale = 1.0 + Math.sin(time * 0.5 + innerFaceOffsets[face] + Math.PI) * 0.1;
        for(let i = 0; i < 3; i++) {
          const vertexIndex = face * 3 + i;
          const i3 = vertexIndex * 3;
          innerPositions.setXYZ(
            vertexIndex,
            innerInitialPositions[i3] * faceScale,
            innerInitialPositions[i3 + 1] * faceScale,
            innerInitialPositions[i3 + 2] * faceScale
          );
        }
      }
      innerPositions.needsUpdate = true;
      
      // Rotate in opposite directions
      polygon.rotation.x += 0.005;
      polygon.rotation.y += 0.005;
      innerPolygon.rotation.x -= 0.003;
      innerPolygon.rotation.y -= 0.003;
      
      material.uniforms.time.value += 0.02;
      time += 0.01;
      
      renderer.render(scene, camera);
    };

    let time = 0; // Add this before animate()

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