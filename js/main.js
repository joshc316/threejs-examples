import * as THREE from 'three';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

			let camera, controls, scene, renderer;

			init();
			//render(); // remove when using animation loop

			function init() {
               //Instancia el objeto scene o crea el objeto scene
				scene = new THREE.Scene();
                

				scene.background = new THREE.Color( 0xf3f5f2);
				scene.fog = new THREE.FogExp2( 0x02f026, 0.002 );
                console.log(scene);

                //El ANTIALIAS refina los elementos 3D
				renderer = new THREE.WebGLRenderer( { antialias: true } );
                //Colocas el mismo pixel dependiendo del tamaño de la pantalla
                renderer.setPixelRatio( window.devicePixelRatio );
                //Renderiza la animación al tamaño de la pantalla
				renderer.setSize( window.innerWidth, window.innerHeight );
                //Hace que aparezca la animación cuando movemos el mouse
				renderer.setAnimationLoop( animate );
				document.body.appendChild( renderer.domElement );

                //Colocar una camara de forma predetiminada 
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
                //Posición de la camara
				camera.position.set( 300, 0, 0 );

				// controls

				controls = new OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;//En false impide que podamos entrar a los valos negativos de la animación

				controls.minDistance = 100;
				controls.maxDistance = 500;

				controls.maxPolarAngle = Math.PI / 2;

				// world

				const geometry = new THREE.ConeGeometry( 40, 60, 4, 1 );//Son las propuedades del cono
				const material = new THREE.MeshPhongMaterial( { color: 0xdec87a, flatShading: true } );

				for ( let i = 0; i < 1000; i ++ ) {

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 1600 - 800;
					mesh.position.y = 0;
					mesh.position.z = Math.random() * 1600 - 800;
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = false;
					scene.add( mesh );

				}

				// lights

				const dirLight1 = new THREE.DirectionalLight( 0xebf700, 3 );
				dirLight1.position.set( 1, 1, 1 );
				scene.add( dirLight1 );

				const dirLight2 = new THREE.DirectionalLight( 0x6b7003, 3 );
				dirLight2.position.set( - 1, - 1, - 1 );
				scene.add( dirLight2 );

				const ambientLight = new THREE.AmbientLight( 0x555555 );
				scene.add( ambientLight );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}