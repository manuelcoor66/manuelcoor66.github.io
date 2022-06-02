// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { Stats } from '../libs/stats.module.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto
import { MyPersonaje } from './MyPersonaje.js'
import * as COCHE from './coche1.js'
import * as CAMION from './camion1.js'
import * as CAMION2 from './camion2.js'
import * as ARBOL1 from './arbol1.js'
import * as ARBOL2 from './arbol2.js'
import * as ARBOL3 from './arbol3.js'
import * as ARBOL4 from './arbol4.js'
import * as ARBOL5 from './arbol5.js'
import * as ARBOL6 from './arbol6.js'



class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    this.gameover = false

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;


    this.personaje = new MyPersonaje();
    this.personaje.castShadow = true;
    this.personaje.receiveShadow = false;
    this.personaje.traverse(n => { if ( n.isMesh ) {
      n.castShadow = true; 
      n.receiveShadow = true;
      if(n.material.map) n.material.map.anisotropy = 16; 
    }});  

    this.PersonajedesplazarDelante();


    this.add(this.personaje);


    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (-70, 40, 0);
		// Y hacia dónde mira
		this.camera.lookAt(this.personaje.position);

		this.add (this.camera);

    this.coches = [];
    this.camiones = [];
    this.arboles = [];
    
 
    this.coche1 = new COCHE.Coche1();
    this.coches.push(this.coche1);
    
    this.camion1 = new CAMION2.Camion2();  
    this.camiones.push(this.camion1);

    this.coche2 = new COCHE.Coche1();    
    this.coches.push(this.coche2);
    
    this.camion2 = new CAMION.Camion1();   
    this.camiones.push(this.camion2);

    this.camion3 = new CAMION2.Camion2();
    this.camiones.push(this.camion3);

    this.camion4 = new CAMION.Camion1();
    this.camiones.push(this.camion4);

    this.coche3 = new COCHE.Coche1();
    this.coches.push(this.coche3);

    this.camion5 = new CAMION2.Camion2();
    this.camiones.push(this.camion5);

    this.coche4 = new COCHE.Coche1();
    this.coches.push(this.coche4);

    this.coche5 = new COCHE.Coche1();
    this.coches.push(this.coche5);

    this.camion6 = new CAMION.Camion1();
    this.camiones.push(this.camion6);

    this.arbol1 = new ARBOL1.Arbol1();
    this.arboles.push(this.arbol1);

    this.arbol2 = new ARBOL2.Arbol2();
    this.arboles.push(this.arbol2);

    this.arbol3 = new ARBOL3.Arbol3();
    this.arboles.push(this.arbol3);

    this.arbol4 = new ARBOL4.Arbol4();
    this.arboles.push(this.arbol4);

    this.arbol5 = new ARBOL5.Arbol5();
    this.arboles.push(this.arbol5);

    this.arbol6 = new ARBOL6.Arbol6();
    this.arboles.push(this.arbol6);

    for (var i = 0; i < this.coches.length; i++) {
      this.add(this.coches[i]);
    }
    
    for (var i = 0; i < this.camiones.length; i++) {
      this.add(this.camiones[i]);
    }
    
    for (var i = 0; i < this.arboles.length; i++) {
    this.add(this.arboles[i]);
    }

    this.initStats();
    
    this.createLights ();
    
    // Un suelo 
    this.createGround ();       
  }
  
  
  initStats() {
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;    
  }

  createGround () {   
    var hierbas = [];
    var calles = [];

    var hierba1 = this.createHierba();
    var calle1 = this.createCalle();
    var hierba2 = this.createHierba();
    var calle2 = this.createCalle();
    var hierba3 = this.createHierba();
    var calle3 = this.createCalle();
    var calle4 = this.createCalle();
    var hierba4 = this.createHierba();
    hierbas.push(hierba1, hierba2, hierba3, hierba4);
    calles.push(calle1, calle2, calle3, calle4);


    hierbas[0].position.y = -25;
    calles[0].position.y = -25;
    calles[0].position.x = +50; 

    hierbas[1].position.y = -25;
    calles[1].position.y = -25;
    hierbas[1].position.x = +100;
    calles[1].position.x = +150; 

    hierbas[2].position.y = -25;
    calles[2].position.y = -25;
    hierbas[2].position.x = +200;
    calles[2].position.x = +250;

    calles[3].position.y = -25;
    calles[3].position.x = +300;  
    hierbas[3].position.y = -25;
    hierbas[3].position.x = +350;

    for (var i = 0; i < hierbas.length; i++) {
      hierbas[i].receiveShadow = true;
      hierbas[i].castShadow = true;
    }
    
    for (var i = 0; i < calles.length; i++) {
      calles[i].receiveShadow = true;
      calles[i].castShadow = true;
    }

    for (var i = 0; i < hierbas.length; i++) {
      this.add (hierbas[i]);
    }

    for (var i = 0; i < calles.length; i++) {
      this.add (calles[i]);
    }
  }


  createCalle () {
    var loader = new THREE.TextureLoader();
    var texture = loader.load( 'texturas/stone.jpg', function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );
    texture.offset
    } );


    var loader1 = new THREE.TextureLoader();
    var texture1 = loader1.load( 'texturas/earth.jpg', function ( texture1 ) {
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.offset.set( 0, 0 );
    texture1.repeat.set( 15, 15 );
    } );

    var geometryStreet = new THREE.BoxGeometry (50,50,180);
    
    var calle_Material =
    [
      new THREE.MeshPhongMaterial( { map: texture1}), //right side        
      new THREE.MeshPhongMaterial( { map: texture1}), // bottom side
      new THREE.MeshPhongMaterial( { map: texture}),
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // back side

    ]
    var material_street = new THREE.MeshFaceMaterial(calle_Material); 
    var calle = new THREE.Mesh (geometryStreet, material_street);

    return calle;
  }

  createHierba () {
    var loader = new THREE.TextureLoader();
    var texture = loader.load( 'texturas/grass-m.jpg', function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );
    } );

    var loader1 = new THREE.TextureLoader();
    var texture1 = loader1.load( 'texturas/earth.jpg', function ( texture1 ) {
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.offset.set( 0, 0 );
    texture1.repeat.set( 10, 10 );
    } );
    

    var geometryGrass = new THREE.BoxGeometry (50,50,80);    

    var hierba_Material = 
    [      
      new THREE.MeshPhongMaterial( { map: texture1}), //right side        
      new THREE.MeshPhongMaterial( { map: texture1}), // bottom side
      new THREE.MeshPhongMaterial( { map: texture}),
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // back side
    ]

    var material_grass = new THREE.MeshFaceMaterial(hierba_Material); 
    var hierba = new THREE.Mesh (geometryGrass, material_grass);

    return hierba;
  }

 
  
  createLights () {   
    var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.add(hemiLight);

    this.spotLight = new THREE.SpotLight(0xffa95c, 10);
    this.spotLight.position.set(410, 90, 40);
    this.spotLight.castShadow = true;
    this.add(this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  } 

  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  getPersonaje(){
    return this.personaje;
  }

  getCamera(){
    return this.camera;
  }


  PersonajedesplazarDelante() {
		var origen = {p: 0}
		var destino = {p: 1}

		this.movement = new TWEEN.Tween(origen).to(destino, 100)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(() => {
			this.personaje.translateY(0.1);
		})

		this.movement1 = new TWEEN.Tween(origen).to(destino, 100)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(() => {
			this.personaje.translateY(-0.1);
		})

    this.movement2 = new TWEEN.Tween(origen).to(destino, 100)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(() => {
			this.personaje.position.x += 1.5;
      this.camera.position.x += 1.5;
      
		})    

    this.movement3 = new TWEEN.Tween(origen).to(destino, 20)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(() => {
			//this.personaje.ala1.translateX(0.05);
			this.personaje.ala1.rotateX(Math.PI/2);
      
			//this.personaje.ala2.translateX(0.05);
			this.personaje.ala2.rotateX(Math.PI/2);
      
		}) 

    this.movement4 = new TWEEN.Tween(origen).to(destino, 100)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(() => {
			//this.personaje.ala1.translateX(-0.05);
			this.personaje.ala1.rotateX(-Math.PI/2);

			//this.personaje.ala2.translateX(-0.05);
			this.personaje.ala2.rotateX(-Math.PI/2);
      
		})   

		this.movement.chain(this.movement1);
		this.movement3.chain(this.movement4);
  }

  update () {
    if (this.stats) this.stats.update();  
    TWEEN.update();
    this.renderer.render (this, this.camera); 
    requestAnimationFrame(() => this.update());

  }

  getMouse(event){
    var mouse = 0;
    mouse = (event.clientX / window.innerWidth) * 2 - 1;
    return mouse;
  }
  
  
  onMouseMove (event) {
    var actual = this.getMouse(event)
    //derecha
    if(this.gameover == false){
      if (actual > X_ant ){
        if (this.personaje.position.z < 35){
        this.personaje.position.z += 3;
        this.camera.position.z += 3;
        }
        //izquierda
      } else if (actual < X_ant ){
        if (this.personaje.position.z > -35){
        this.personaje.position.z -= 3;
        this.camera.position.z -= 3;
        }
      }
        X_ant = actual;
    }
  }  

  onMouseClick (event) {
    switch(event.which) {
      case 1:
        if(this.gameover == false){
        this.movement.start()
        this.movement2.start()
        this.movement3.start()
        }        
    }
  }
}


var X_ant = 0;

//Movimiento Coches
var paths = [];

var path = [
  new THREE.Vector3(40, 0, -80),
  new THREE.Vector3(40, 0, 80),
];
paths.push(path);

var path2 = [
  new THREE.Vector3(60, 0, 80),
  new THREE.Vector3(60, 0, -80),
];
paths.push(path2);

var path3 = [
  new THREE.Vector3(140, 0, -80),
  new THREE.Vector3(140, 0, 80),
];
paths.push(path3);

var path4 = [
  new THREE.Vector3(160, 0, 80),
  new THREE.Vector3(160, 0, -80),
];
paths.push(path4);

var path5 = [
  new THREE.Vector3(240, 0, -80),
  new THREE.Vector3(240, 0, 80),
];
paths.push(path5);

var path6 = [
  new THREE.Vector3(250, 0, 80),
  new THREE.Vector3(250, 0, -80),
];
paths.push(path6);

var path7 = [
  new THREE.Vector3(260, 0, 80),
  new THREE.Vector3(260, 0, -80),
];
paths.push(path7);

var path8 = [
  new THREE.Vector3(270, 0, -80),
  new THREE.Vector3(270, 0, 80),
];
paths.push(path8);

var path9 = [
  new THREE.Vector3(280, 0, -80),
  new THREE.Vector3(280, 0, 80),
];
paths.push(path8);

var path10 = [
  new THREE.Vector3(290, 0, 80),
  new THREE.Vector3(290, 0, -80),
];
paths.push(path10);

var path11 = [
  new THREE.Vector3(300, 0, -80),
  new THREE.Vector3(300, 0, 80),
];
paths.push(path11);

var curvas = [];

for (var i = 0; i < paths.length; i++) {
  curvas[i] = new THREE.CatmullRomCurve3(paths[i]);
}

var origen = {p: 0}
  var destino = {p: 1}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  //Coche1
  scene.coches[0].translateY(0.6); 
  var movement = new TWEEN.Tween(origen).to(destino, 5000)
  movement.easing(TWEEN.Easing.Linear.None)
  movement.onUpdate(() => {
      var posicion = curvas[0].getPointAt(origen.p)
      scene.coches[0].position.copy(posicion)
    })
    movement.onComplete(() => {origen.p = 0;})
    movement.repeat(Infinity)
    movement.start()


  //Camion1
  scene.camiones[0].translateY(0.6);
  scene.camiones[0].rotateY(Math.PI); 
  var movement2 = new TWEEN.Tween(origen).to(destino, 5000)
  movement2.easing(TWEEN.Easing.Linear.None)
  movement2.onUpdate(() => {
      var posicion = curvas[1].getPointAt(origen.p)
      scene.camiones[0].position.copy(posicion)
    })
    movement2.onComplete(() => {origen.p = 0;})
    movement2.repeat(Infinity)
    movement2.start()

  //Coche2
  scene.coches[1].translateY(0.6);
  var movement3 = new TWEEN.Tween(origen).to(destino, 2000)
  movement3.easing(TWEEN.Easing.Linear.None)
  movement3.onUpdate(() => {
      var posicion3 = curvas[2].getPointAt(origen.p)
      scene.coches[1].position.copy(posicion3)
    })
    movement3.onComplete(() => {origen.p = 0;})
    movement3.repeat(Infinity)
    movement3.start()

  //Camion2
  scene.camiones[1].translateY(0.6);
  scene.camion2.rotateY(Math.PI);
  var movement4 = new TWEEN.Tween(origen).to(destino, 2000)
  movement4.easing(TWEEN.Easing.Linear.None)
  movement4.onUpdate(() => {
      var posicion = curvas[3].getPointAt(origen.p)
      scene.camiones[1].position.copy(posicion)
    })
    movement4.onComplete(() => {origen.p = 0;})
    movement4.repeat(Infinity)
    movement4.start()

  //Camion3
  scene.camiones[2].translateY(0.6);  
  var movement5 = new TWEEN.Tween(origen).to(destino, 3000)
  movement5.easing(TWEEN.Easing.Linear.None)
  movement5.onUpdate(() => {
      var posicion = curvas[4].getPointAt(origen.p)
      scene.camiones[2].position.copy(posicion)
    })
    movement5.onComplete(() => {origen.p = 0;})
    movement5.repeat(Infinity)
    movement5.start()

  //Camion4
  scene.camiones[3].translateY(0.6);
  scene.camion4.rotateY(Math.PI);
  var movement6 = new TWEEN.Tween(origen).to(destino, 1000)
  movement6.easing(TWEEN.Easing.Linear.None)
  movement6.onUpdate(() => {
      var posicion = curvas[5].getPointAt(origen.p)
      scene.camiones[3].position.copy(posicion)
    })
    movement6.onComplete(() => {origen.p = 0;})
    movement6.repeat(Infinity)
    movement6.start()

  //Coche3
  scene.coches[2].translateY(0.6);
  scene.coche3.rotateY(Math.PI);
  var movement7 = new TWEEN.Tween(origen).to(destino, 4000)
  movement7.easing(TWEEN.Easing.Linear.None)
  movement7.onUpdate(() => {
      var posicion3 = curvas[6].getPointAt(origen.p)
      scene.coches[2].position.copy(posicion3)
    })
    movement7.onComplete(() => {origen.p = 0;})
    movement7.repeat(Infinity)
    movement7.start()

  //Camion5
  scene.camiones[4].translateY(0.6);
  var movement8 = new TWEEN.Tween(origen).to(destino, 3500)
  movement8.easing(TWEEN.Easing.Linear.None)
  movement8.onUpdate(() => {
      var posicion = curvas[7].getPointAt(origen.p)
      scene.camiones[4].position.copy(posicion)
    })
    movement8.onComplete(() => {origen.p = 0;})
    movement8.repeat(Infinity)
    movement8.start()

  //Coche4
  scene.coches[3].translateY(0.6);
  var movement9 = new TWEEN.Tween(origen).to(destino, 1500)
  movement9.easing(TWEEN.Easing.Linear.None)
  movement9.onUpdate(() => {
      var posicion3 = curvas[8].getPointAt(origen.p)
      scene.coches[3].position.copy(posicion3)
    })
    movement9.onComplete(() => {origen.p = 0;})
    movement9.repeat(Infinity)
    movement9.start()


  //Coche5
  scene.coches[4].translateY(0.6);
  scene.coches[4].rotateY(Math.PI);
  var movement10 = new TWEEN.Tween(origen).to(destino, 4000)
  movement10.easing(TWEEN.Easing.Linear.None)
  movement10.onUpdate(() => {
      var posicion3 = curvas[9].getPointAt(origen.p)
      scene.coches[4].position.copy(posicion3)
    })
    movement10.onComplete(() => {origen.p = 0;})
    movement10.repeat(Infinity)
    movement10.start()

  //Camion6
  scene.camiones[5].translateY(0.6);
  var movement11 = new TWEEN.Tween(origen).to(destino, 3500)
  movement11.easing(TWEEN.Easing.Linear.None)
  movement11.onUpdate(() => {
      var posicion = curvas[10].getPointAt(origen.p)
      scene.camiones[5].position.copy(posicion)
    })
    movement11.onComplete(() => {origen.p = 0;})
    movement11.repeat(Infinity)
    movement11.start()

  //Arbol1  
  scene.arboles[0].translateY(-0.6);
  scene.arboles[0].translateX(20);
  scene.arboles[0].translateZ(25);

  //Arbol2  
  scene.arboles[1].translateY(-0.6);
  scene.arboles[1].translateX(80);
  scene.arboles[1].translateZ(-15);
  
  //Arbol3  
  scene.arboles[2].translateY(-0.6);
  scene.arboles[2].translateX(110);
  scene.arboles[2].translateZ(30);
  scene.arboles[2].rotateY(Math.PI/2);

  //Arbol4  
  scene.arboles[3].translateY(-0.6);
  scene.arboles[3].translateX(190);
  scene.arboles[3].translateZ(-30);
  
  //Arbol5  
  scene.arboles[4].translateY(-0.6);
  scene.arboles[4].translateX(210);
  
  //Arbol6
  scene.arboles[5].translateY(-0.6);
  scene.arboles[5].translateX(200);
  scene.arboles[5].translateZ(35);


  function updateAnimaciones() {
    TWEEN.update();
    requestAnimationFrame(updateAnimaciones);
  }

  function colisionCoches(){
    for (var i = 0; i < scene.coches.length; i++) {
      if(interseccionCoches(scene.personaje, scene.coches[i]))    
       GameOver();
    }
    requestAnimationFrame(colisionCoches);
  }
  
  function colisionCamiones(){
    for (var i = 0; i < scene.camiones.length; i++) {
      if(interseccionCamiones(scene.personaje, scene.camiones[i]))
        GameOver(); 
    }
    requestAnimationFrame(colisionCamiones);
  }

  function colisionArboles(){
    for (var i = 0; i < scene.camiones.length; i++) {
      if(interseccionArboles(scene.personaje, scene.arboles[i]))
        GameOver(); 
    }
    requestAnimationFrame(colisionArboles);
  }
    
  function interseccionCoches (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 8);
  }
 
  function interseccionCamiones (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 10);
  }
 
  function interseccionArboles (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 5);
  }

  updateAnimaciones()
  colisionCoches()
  colisionCamiones()
  colisionArboles()

  ComprobarFinal();
  function ComprobarFinal(){
    if(scene.personaje.position.x > 350){
      GameOver1();
    }
    requestAnimationFrame(ComprobarFinal);
  }

  function GameOver(){
    var mensaje = document.getElementById("PantallaGameOver");
    mensaje.style.display = "flex";
    scene.gameover = true;
        scene.getPersonaje().position.x = 0;
        scene.getPersonaje().position.z = 0;

        scene.getCamera().position.x = -70;
        scene.getCamera().position.y = 40;
        scene.getCamera().position.z = 0;
        scene.getCamera().lookAt(scene.personaje.position);
  }

  function GameOver1(){
    var mensaje = document.getElementById("PantallaGameOver1");
    mensaje.style.display = "flex";
    scene.gameover = true;
        scene.getPersonaje().position.x = 0;
        scene.getPersonaje().position.z = 0;

        scene.getCamera().position.x = -70;
        scene.getCamera().position.y = 40;
        scene.getCamera().position.z = 0;
        scene.getCamera().lookAt(scene.personaje.position);         
  }
  
//Evento con el boton
  document.getElementById('boton').addEventListener("click", pulsar, false);

  function pulsar(){
    var mensaje = document.getElementById("PantallaGameOver");
    mensaje.style.display = "none";
    scene.gameover = false;
  }

  document.getElementById('boton1').addEventListener("click", pulsar1, false);

  function pulsar1(){
    var mensaje = document.getElementById("PantallaGameOver1");
    mensaje.style.display = "none";
    scene.gameover = false;

  }

  //boton_creadores
  document.getElementById('boton_creadores').addEventListener("click", pulsar_creadores, false);

  function pulsar_creadores(){
    var mensaje = document.getElementById("PantallaCreadores");
    mensaje.style.display = "none";
    window.addEventListener ("mousemove", (event) => scene.onMouseMove(event), true);
    window.addEventListener ("click", (event) => scene.onMouseClick(event), true);  //Movimiento del pollo  
  }


  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());  
  document.addEventListener("keydown", onDocumentKeyDown, false);

  

  function onDocumentKeyDown(event) {
      var keyCode = event.which;
      // Volver a la posición inicial pulsando la barra espaciadora
      if (keyCode == 32){
        scene.getPersonaje().position.x = 0;
        scene.getPersonaje().position.z = 0;

        scene.getCamera().position.x = -70;
        scene.getCamera().position.y = 40;
        scene.getCamera().position.z = 0;
        scene.getCamera().lookAt(scene.personaje.position);
      }
  };  


  // Que no se nos olvide, la primera visualización.
  scene.update(); 

  var skybox = new THREE.CubeTextureLoader().load([
    "texturas/skybox/right.bmp",
    "texturas/skybox/left.bmp",
    "texturas/skybox/top.bmp",
    "texturas/skybox/bot.bmp",
    "texturas/skybox/back.bmp",
    "texturas/skybox/front.bmp"
  ]);

  scene.background = skybox;
});