import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const makeField = (count: number, color: number, spread: number, size: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        depthWrite: false,
      });
      return new THREE.Points(geometry, material);
    };

    const cyanField = makeField(420, 0x00e5ff, 16, 0.045);
    const violetField = makeField(280, 0x7a5cff, 20, 0.06);
    const limeField = makeField(120, 0x8dff3d, 14, 0.035);
    group.add(cyanField, violetField, limeField);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.02 + mouse.x * 0.4;
      group.rotation.x = mouse.y * 0.2;
      cyanField.rotation.z = t * 0.01;
      violetField.rotation.z = -t * 0.008;
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometryDispose(cyanField);
      geometryDispose(violetField);
      geometryDispose(limeField);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  function geometryDispose(points: THREE.Points) {
    points.geometry.dispose();
    (points.material as THREE.Material).dispose();
  }

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
