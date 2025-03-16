'use client'
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const FloatingCylinderWithLight = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a cylinder
    const geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add a point light for the mouse
    const pointLight = new THREE.PointLight(0xffaa00, 5, 15); // Higher intensity and range
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 8;

    // GSAP floating animation
    const floatAnimation = () => {
      gsap.to(cylinder.position, {
        y: 1,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    floatAnimation();

    // Mouse movement handler
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      pointLight.position.x = mouseX * 5;
      pointLight.position.y = mouseY * 5;

      // Adjust light intensity based on proximity to the cylinder
      const distance = pointLight.position.distanceTo(cylinder.position);
      pointLight.intensity = 10 / (distance + 0.1); // Increased intensity
    };

    // Mouse leave handler
    const onMouseLeave = () => {
      // Stop updating light position but keep it where it was
      window.removeEventListener("mousemove", onMouseMove);
    };

    // Mouse enter handler (to reattach the mousemove event)
    const onMouseEnter = () => {
      window.addEventListener("mousemove", onMouseMove);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default FloatingCylinderWithLight;
