import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import model from 'components/shared/vanity-lab/three/models/model3/scene.gltf';
import { darkTheme } from '../../../theme';

class WebGl extends Component {
    componentDidMount() {
        var camera, scene, renderer, light1, light2,light3,light4, object;
        var { data_width, data_height } = this.props;
            //Create new Camera
            camera = new THREE.PerspectiveCamera(45, data_width / data_height, 0.1, 1000);
            camera.position.z = 15;
            camera.position.x = 0;
            camera.position.y = 2;

        //Create new Scene
            scene = new THREE.Scene();


            var loader = new GLTFLoader();


        console.log(loader);

        loader.load('./model/scene.gltf', function (gltf) {
                object = gltf;
                console.log(gltf);

                scene.add(gltf.scene);
                scene.background = new THREE.Color(darkTheme.tm_dark);

            }, undefined, function (error) {

                console.error(error);

            });



            var sphere = new THREE.SphereBufferGeometry(0.5, 20, 20);

        light1 = new THREE.PointLight(0x4A3457, 5, 50);
        light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x4A3457 })));
        scene.add(light1);

        light2 = new THREE.PointLight(0xFF6969, 5, 50);
        light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xFF6969 })));
        scene.add(light2);

        light3 = new THREE.PointLight(0xA02B5D, 5, 50);
        light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xA02B5D })));
        scene.add(light3);

        light4 = new THREE.PointLight(0xE8CFDE, 5, 50);
        light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xE8CFDE })));
        scene.add(light4);


            renderer = new THREE.WebGLRenderer({ antialias: false });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(data_width, data_height);
            this.mount.appendChild(renderer.domElement);
            renderer.gammaOutput = true;




        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = data_width / data_height;
            camera.updateProjectionMatrix();
            renderer.setSize(data_width, data_height);
        }


        function animate() {
            requestAnimationFrame(animate);
            scene.rotation.y += 0.0008;
            render();
        };


        function render() {
            var time = Date.now() * 0.0005;
            light1.position.x = Math.sin(time * 0.7) * 30;
            light1.position.y = Math.cos(time * 0.5) * 40;
            light1.position.z = Math.cos(time * 0.3) * 30;

            light2.position.x = Math.cos(time * 0.3) * 30;
            light2.position.y = Math.sin(time * 0.5) * 40;
            light2.position.z = Math.sin(time * 0.7) * 30;

            light3.position.x = Math.sin(time * 0.7) * 30;
            light3.position.y = Math.cos(time * 0.3) * 40;
            light3.position.z = Math.sin(time * 0.5) * 30;

            light4.position.x = Math.sin(time * 0.3) * 30;
            light4.position.y = Math.cos(time * 0.7) * 40;
            light4.position.z = Math.sin(time * 0.5) * 30;
            renderer.render(scene, camera);
        }

        animate();
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}

export default WebGl;

//light1.position.x = Math.sin(time * 0.7) * 30;
//light1.position.y = Math.cos(time * 0.5) * 40;
//light1.position.z = Math.cos(time * 0.3) * 30;
//light2.position.x = Math.cos(time * 0.3) * 30;
//light2.position.y = Math.sin(time * 0.5) * 40;
//light2.position.z = Math.sin(time * 0.7) * 30;
            //if (object) object.rotation.y -= 0.05 * delta;
//light1 = new THREE.PointLight(0xff0040, 2, 50);
//light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xF75965 })));
//scene.add(light1);
//light2 = new THREE.PointLight(0x0040ff, 2, 50);
//light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xF75965 })));