
	/* DATOS DE CONEXIÓN CON FIREBASE */
	var config = {
		apiKey: "AIzaSyD1HUyrJ0xJm2_pcp3EgKqVBkA4RRugmIU",
		authDomain: "tonechord-ae558.firebaseapp.com",
		databaseURL: "https://tonechord-ae558.firebaseio.com",
		storageBucket: "tonechord-ae558.appspot.com",
		messagingSenderId: "729431960504"
	  };
	  firebase.initializeApp(config);
	  // Obtengo la referencia con la base de datos de Firebase
	  var database = firebase.database();
  
	/* DECLARO EL OBJETO GLOBAL DEL USUARIO */
	var usuario = {
		uid: null,
		nombre: null,
		correo: null,
		estado: null,
		proveedor: null
	};
  
	/* FUNCIÓN QUE SE CARGA AL INICIO */
	window.onload = function initApp(){	
		// Obtengo el usuario
		getUser();
		// Obtengo los chords
		getChords();
	}
	
	/* FUNCION PARA CREAR UN CHORD NUEVO */
	function nuevoChord(uid){
	
		var newChordKey = firebase.database().ref().child('chords/'+uid).push().key;
	
		var chordData = {
			titulo: 'Tercero chord',
			autor: 'Armando',
			id: newChordKey,
			likes: 0,
			desLikes: 0,
			desLikeForMy: false,
			likeForMy: false,
			publico: true,
			anonimo: false,
			estado: 'Hola soy nuevo en tonechord :)'
		};
		
		var updates = {};
		updates['/chords/' +uid+"/"+ newChordKey] = chordData;
		return firebase.database().ref().update(updates);
	}
	
	/* OBTENGO DATOS DEL USUARIO */
	function getUser(){
		var user = firebase.auth().currentUser;
		if(user!=null){
			// Leo los datos de la base de datos
			var userRef = firebase.database().ref('usuarios/' + user.uid+"/").once('value').then(function(snapshot){
				// Convierto el objecto a un Array
				var usuarioArr = $.map(snapshot.val(), function(value, index) {
					return [value];
				});
				// Seteo los datos al usuario
				usuario.uid = user.uid;
				usuario.nombre = snapshot.val().nombre;
				usuario.correo = snapshot.val().email;
				usuario.estado = snapshot.val().estado;
				usuario.proveedor = snapshot.val().proveedor;
				console.log(snapshot.val().nombre);
				localStorage.setItem("usuario",usuario);
				// Seteo la UI
				setUI(usuario);
				//nuevoChord(user.uid);
			});
		} 
	}
	
	/* OBTENGO LOS DATOS DE LOS CHORDS */
	function getChords(){
		var user = firebase.auth().currentUser;
		if(user!=null){
			// Leo los chords desde firebase
			var chordsRef = firebase.database().ref('chords/' + user.uid).once('value').then(function(snapshot){
				// Convierto los datos de firebase en un array de objetos
				var chordArr = $.map(snapshot.val(), function(value, index) {
				return [value];
				});
				// Recorro el array de objetos
				for (x=0;x<chordArr.length;x++){
					// Variable de html del card para cada chord
					var card = "<div class='card'>"
						+ "<table style='width: 100%;height: 102px;'><tr >"
						+ "<td valign='middle' style='width: 20%;vertical-align: center;'>"
						+ "<img class='imagenChord' src='../img/guitar.jpg'>"
						+ "</td>"
						+ "<td valign='top' style='width: 80%;padding-left:20px;'>"
						+ "<span class='t2'>"+chordArr[x].titulo+"</span>"
						+ "<span class='t3'>"+chordArr[x].autor+"</span>"
						+ "<span class='t4'>"+usuario.nombre+"</span>"
						+ "</td>"
						+ "</tr>"
						+ "</table>"
						+ "</div>";
					var actual = document.getElementById("chordsContent").innerHTML;
					document.getElementById("chordsContent").innerHTML = actual + card;		
				}
			});
		}
	}
	
	/* SETEO LOS DATOS AL UI */
	function setUI(us){
		//var u = localStorage.getItem("usuario");
		if(us.nombre != null){
		// Inicio
		document.getElementById("tituloNombre").innerHTML = us.nombre;
		// Perfil
		document.getElementById('nombreProfile').textContent = us.nombre;
		document.getElementById('estadoProfile').textContent = us.estado;
		document.getElementById('correoProfile').textContent = us.correo;
		console.log("BD: "+us.nombre);
		}
	}
	
	/* FUNCIÓN PARA ABRIR Y CERRAR EL MENU (MOVIL)*/
	function mostrarMenu(){
		$("#menu_div").slideToggle("slow");
	}
	
	/* FUNCIÓN PARA CERRAR SESIÓN */
	function signOut(){
		firebase.auth().signOut().then(function() {
			// Cerro sesión con exito.
			window.location.href = "../index.html";
		}, function(error) {
			// Ocurrio un error.
		});
	}
	