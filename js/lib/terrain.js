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

    this.map = [];
    this.geometry = new THREE.PlaneGeometry(60, 60, 200, 200);

    for (var i = 0, l = this.geometry.vertices.length; i < length; i++) {
      this.geometry.vertices[i].z = _.random(0, 10) * .1;
    }

    this.material = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      wireframe: true
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    canvas.scene.add(this.plane);
    //canvas.scene.add(new THREE.AmbientLight(0xeeeeee));
    canvas.render();

  }

  // function seed() {
  //   var map = [];
  //   for (var x = 0; x < opts.size; x++) {
  //     var row = [];
  //     for (var y = 0; y < opts.size; y++) {
  //       var z = _.random(0, 100);
  //       row.push(z);
  //     }
  //     map.push(row);
  //   }
  //   return map;
  // }

  Terrain.prototype = {
    constructor: Terrain
  };

  return Terrain;
});