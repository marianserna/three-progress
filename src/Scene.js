import * as THREE from 'three';
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls.js');

import projects from './projects.js';

export default class Scene {
  constructor(container, showProjectImage) {
    this.container = container;
    this.circles = [];

    this.keys = Object.keys(projects);

    this.showProjectImage = showProjectImage;

    this.init();
    this.addLights();
    this.addSpoke();
    this.addRayCasting();
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
    const points = Array(50 - (this.keys.length)).fill(false);
    const allPoints = points.concat(this.keys);
    this.shuffle(allPoints);

    for (let i = 0; i < allPoints.length; i++) {
      setTimeout(() => {
        const anchor = new THREE.Object3D();

        const lineMaterial = new THREE.LineBasicMaterial({color: 0x8C95AA, opacity: 0.7});
        const lineGeometry = new THREE.Geometry();
        const lineLength = this.randomize(15, 35);
        lineGeometry.vertices.push(
          new THREE.Vector3(0, 0, 0),
        	new THREE.Vector3(lineLength, 0, 0)
        );
        const line = new THREE.Line(lineGeometry, lineMaterial);
        anchor.add(line);

        const circleGeometry = new THREE.CircleGeometry(0.3, 64);
        const circleMaterial = new THREE.MeshBasicMaterial({color: 0xB9A7C2, opacity: 0.8});
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.x += this.randomize(5, lineLength);
        anchor.add(circle);

        if (allPoints[i]) {
          const circleTwoGeometry = new THREE.CircleGeometry(this.randomize(0.7, 0.9), 64);
          const circleTwoMaterial = new THREE.MeshBasicMaterial({color: 0xBEF7E4, opacity: 1});
          const circleTwo = new THREE.Mesh(circleTwoGeometry, circleTwoMaterial);
          circleTwo.projectKey = allPoints[i];
          circleTwo.position.x += this.randomize(15, lineLength);
          anchor.add(circleTwo);

          this.circles.push(circleTwo);
        }

        anchor.rotation.z += 0.125664 * i;

        this.scene.add(anchor);
      }, 20 * i);
    }
  }

  shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    };
  }

  randomize(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  addRayCasting() {
    this.raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    this.container.addEventListener('click', (e) => {
      console.log(e);
      mouseVector.x = 2 * (e.offsetX / this.width()) - 1;
      mouseVector.y = 1 - 2 * (e.offsetY / this.height());
      this.raycaster.setFromCamera(mouseVector.clone(), this.camera);
      // console.log(mouseVector);

      const intersects = this.raycaster.intersectObjects(this.circles);
      if (intersects.length > 0) {
        const closest = intersects[0];
        console.log(closest);
        this.showProjectImage(closest.object.projectKey, e.offsetX, e.offsetY);
      }
    }, false);
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

// if (intersects.length > 0) {
//   const closest = intersects[0];
//   this.showPopover(closest.object.projectKey, e.offsetX, e.offsetY);
// }
