import * as THREE from 'three';
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {getViewportSize, randItem} from '@huxy/utils';

let cameraStart = 8000;
let rotate = 0;

const stepZ = 4;
const stepY = 0.04;

const colors = ['#8da1b9', '#95adB6', '#cbb3bf', '#dbc7be', '#ef959c'];

const keyActions = {
  37: (camera) => {
    rotate += stepY;
    camera.rotation.y = rotate;
  },
  38: (camera, pointLight) => {
    cameraStart -= stepZ;
    camera.position.setZ(cameraStart);
    pointLight.position.setZ(cameraStart);
  },
  39: (camera, pointLight) => {
    rotate -= stepY;
    camera.rotation.y = rotate;
    pointLight.rotation.y = rotate;
  },
  40: (camera) => {
    cameraStart += stepZ;
    camera.position.setZ(cameraStart);
  },
};

const createCube = (h, w, d, color) => {
  const cubeGeometry = new THREE.BoxGeometry(h, w, d);
  const cubeMaterial = new THREE.MeshLambertMaterial({color});
  return new THREE.Mesh(cubeGeometry, cubeMaterial);
};

const createStreet = (scene, width) => {
  const street = createCube(width, 1, 10000, 'lightgray');
  street.position.setZ(3200);
  scene.add(street);
};

const createStreetSide = (scene, x) => {
  let cube;
  let z = 0;
  for (let i = 0; i < 200; i++) {
    cube = createCube(100, Math.random() * 500, 100, randItem(colors));
    cube.position.set(x, 0, z);
    scene.add(cube);
    z += 100;
  }
};

const startScene = (mountDom = document.body) => {
  const {width, height} = getViewportSize(mountDom);
  const renderer = new THREE.WebGLRenderer();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000);
  const pointLight = new THREE.PointLight(0x404040);

  let currentKey = null;

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor('#fa8c16', 0.5);
    mountDom.appendChild(renderer.domElement);
    
    camera.position.set(0, 45, cameraStart);
    scene.add(camera);

    pointLight.position.set(0, 500, cameraStart);
    scene.add(pointLight);
  };

  const init = () => {
    setConfigs();

    createStreet(scene, width);
    createStreetSide(scene, 250);
    createStreetSide(scene, -250);
  };

  const onResize = () => {
    const {width, height} = getViewportSize(mountDom);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    keyActions[currentKey]?.(camera, pointLight);
    renderer.render(scene, camera);
  };

  const start = () => {
    init();
    animate();
    window.addEventListener('resize', onResize, false);
    window.addEventListener('keydown', e => currentKey = e.which, false);
    window.addEventListener('keyup', e => currentKey = null, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  };
  return start();
};

export default startScene;
