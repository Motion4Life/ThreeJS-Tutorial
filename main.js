let scene, camera, renderer, controls, pointlight;

function init() {
  scene = addScene();
  renderer = createRenderer();
  camera = setCamera();
  controls = setControls();
  pointlight = setPointLight();
  scene.add(pointlight);

  let envmaploader = new THREE.PMREMGenerator(renderer);

  // RGBE-Loader allows to load binary texture formats (rgbe, hdr)
  new THREE.RGBELoader().load(
    'texture/cayley_interior_4k.hdr',
    function (hdrmap) {
      let envmap = envmaploader.fromCubemap(hdrmap);

      let cylinderMesh = createCylindereMesh(envmap);
      scene.add(cylinderMesh);
      animate(controls, renderer);
    }
  );
}

init();
