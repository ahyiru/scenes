import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {getViewportSize} from '@huxy/utils';

const pics = [
  require('./src/scene1.jpg'),
  require('./src/scene2.jpg'),
  require('./src/scene3.jpg'),
];

const wheelStep = 0.05;
const deltaMax = 8;
const deltaMin = 0;

const startScene = (mountDom = document.body) => {
  const {width, height} = getViewportSize();
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
  const controls = new OrbitControls(camera, renderer.domElement);
  const material = new THREE.MeshBasicMaterial();

  let currentScene = 0;
  let deltaCount = 0;

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountDom.appendChild(renderer.domElement);

    camera.position.x = 0.1;

    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.maxDistance = 5;
    controls.rotateSpeed = -1.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const geometry = new THREE.SphereGeometry(50, 50, 50);
    geometry.scale(-1, 1, 1);

    material.map = new THREE.TextureLoader().load(pics[currentScene]);

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  };

  const onResize = () => {
    const {width, height} = getViewportSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const onMouseWheel = e => {
    // e.preventDefault();
    const mouseWheel = () => {
      const detail = e.wheelDelta * wheelStep ?? e.wheelDeltaY * wheelStep ?? e.detail * -1;
      camera.fov -= detail;
      camera.fov = Math.max(10, Math.min(100, camera.fov));
    };
    if (e.deltaY < 0) {
      if (deltaCount < deltaMax) {
        mouseWheel();
        deltaCount += 1;
      }
    } else {
      if (deltaCount > deltaMin) {
        mouseWheel();
        deltaCount -= 1;
      }
    }
    camera.updateProjectionMatrix();
  };

  const changeScene = step => {
    currentScene += step;
    currentScene = currentScene < 0 ? 2 : currentScene > 2 ? 0 : currentScene;
    material.map = new THREE.TextureLoader().load(pics[currentScene]);
  };

  const changeZoom = step => {
    if (step === 1 && deltaCount < deltaMax) {
      camera.fov = Math.max(10, Math.min(100, camera.fov - deltaMax));
      deltaCount += step;
    }
    if (step === -1 && deltaCount < deltaMax) {
      camera.fov = Math.max(10, Math.min(100, camera.fov + deltaMax));
      deltaCount += step;
    }
    camera.updateProjectionMatrix();
  };

  const start = () => {
    setConfigs();
    animate();
    document.addEventListener('resize', onResize, false);
    document.addEventListener('mousewheel', onMouseWheel, false);
    document.addEventListener('DOMMouseScroll', onMouseWheel, false);
    return {
      destory: () => {
        document.removeEventListener('resize', onResize, false);
        document.removeEventListener('mousewheel', onMouseWheel, false);
        document.removeEventListener('DOMMouseScroll', onMouseWheel, false);
      },
      changeScene,
      changeZoom,
    };
  };
  return start();
};

export default startScene;
