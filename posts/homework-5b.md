---
title: Homework 5b
published_at: 2025-04-08
snippet: Implement a three.js example directly in my blog. And think about the questions about glitch art by Sabato Visconti.
disable_html_sanitization: true
allow_math: true
---

# Implement a three.js example directly in my blog.

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Three.js Character Animation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #three-container {
            position: relative;
        }
        canvas {
            display: block;
            margin: -250px auto -250px -500px;
            transform: scale(0.4);
            transform-origin: center center;
        }
    </style>
</head>
<body>

<div id="three.js_container"></div>

<script type="module">
    import * as THREE from "/250408/three.js-master/build/three.module.js"

    console.log(THREE)

    const container = document.getElementById(`three.js_container`);
    //container.style.overflow = `hidden`;
    //container.width = `window.innerWidth`;
    //container.height = `auto`; 
   

			import { OrbitControls } from '/250408/three.js-master/examples/jsm/controls/OrbitControls.js';
			import { GUI } from '/250408/three.js-master/examples/jsm/libs/lil-gui.module.min.js';

			import { GLTFLoader } from '/250408/three.js-master/examples/jsm/loaders/GLTFLoader.js';
			import { RGBELoader } from '/250408/three.js-master/examples/jsm/loaders/RGBELoader.js';

			let scene, renderer, camera, floor, orbitControls;
			let group, followGroup, model, skeleton, mixer, clock;
		
			let actions;

			let settings = {
				show_skeleton:false,
				fixe_transition: true,
			};

			const PI = Math.PI;
			const PI90 = Math.PI / 2;

			const controls = {

				key:[0,0],
				ease : new THREE.Vector3(),
				position : new THREE.Vector3(),
				up : new THREE.Vector3(0, 1, 0),
				rotate: new THREE.Quaternion(),
				current:'Idle',
				fadeDuration:0.5,
				runVelocity:5,
				walkVelocity:1.8,
				rotateSpeed:0.05,
				floorDecale:0,

			};


			init();

			function init() {


				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
                camera.position.set( 0, 2, - 5 );
				//camera.lookAt( 0, 1, 0 );


				clock = new THREE.Clock();

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x5e5d5d );
				scene.fog = new THREE.Fog( 0x5e5d5d, 2, 20 );

				group = new THREE.Group();
				scene.add(group);

				followGroup = new THREE.Group();
				scene.add(followGroup);

				/*const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xb3602b, 0.5 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );*/

				const dirLight = new THREE.DirectionalLight( 0xffffff, 5 );
				dirLight.position.set( - 2, 5, - 3 );
				dirLight.castShadow = true;
				let cam = dirLight.shadow.camera;
				cam.top = cam.right = 2;
				cam.bottom = cam.left = - 2;
				cam.near = 3;
				cam.far = 8;
				dirLight.shadow.bias = -0.005;
				dirLight.shadow.radius = 4;
				followGroup.add( dirLight );
				followGroup.add( dirLight.target );

				//scene.add( new THREE.CameraHelper( cam ) );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.5;
				renderer.shadowMap.enabled = true;
		    	container.appendChild( renderer.domElement );

				orbitControls = new OrbitControls( camera, renderer.domElement );
				orbitControls.target.set( 0, 1, 0 );
				orbitControls.enableDamping = true;
				orbitControls.enablePan = false;
				orbitControls.maxPolarAngle = PI90 - 0.05;
				orbitControls.update();

				// EVENTS

				//window.addEventListener( 'resize', onWindowResize );
				document.addEventListener( 'keydown', onKeyDown );
				document.addEventListener( 'keyup', onKeyUp );


				// DEMO

				new RGBELoader()
					.setPath( '/250408/three.js-master/examples/textures/equirectangular/' )
					.load( 'lobe.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;
						scene.environment = texture;
						scene.environmentIntensity = 1.5;

						loadModel();
						addFloor();

					});

			}

			function addFloor() {

				let size = 50;
				let repeat = 16;

				const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

				const floorT = new THREE.TextureLoader().load( '/250408/three.js-master/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg' );
				floorT.colorSpace = THREE.SRGBColorSpace;
				floorT.repeat.set( repeat, repeat );
				floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping;
				floorT.anisotropy = maxAnisotropy;

				const floorN = new THREE.TextureLoader().load( '/250408/three.js-master/examples/textures/floors/FloorsCheckerboard_S_Normal.jpg' );
				floorN.repeat.set( repeat, repeat );
				floorN.wrapS = floorN.wrapT = THREE.RepeatWrapping;
				floorN.anisotropy = maxAnisotropy;

				let mat = new THREE.MeshStandardMaterial( { map:floorT, normalMap:floorN, normalScale:new THREE.Vector2(0.5,0.5), color: 0x404040, depthWrite: false, roughness:0.85 } )

				let g = new THREE.PlaneGeometry( size, size, 50, 50 );
				g.rotateX( -PI90 );

				floor = new THREE.Mesh( g, mat );
				floor.receiveShadow = true;
				scene.add( floor );

				controls.floorDecale = (size / repeat) * 4;

				const bulbGeometry = new THREE.SphereGeometry( 0.05, 16, 8 );
				let bulbLight = new THREE.PointLight( 0xffee88, 2, 500, 2 );

				let bulbMat = new THREE.MeshStandardMaterial( { emissive: 0xffffee, emissiveIntensity: 1, color: 0x000000 } );
				bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
				bulbLight.position.set( 1, 0.1, -3 );
				bulbLight.castShadow = true;
				floor.add( bulbLight );

			}

			function loadModel() {

				const loader = new GLTFLoader();
				loader.load( '/250408/three.js-master/examples/models/gltf/Soldier.glb', function ( gltf ) {


					model = gltf.scene;
					group.add( model );
					
                    model.position.set( 0, 0, 0 );
                    model.rotation.y = PI;
                    group.rotation.y = PI;
                    group.position.set( 0, 0, 0 );


					model.traverse( function ( object ) {

						if ( object.isMesh ){
						    if( object.name == 'vanguard_Mesh' ){
						    	object.castShadow = true;
								object.receiveShadow = true;
								object.material.shadowSide = THREE.DoubleSide;
								//object.material.envMapIntensity = 0.5;
								object.material.metalness = 1.0;
								object.material.roughness = 0.2;
								object.material.color.set(1,1,1);
								object.material.metalnessMap = object.material.map;
						    } else {
						    	object.material.metalness = 1;
								object.material.roughness = 0;
								object.material.transparent = true;
								object.material.opacity = 0.8;
								object.material.color.set(1,1,1);
						    }
						}

					});

					//

					skeleton = new THREE.SkeletonHelper( model );
					skeleton.visible = false;
					scene.add( skeleton );

					//

					createPanel();

					//

					const animations = gltf.animations;

					mixer = new THREE.AnimationMixer( model );

					actions = {
						Idle:mixer.clipAction( animations[ 0 ] ),
						Walk:mixer.clipAction( animations[ 3 ] ),
						Run:mixer.clipAction( animations[ 1 ] )
					};

					for( let m in actions ){
						actions[m].enabled = true;
						actions[m].setEffectiveTimeScale( 1 );
						if(m!=='Idle') actions[m].setEffectiveWeight( 0 );
					}

					actions.Idle.play();

					animate();

				});

			}

			function updateCharacter( delta ) {

				const fade = controls.fadeDuration
				const key = controls.key;
				const up = controls.up;
				const ease = controls.ease;
				const rotate = controls.rotate;
				const position = controls.position;
				const azimut = orbitControls.getAzimuthalAngle();

				let active = key[0] === 0 && key[1] === 0 ? false : true;
				let play = active ? (key[2] ? 'Run' : 'Walk') : 'Idle';

		        // change animation

		        if ( controls.current != play ){

		           

		        	const current = actions[play];
		            const old = actions[controls.current];
		            controls.current = play;

		            if( settings.fixe_transition ){
		            	current.reset()
		            	current.weight = 1.0;
		            	current.stopFading()
		            	old.stopFading();
		            	// sycro if not idle
                        if ( play !== 'Idle' ) current.time = old.time * ( current.getClip().duration / old.getClip().duration );
		            	old._scheduleFading( fade, old.getEffectiveWeight(), 0 );
                        current._scheduleFading( fade, current.getEffectiveWeight(), 1 );	
			            current.play();
		            } else {
		            	setWeight( current, 1.0 );
			            old.fadeOut(fade);
			            current.reset().fadeIn( fade ).play();
		            }

		        }

		        // move object

		        if ( controls.current !== 'Idle' ) {

		            // run/walk velocity
		            let velocity = controls.current == 'Run' ? controls.runVelocity : controls.walkVelocity;

		            // direction with key
		            ease.set( key[1], 0, key[0] ).multiplyScalar( velocity * delta );

		            // calculate camera direction
		            let angle = unwrapRad( Math.atan2( ease.x, ease.z ) + azimut );
		            rotate.setFromAxisAngle( up, angle );
		            
		            // apply camera angle on ease
		            controls.ease.applyAxisAngle( up, azimut );

		            position.add( ease );
		            camera.position.add( ease );

		            group.position.copy( position );
		            group.quaternion.rotateTowards( rotate, controls.rotateSpeed );

		            orbitControls.target.copy(position).add(new THREE.Vector3(0, 1, 0));
		            followGroup.position.copy( position );

		            // decale floor at infinie
		            let dx = ( position.x - floor.position.x );
		            let dz = ( position.z - floor.position.z );
		            if( Math.abs(dx) > controls.floorDecale ) floor.position.x += dx;
		            if( Math.abs(dz) > controls.floorDecale ) floor.position.z += dz;

			    }

				mixer.update( delta );
				orbitControls.update();

			}

			function unwrapRad(r) {
				return Math.atan2(Math.sin(r), Math.cos(r));
			}

			function createPanel() {

				const panel = new GUI( { width: 310 } );

				panel.add( settings, 'show_skeleton' ).onChange( (b) => { skeleton.visible = b; } );
				panel.add( settings, 'fixe_transition' );

			}

			function setWeight( action, weight ) {

				action.enabled = true;
				action.setEffectiveTimeScale( 1 );
				action.setEffectiveWeight( weight );

			}

			function onKeyDown( event ) {

				const key = controls.key;
				switch ( event.code ) {
					case 'ArrowUp': case 'KeyW': case 'KeyZ': key[0] = -1; break;
					case 'ArrowDown': case 'KeyS': key[0] = 1; break;
					case 'ArrowLeft': case 'KeyA': case 'KeyQ': key[1] = -1; break;
					case 'ArrowRight': case 'KeyD': key[1] = 1; break;
					case 'ShiftLeft' : case 'ShiftRight' : key[2] = 1; break;
				}

			}

			function onKeyUp( event ) {

				const key = controls.key;
				switch ( event.code ) {
					case 'ArrowUp': case 'KeyW': case 'KeyZ': key[0] = key[0]<0 ? 0:key[0]; break;
					case 'ArrowDown': case 'KeyS': key[0] = key[0]>0 ? 0:key[0]; break;
					case 'ArrowLeft': case 'KeyA': case 'KeyQ': key[1] = key[1]<0 ? 0:key[1]; break;
					case 'ArrowRight': case 'KeyD': key[1] = key[1]>0 ? 0:key[1]; break;
					case 'ShiftLeft' : case 'ShiftRight' : key[2] = 0; break;
				}

			}

function resizeContainer(width, height) {
    // Get the container element
    const container = document.getElementById('three-container');

    // Set each style property individually
    container.style.position = "relative";
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.overflow = "visible";

    // Update the renderer size to match
    renderer.setSize(width, height, true);

    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}




			function animate() {

				// Render loop

				requestAnimationFrame( animate );

				let delta = clock.getDelta();

				updateCharacter( delta );

				renderer.render( scene, camera );

			}

</script>
</body>
</html>

# Think about the questions about glitch art by Sabato Visconti.

1. What does having the 3D form glitch out like this do in terms of aesthetic register, and effective complexity?

In terms of aesthetic register, I think the persistence of the rose, its unnatural deformation and the sharp shifts between angles suggest deliberate damage or malfunction. It lies somewhere between the natural and the artificial, giving it a disturbing and unfamiliar aesthetic.
And also I think it maybe have a symbolic representation. Because black rose symbolizes death, mystery thing. The malfunctioning effect makes it even more grotesque, turning the flower into something lively but unstable, which may indicate decay.

And in terms of effective complexity, I think the shape of the rose is still recognisable and therefore has a consistent structure. However, rotational jumps and unexpected deformations bring unpredictability and layered interpretations. The work thus achieves the optimal balance of effective complexity: ‘we see a flower’ to lay its foundation, but with enough surprise to provoke curiosity or discomfort.

2. How do you think it works, under the hood?

The flower is likely to be in the form of a low polygonal 3D object with a stylised material. It may have been rendered in Blender or similar software, where the rotating keyframes were disrupted or deliberately exported in a discontinuous order, because instead of moving slowly between angles, it jumped then causing a glitchy feel.
