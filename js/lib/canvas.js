define(["three", "three.controls"], function(THREE) {

  "use strict";

  var scene, camera, renderer, w, h, controls;

  function Canvas() {
    this.scene = scene = new THREE.Scene();
    w = window.innerWidth;
    h = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
    camera.position.set(0, 0, 10);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    this.render = render;

    return this;
  }

  function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  Canvas.prototype = {
    constructor: Canvas,
  };

  return Canvas;
});