'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OzmaPortal() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.IcosahedronGeometry(2, 4);

    const positions = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      vertex.normalize();
      vertex.multiplyScalar(1.8 + Math.random() * 0.2);
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();

    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      // Noise function for more organic movement
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        // Create organic movement
        float noise = snoise(vec3(position.x * 2.0 + time * 0.5, 
                                 position.y * 2.0 + time * 0.3, 
                                 position.z * 2.0 + time * 0.4));
        
        // Add breathing effect
        float breathing = sin(time * 0.8) * 0.1;
        
        // Add tentacle-like movement
        float tentacle = sin(position.y * 8.0 + time) * cos(position.x * 6.0 + time * 0.5) * 0.15;
        
        // Combine effects
        vec3 newPosition = position + normal * (noise * 0.3 + breathing + tentacle);
        
        // Add spiral displacement
        float spiral = length(position.xy) * 2.0;
        float spiralAngle = atan(position.y, position.x);
        newPosition.z += sin(spiral + time + spiralAngle) * 0.2;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      float noise(vec2 p) {
        return sin(p.x * 8.0 + time) * cos(p.y * 4.0 - time * 0.5);
      }
      
      void main() {
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = vUv - center;
        float dist = length(pos);
        float angle = atan(pos.y, pos.x);
        
        // Alien wave patterns
        float waveCount = 12.0;
        float waveSpeed = 1.5;
        float alienShore = sin(dist * waveCount - time * waveSpeed + angle * 2.0) * 0.5 + 0.5;
        alienShore *= smoothstep(1.0, 0.1, dist);
        
        // Strange luminescence effect
        float luminescence = pow(sin(time * 1.5 + dist * 20.0 - angle * 3.0) * 0.5 + 0.5, 2.0) * 
                            (0.6 + 0.4 * sin(time + noise(pos * 3.0)));
        
        // Ethereal ripples
        float alienRipples = sin(dist * 15.0 - time * 2.0 + noise(pos * 4.0)) * 0.3 * 
                            (1.0 + cos(time * 0.8) * 0.5);
        
        // Exotic color palette - adjusted for more liquid-like appearance
        vec3 deepColor = vec3(0.1, 0.4, 0.6) * (1.0 + sin(time * 0.4) * 0.2);
        vec3 shallowColor = vec3(0.3, 0.7, 0.9) * (1.0 + sin(time * 0.6) * 0.2);
        vec3 foamColor = vec3(0.8, 0.9, 1.0) * (1.0 + sin(time * 0.3) * 0.1);
        
        // Create the liquid effect
        vec3 liquidColor = mix(deepColor, shallowColor, alienShore + alienRipples);
        
        // Add foam and luminescence
        vec3 finalColor = mix(liquidColor, foamColor, luminescence * 0.5);
        
        // Add shimmering edge effect
        float edge = smoothstep(0.75, 1.0, dist) * (0.5 + 0.5 * sin(time * 2.0 + angle * 4.0));
        finalColor += edge * foamColor * 0.6;
        
        // Liquid-like transparency
        float alpha = 0.8 + luminescence * 0.2;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    const polygon = new THREE.Mesh(geometry, material);

    scene.add(polygon);

    camera.position.z = 5;

    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 4);

    const innerPositions = innerGeometry.attributes.position;
    const innerVertex = new THREE.Vector3();

    for (let i = 0; i < innerPositions.count; i++) {
      innerVertex.fromBufferAttribute(innerPositions, i);
      innerVertex.normalize();
      innerVertex.multiplyScalar(1.0 + Math.random() * 0.1);
      innerPositions.setXYZ(i, innerVertex.x, innerVertex.y, innerVertex.z);
    }

    innerGeometry.computeVertexNormals();

    const innerPolygon = new THREE.Mesh(innerGeometry, material);
    scene.add(innerPolygon);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxDistance = Math.sqrt(
          (window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2
        );
        const speedMultiplier = 0.2 + (distance / maxDistance) * 0.8;

        polygon.rotation.x += 0.005 * speedMultiplier;
        polygon.rotation.y += 0.005 * speedMultiplier;
        innerPolygon.rotation.x -= 0.003 * speedMultiplier;
        innerPolygon.rotation.y -= 0.003 * speedMultiplier;

        material.uniforms.time.value += 0.02 * speedMultiplier;
      }

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

    const mount = mountRef.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} data-canvas-container className="absolute inset-0" />
  );
}
