'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState('/hero-1.mp4');

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
      antialias: true,
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

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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

    // Video elements
    const videos = [
      '/hero-1.mp4',
      '/hero-2.mp4',
      '/hero-3.mp4',
      '/hero-4.mp4',
    ];

    // Create video textures
    const videoTextures = videos.map((src) => {
      const videoElement = document.createElement('video');
      videoElement.src = src;
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.play();

      const texture = new THREE.VideoTexture(videoElement);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBAFormat;

      return texture;
    });

    // Define materials for each face
    const materials = [
      new THREE.MeshBasicMaterial({ map: videoTextures[0] }),
      new THREE.MeshBasicMaterial({ map: videoTextures[1] }),
      new THREE.MeshBasicMaterial({ map: videoTextures[2] }),
      new THREE.MeshBasicMaterial({ map: videoTextures[3] }),
      new THREE.MeshBasicMaterial({ map: videoTextures[0] }),
      new THREE.MeshBasicMaterial({ map: videoTextures[1] }),
    ];

    // Rounded Cube
    const geometry = new RoundedBoxGeometry(10, 10, 10, 1, 1);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Handle mouse click
    const handleMouseClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0) {
        const faceIndex = intersects[0].face.materialIndex;
        if (faceIndex !== undefined) {
          setCurrentVideo(videos[faceIndex]);
        }
      }
    };

    window.addEventListener('click', handleMouseClick);

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
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <>
        <div>
      <video
        loop
        autoPlay
        muted
        playsInline
        src={currentVideo}
        style={{ position: 'fixed', bottom: '10px', left: '10px', width: '200px' }}
      />
      <canvas ref={canvasRef} id="bg"></canvas>
    </div>
    </>

  );
};

export default ThreeScene;
