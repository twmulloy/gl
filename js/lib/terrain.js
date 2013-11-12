/**
 * terrain generator
 * by thomas
 */

define(["_", "three"], function(_, THREE) {

  "use strict";

  var opts = {
    size: 8
  };

  var map;

  function Terrain(canvas, options) {

    _.extend(opts, options);

    if (opts.size % 2) {
      opts.size += 1;
    }

    this.canvas = canvas;
    this.geometry = new THREE.PlaneGeometry(10, 10, opts.size, opts.size);
    this.vertices = this.geometry.vertices.length;

    this.material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: true
    });

  }

  function random() {
    for (var i = 0; i < this.vertices; i++) {
      this.geometry.vertices[i].z = _.random(0, 5);
    }
  }

  /**
   * sum an array of values or sum values in a shallow array (depth of 1)
   * @param  {[type]} array [description]
   * @param  {[type]} attr  [description]
   * @return {[type]}       [description]
   */
  function avg(array, attr){
    var sum = 0;
    var length = array.length;
    for(var i = 0; i < length; i++){

      if(!_.isUndefined(attr)){
        sum += array[i][attr];
      }else{
        sum += array[i];
      }
      
    }
    return sum / length;
  }

  function seed() {

    var corners = [];

    for (var i = 0; i < this.vertices; i++) {

      if (i === 0 // top-left
        || i === opts.size // top-right
        || i === (this.vertices - opts.size - 1) // bottom-left
        || i === (this.vertices - 1) // bottom-right
      ) {
        this.geometry.vertices[i].z = _.random(0, 5);
        corners.push({
          index: i,
          z: this.geometry.vertices[i].z
        });
      }
    }

    this.square(corners, true);
  }

  /**
   * diamond step creates new squares
   * @return {[type]} [description]
   */
  function diamond(corners, midpoint) {

    var n, e, s, w;

    n = {
      index: corners[0].index + corners[1].index / 2,
      z: avg([corners[0], corners[1], midpoint], "z")
    };

    e = {
      index: midpoint.index + n.index,
      z: avg([corners[1], corners[3], midpoint], "z")
    };

    s = {
      index: corners[2].index + n.index,
      z: avg([corners[2], corners[3], midpoint], "z")
    };

    w = {
      index: midpoint.index - n.index,
      z: avg([corners[0], corners[2], midpoint], "z")
    };

    this.geometry.vertices[n.index].z = n.z;
    this.geometry.vertices[e.index].z = e.z;
    this.geometry.vertices[s.index].z = s.z;
    this.geometry.vertices[w.index].z = w.z;


    this.square([
      corners[0],
      n,
      w,
      midpoint
    ]);

    
    this.square([
      n,
      corners[1],
      midpoint,
      e
    ]);

    
    this.square([
      w,
      midpoint,
      corners[2],
      s
    ]);

    
    this.square([
      midpoint,
      e,
      s,
      corners[3]
    ]);


  }

  /**
   * square step fills in newly needed midpoints
   * @return {[type]} [description]
   */
  function square(corners, diamond) {

    var midpoint = (corners[3].index + corners[0].index) / 2;

    this.geometry.vertices[midpoint].z = avg(corners, 'z'); 

    // proceed to diamond pattern
    if(!diamond){ return false; }

    this.diamond(corners, {
      index: midpoint,
      z: this.geometry.vertices[midpoint].z
    });

  }

  function render() {
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.canvas.scene.add(this.plane);
    this.canvas.render();
  }

  Terrain.prototype = {
    constructor: Terrain,
    random: random,
    generate: seed,
    diamond: diamond,
    square: square,
    render: render
  };

  return Terrain;
});