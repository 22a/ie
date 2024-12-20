'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    if (mountRef.current) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create an icosahedron (20-faced polygon)
    const geometry = new THREE.IcosahedronGeometry(2);
    const material = new THREE.MeshPhysicalMaterial({ 
      color: 0x88ff88,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      iridescence: 1,
      iridescenceIOR: 1,
      sheenRoughness: 0.5,
      sheen: 1,
    });
    const polygon = new THREE.Mesh(geometry, material);

    // Add polygon to scene
    scene.add(polygon);

    // Add lights with animation - increased intensity from 2 to 5
    const light1 = new THREE.PointLight(0x4444ff, 5, 10, 2);
    const light2 = new THREE.PointLight(0x44ff44, 5, 10, 2);
    const light3 = new THREE.PointLight(0xff4444, 5, 10, 2);
    
    // Increase the size of the light spheres for visualization
    const lightSphere = new THREE.SphereGeometry(0.1);
    const lightMaterial1 = new THREE.MeshBasicMaterial({ color: 0x4444ff });
    const lightMaterial2 = new THREE.MeshBasicMaterial({ color: 0x44ff44 });
    const lightMaterial3 = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    
    const lightMesh1 = new THREE.Mesh(lightSphere, lightMaterial1);
    const lightMesh2 = new THREE.Mesh(lightSphere, lightMaterial2);
    const lightMesh3 = new THREE.Mesh(lightSphere, lightMaterial3);
    
    light1.add(lightMesh1);
    light2.add(lightMesh2);
    light3.add(lightMesh3);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    camera.position.z = 5;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the polygon
      polygon.rotation.x += 0.005;
      polygon.rotation.y += 0.005;
      
      // Animate lights in circular patterns
      const time = Date.now() * 0.001;
      light1.position.x = Math.sin(time * 0.7) * 3;
      light1.position.y = Math.cos(time * 0.5) * 3;
      light1.position.z = Math.cos(time * 0.3) * 3;

      light2.position.x = Math.cos(time * 0.3) * 3;
      light2.position.y = Math.sin(time * 0.7) * 3;
      light2.position.z = Math.sin(time * 0.5) * 3;

      light3.position.x = Math.sin(time * 0.5) * 3;
      light3.position.y = Math.cos(time * 0.3) * 3;
      light3.position.z = Math.sin(time * 0.7) * 3;

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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="relative z-10 text-white p-8">
        <h1 className="text-4xl font-bold">Welcome to My Website</h1>
      </div>
    </div>
  );
}
