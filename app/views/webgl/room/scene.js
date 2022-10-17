import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {getViewportSize} from '@huxy/utils';

const pics = [
  require('./src/front.jpeg'),
  require('./src/back.jpeg'),
  require('./src/up.jpeg'),
  require('./src/down.jpeg'),
  require('./src/left.jpeg'),
  require('./src/right.jpeg'),
];

const getMaterial = THREE => {
  const materialArray = [];
  pics.map(pic => {
    const texture = new THREE.TextureLoader().load(pic);
    const material = new THREE.MeshBasicMaterial({map: texture});
    materialArray.push(material);
    material.side = THREE.BackSide;
  });
  return materialArray;
};

const startScene = (mountDom = document.body) => {
  const {width, height} = getViewportSize();
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountDom.appendChild(renderer.domElement);

    camera.position.x = -0.1;

    controls.rotateSpeed = -1.0;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.maxDistance = 0.5;

    const materialArray = getMaterial(THREE);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, materialArray);
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

  const start = () => {
    setConfigs();
    animate();
    document.addEventListener('resize', onResize, false);
    return () => document.removeEventListener('resize', onResize, false);
  };
  return start();
};

export default startScene;
