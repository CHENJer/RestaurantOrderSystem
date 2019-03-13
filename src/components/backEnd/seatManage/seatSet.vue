<template>
  <div>
    <div id="seatSet"></div>
  </div>
</template>

<script>
  import * as Three from 'three'

  export default {
    name: 'ThreeTest',
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      }
    },
    methods: {
      init: function() {
        /*获取seatSeat dom*/
        let seatSet = document.getElementById('seatSet');
        // 创建透视相机
        this.camera = new Three.PerspectiveCamera(70, seatSet.clientWidth/seatSet.clientHeight, 0.01, 10);
        this.camera.position.z = 1;
        // 创建场景
        this.scene = new Three.Scene();

        let geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
        let material = new Three.MeshNormalMaterial();

        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(seatSet.clientWidth, seatSet.clientHeight);
        seatSet.appendChild(this.renderer.domElement);

      },
      animate: function() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      }
    },
    mounted() {
      this.init();
      this.animate()
    }
  }
</script>
<style scoped>
  #seatSet {
    height: 400px;
  }
</style>
