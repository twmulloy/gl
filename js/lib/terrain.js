/**
 * terrain generator
 * by thomas
 */

define(["_", "three"], function(_, THREE) {

  "use strict";

  var opts = {
    size: 10
  };

  var map;

  function Terrain(canvas, options) {

    _.extend(opts, options);

    if (opts.size % 2) {
      opts.size += 1;
    }

    this.geometry = new THREE.PlaneGeometry(10, 10, opts.size, opts.size);

    var length = this.geometry.vertices.length;

    for(var i = 0; i < length; i++){
      this.geometry.vertices[i].z = _.random(0, 5);
    }

    this.material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: true
    });

    console.log(this.geometry);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    canvas.scene.add(this.plane);
    canvas.render();
  }

  Terrain.prototype = {
    constructor: Terrain
  };

  return Terrain;
});