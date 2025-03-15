'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';


const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true, // Enable anti-aliasing
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(55);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Background texture
    const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
    scene.background = spaceTexture;

    // Video Textures
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const video3 = document.getElementById('video3');
    const video4 = document.getElementById('video4');

    // Start videos
    video1.play();
    video2.play();
    video3.play();
    video4.play();

    // Create video textures
    const videoTexture1 = new THREE.VideoTexture(video1);
    videoTexture1.minFilter = THREE.LinearFilter;
    videoTexture1.magFilter = THREE.LinearFilter;
    videoTexture1.format = THREE.RGBAFormat;

    const videoTexture2 = new THREE.VideoTexture(video2);
    videoTexture2.minFilter = THREE.LinearFilter;
    videoTexture2.magFilter = THREE.LinearFilter;
    videoTexture2.format = THREE.RGBAFormat;

    const videoTexture3 = new THREE.VideoTexture(video3);
    videoTexture3.minFilter = THREE.LinearFilter;
    videoTexture3.magFilter = THREE.LinearFilter;
    videoTexture3.format = THREE.RGBAFormat;

    const videoTexture4 = new THREE.VideoTexture(video4);
    videoTexture4.minFilter = THREE.LinearFilter;
    videoTexture4.magFilter = THREE.LinearFilter;
    videoTexture4.format = THREE.RGBAFormat;

    // Define materials for each face
    const materials = [
      new THREE.MeshBasicMaterial({ map: videoTexture1 }), // Right
      new THREE.MeshBasicMaterial({ map: videoTexture2 }), // Left
      new THREE.MeshBasicMaterial({ map: videoTexture3 }), // Top
      new THREE.MeshBasicMaterial({ map: videoTexture4 }), // Bottom
      new THREE.MeshBasicMaterial({ map: videoTexture1 }), // Front
      new THREE.MeshBasicMaterial({ map: videoTexture2 }), // Back
    ];

    // Rounded Cube
    const geometry = new RoundedBoxGeometry(10, 10, 10, 1, 1); // Smooth edges
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01; // Rotate for effect
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="bg"></canvas>
      <video id="video1" src="/hero-1.mp4" loop autoPlay muted playsinline style={{ display: 'none' }}></video>
      <video id="video2" src="/hero-2.mp4" loop autoPlay muted playsinline style={{ display: 'none' }}></video>
      <video id="video3" src="/hero-3.mp4" loop autoPlay muted playsinline style={{ display: 'none' }}></video>
      <video id="video4" src="/hero-4.mp4" loop autoPlay muted playsinline style={{ display: 'none' }}></video>
    </div>
  );
};

export default ThreeScene;
