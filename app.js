requirejs.config({
  urlArgs: "v=" + (new Date()).getTime(),
  baseUrl: "js",
  shim: {
    "_": {
      exports: "_"
    },
    "$": {
      exports: "$"
    },
    "three": {
      exports: "THREE"
    },
    "three.controls": {
      deps: ['three'],
      exports: "THREE.TrackballControls"
    }
  },
  paths: {
    "lib": "lib",
    "vendor": "vendor",

    // shim paths
    "_": "vendor/underscore",
    "$": "vendor/jquery",
    "three": "vendor/three/build/three.min",
    "three.controls": "vendor/three/src/extras/controls/TrackballControls"
  }
});

require([
  "_",
  "$",
  "lib/terrain",
  "lib/canvas"
], function(_, $, Terrain, Canvas) {

  var canvas, terrain;

  $(function(){
    canvas = new Canvas();
    canvas.render();

    terrain = new Terrain(canvas, {
      //size: 8
    });

    terrain.generate();
    terrain.render();
  });

});
