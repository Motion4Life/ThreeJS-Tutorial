/**
 * See https://www.youtube.com/watch?v=aJun0Q0CG_A&t=29s
 */

function addScene() {
  return new THREE.Scene();
}

function createRenderer() {
  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Most accurate colors
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.gammaFactor = 2.2;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  return renderer;
}

function setCamera() {
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 500);

  return camera;
}

function setControls() {
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;
  controls.enableDamping = true;

  return controls;
}

function setPointLight() {
  let pointlight = new THREE.PointLight(0xffffff, 1);
  pointlight.position.set(200, 200, 200);
  return pointlight;
}

function createCylindereMesh(envmap) {
  const texture = createCylinderTexture();

  // https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
  const ballMaterial = {
    color: 0x000,
    roughness: 0.3,
    metalness: 1,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    normalMap: texture,
    normalScale: new THREE.Vector2(0.1, 0.1),
    envMap: envmap.texture,
    side: THREE.DoubleSide,
  };

  let ballGeo = new THREE.CylinderGeometry(100, 100, 100);
  let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
  return new THREE.Mesh(ballGeo, ballMat);

  // HELPER
  function createCylinderTexture() {
    let texture = new THREE.CanvasTexture(new THREE.FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 10;

    return texture;
  }
}

function animate(controls, renderer) {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(() => animate(controls, renderer));
}
