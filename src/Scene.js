import * as THREE from 'three';
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls.js');

export default class Scene {
  constructor(container) {
    this.container = container;
    this.group = new THREE.Group();

    this.init();
    this.addLights();
    this.addSpoke();
    this.loop();

    window.addEventListener('resize', () => this.handleResize());
  }

  width() {
    return window.innerWidth;
  }

  height() {
    return window.innerHeight;
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, this.width() / this.height(), 1, 2000);
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio = window.devicePixelRatio;
    this.renderer.setSize(this.width(), this.height());

    this.container.appendChild(this.renderer.domElement);
  }

  addLights() {
    const light = new THREE.AmbientLight(0xB2EBF2, 0.7);
    this.scene.add(light);
  }

  addSpoke() {
    for (let i = 0; i <= 50; i++) {
      setTimeout(() => {
        const anchor = new THREE.Object3D();

        const lineMaterial = new THREE.LineBasicMaterial({color: 0x8C95AA, opacity: 0.7});
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(
          new THREE.Vector3(0, 0, 0),
        	new THREE.Vector3(30, 0, 0)
        );
        const line = new THREE.Line(lineGeometry, lineMaterial);
        anchor.add(line);

        const circleGeometry = new THREE.CircleGeometry(0.3, 64);
        const circleMaterial = new THREE.MeshBasicMaterial({color: 0xC7AFBD, opacity: 0.8});
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.x += 10;
        anchor.add(circle);

        const circleTwoGeometry = new THREE.CircleGeometry(0.7, 64);
        const circleTwoMaterial = new THREE.MeshBasicMaterial({color: 0xF16B6F, opacity: 0.8});
        const circleTwo = new THREE.Mesh(circleTwoGeometry, circleTwoMaterial);
        circleTwo.position.x += 18;
        anchor.add(circleTwo);

        anchor.rotation.z += 0.125664 * i;

        this.scene.add(anchor);
      }, 20 * i);
    }
  }

  handleResize() {
    this.renderer.setSize(this.width(), this.height());
    this.camera.aspect = this.width() / this.height();
    this.camera.updateProjectionMatrix();
  }

  loop() {
    this.render();
    requestAnimationFrame(() => {
      this.loop();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
