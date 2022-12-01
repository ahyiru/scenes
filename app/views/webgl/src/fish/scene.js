import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeBufferGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';

import {getViewportSize} from '@huxy/utils';

import fishStl from './src/fish.stl';

const NUM = 500;

const getMaterial = () => new THREE.ShaderMaterial({
  uniforms: {
    uTime: {value: 0},
    uLight: {value: new THREE.Color('red').multiplyScalar(1.5)},
    uColor: {value: new THREE.Color('maroon').multiplyScalar(1)},
    uFire: {value: new THREE.Color(1, 0.75, 0)},
  },
  vertexShader: `
    uniform float uTime;

    attribute vec3 instPos;
    attribute float instSpeed;
    attribute vec2 instLight;

    varying vec2 vInstLight;
    varying float vY;
    
    void main() {
      
      vInstLight = instLight;
      vY = position.y;

      vec3 pos = vec3(position) * 2.;
      vec3 iPos = instPos * 200.;
      
      iPos.xz += vec2(
        cos(instLight.x + instLight.y * uTime),
        sin(instLight.x + instLight.y * uTime * fract(sin(instLight.x)))
      );

      iPos.y = mod(iPos.y + 100. + (uTime * instSpeed), 200.) - 100.;
      pos += iPos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uLight;
    uniform vec3 uColor;
    uniform vec3 uFire;

    varying vec2 vInstLight;
    varying float vY;
    
    void main() {
      
      vec3 col = vec3(0);
      float t = vInstLight.x + (vInstLight.y * uTime * 10.);
      float ts = sin(t * 3.14) * 0.5 + 0.5;
      float tc = cos(t * 2.7) * 0.5 + 0.5;
      float f = smoothstep(0.12, 0.12 + (ts + tc) * 0.25, vY);
      float li = (0.5 + smoothstep(0., 1., ts * ts + tc * tc) * 0.5);
      col = mix(uLight * li, uColor * (0.75 + li * 0.25), f);

      col = mix(col, uFire, step(vY, 0.05) * (0.75 + li * 0.25));

      gl_FragColor = vec4(col, 1);
    }
  `,
  side: THREE.DoubleSide,
});

const getGeometry = () => {
  const geoms = [];
  const pts = [
    new THREE.Vector2(0, 1. - 0),
    new THREE.Vector2(0.25, 1. - 0),
    new THREE.Vector2(0.25, 1. - 0.125),
    new THREE.Vector2(0.45, 1. - 0.125),
    new THREE.Vector2(0.45, 1. - 0.95),
  ];
  const geom = new THREE.LatheGeometry(pts, 20);
  geoms.push(geom);

  const geomLight = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20);
  //geomLight.rotateX(Math.PI * 0.5);
  geoms.push(geomLight);

  const fullGeom = mergeBufferGeometries(geoms);

  const geometry = new THREE.InstancedBufferGeometry().copy(fullGeom);
  geometry.instanceCount = NUM;

  const instPos = [];
  const instSpeed = [];
  const instLight = [];
  for (let i = 0; i < NUM; i++) {
    instPos.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    instSpeed.push(Math.random() * 0.25 + 1);
    instLight.push(Math.PI + (Math.PI * Math.random()), Math.random() + 5);
  }
  geometry.setAttribute('instPos', new THREE.InstancedBufferAttribute(new Float32Array(instPos), 3));
  geometry.setAttribute('instSpeed', new THREE.InstancedBufferAttribute(new Float32Array(instSpeed), 1));
  geometry.setAttribute('instLight', new THREE.InstancedBufferAttribute(new Float32Array(instLight), 2));
  return geometry;
};

const startScene = (mountDom = document.body) => {
  const {width, height} = getViewportSize();
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);
  const controls = new OrbitControls(camera, renderer.domElement);

  const clock = new THREE.Clock();

  const material = getMaterial();

  const oUs = [];

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x181005);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountDom.appendChild(renderer.domElement);

    camera.position.set(0, -25, 80);

    // controls.rotateSpeed = -1.0;
    // controls.enablePan = false;
    // controls.enableDamping = true;
    // controls.enableZoom = true;
    controls.maxDistance = 150;

    const geometry = getGeometry();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    loadModels();
  };

  const loadModels = () => {
    new STLLoader().load(fishStl, objGeom => {
      const baseVector = new THREE.Vector3(40, 0, 0);
      const axis = new THREE.Vector3(0, 1, 0);
      const cPts = [];
      const cSegments = 6;
      const cStep = Math.PI * 2 / cSegments;
      for (let i = 0; i < cSegments; i++){
        cPts.push(
          new THREE.Vector3().copy(baseVector)
            .applyAxisAngle(axis, cStep * i).setY(THREE.MathUtils.randFloat(-10, 10)),
        );
      }
      const curve = new THREE.CatmullRomCurve3(cPts);
      curve.closed = true;

      const numPoints = 511;
      const cPoints = curve.getSpacedPoints(numPoints);
      const cObjects = curve.computeFrenetFrames(numPoints, true);
      // const pGeom = new THREE.BufferGeometry().setFromPoints(cPoints);
      // const pMat = new THREE.LineBasicMaterial({color: 'yellow'});
      // const pathLine = new THREE.Line(pGeom, pMat);
      // scene.add(pathLine);

      const data = [];
      cPoints.map( v => {data.push(v.x, v.y, v.z, 1);});
      cObjects.binormals.map(v => {data.push(v.x, v.y, v.z, 1);});
      cObjects.normals.map(v => {data.push(v.x, v.y, v.z, 1);});
      cObjects.tangents.map(v => {data.push(v.x, v.y, v.z, 1);});

      const dataArray = new Float32Array(data);

      const tex = new THREE.DataTexture(dataArray, numPoints + 1, 4, THREE.RGBAFormat, THREE.FloatType);
      tex.needsUpdate = true;
      tex.magFilter = THREE.NearestFilter;
      
      objGeom.center();
      objGeom.rotateX(-Math.PI * 0.5);
      objGeom.scale(0.5, 0.5, 0.5);
      const objBox = new THREE.Box3().setFromBufferAttribute(objGeom.getAttribute('position'));
      const objSize = new THREE.Vector3();
      objBox.getSize(objSize);
      //objGeom.translate(0, 0, objBox.z);

      const objUniforms = {
        uSpatialTexture: {value: tex},
        uTextureSize: {value: new THREE.Vector2(numPoints + 1, 4)},
        uTime: {value: 0},
        uLengthRatio: {value: objSize.z / curve.cacheArcLengths[200]},
        uObjSize: {value: objSize},
      };
      oUs.push(objUniforms);

      const objMat = new THREE.MeshBasicMaterial({color: 0xff6600, wireframe: true});
      objMat.onBeforeCompile = shader => {
        shader.uniforms.uSpatialTexture = objUniforms.uSpatialTexture;
        shader.uniforms.uTextureSize = objUniforms.uTextureSize;
        shader.uniforms.uTime = objUniforms.uTime;
        shader.uniforms.uLengthRatio = objUniforms.uLengthRatio;
        shader.uniforms.uObjSize = objUniforms.uObjSize;

        shader.vertexShader = `
          uniform sampler2D uSpatialTexture;
          uniform vec2 uTextureSize;
          uniform float uTime;
          uniform float uLengthRatio;
          uniform vec3 uObjSize;

          struct splineData {
            vec3 point;
            vec3 binormal;
            vec3 normal;
          };

          splineData getSplineData(float t) {
            float step = 1. / uTextureSize.y;
            float halfStep = step * 0.5;
            splineData sd;
            sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0. + halfStep)).rgb;
            sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1. + halfStep)).rgb;
            sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2. + halfStep)).rgb;
            return sd;
          }
        ` + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>

          vec3 pos = position;

          float wStep = 1. / uTextureSize.x;
          float hWStep = wStep * 0.5;

          float d = pos.z / uObjSize.z;
          float t = fract((uTime * 0.1) + (d * uLengthRatio));
          float numPrev = floor(t / wStep);
          float numNext = numPrev + 1.;
          //numNext = numNext > (uTextureSize.x - 1.) ? 0. : numNext;
          float tPrev = numPrev * wStep + hWStep;
          float tNext = numNext * wStep + hWStep;
          //float tDiff = tNext - tPrev;
          splineData splinePrev = getSplineData(tPrev);
          splineData splineNext = getSplineData(tNext);

          float f = (t - tPrev) / wStep;
          vec3 P = mix(splinePrev.point, splineNext.point, f);
          vec3 B = mix(splinePrev.binormal, splineNext.binormal, f);
          vec3 N = mix(splinePrev.normal, splineNext.normal, f);

          transformed = P + (N * pos.x) + (B * pos.y);`,
        );
      };
      const obj = new THREE.Mesh(objGeom, objMat);
      scene.add(obj);
    });
  };

  const onResize = () => {
    const {width, height} = getViewportSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    oUs.map(ou => {ou.uTime.value = t;});

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
