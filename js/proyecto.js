'use strict';
//1. Aplicacion que evalua el promedio de alumnos

const app = $('.app');

$(document).ready(function(){
	if(localStorage.getItem('luz') !== null){
		$('.switch').click();
	}
})


window.addEventListener('hashchange',()=>{
	if(location.hash === "#/pages/materias.html"){
		//1.1 ESTA ES LA SECCION EN LA QUE SE MUESTRA LA LISTA DE MATERIAS DE LA ESCUELA
			app.html(`
			<div class="h1container">
				<h1 class='materiasH1 ${lightOnOff()}'>MATERIAS REGISTRADAS EN LA ESCUELA</h1>
			</div>
			<!-- CARDS DE LAS MATERIAS -->
			<div class="row row-cols-1 row-cols-md-3 g-4 materiasContainer" id='cardsContainer'></div>`);
		
		//EN ESTE JSON SE ENCUENTRA INFORMACION SOBRE LAS MATERIAS (Nombre,foto,alt) PARA RELLENAR LAS CARDS
		const URLGET = "../data/materias.json";
		//IMPRIMIMOS LAS CARDS QUE NOS MOSTRARAN LAS MATERIAS DE LA ESCUELA.
		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
					let misDatos = respuesta;
					for (const dato of misDatos) {
							$(".materiasContainer").prepend(`<div class="col">
							<div class="card ${lightOnOff()} h-100" onclick='subjectInfo("${dato.materia}","${dato.descripcion}","${dato.profesor}","${dato.horario}", "${dato.imagen}","${dato.alt}")'>
								<img src="${dato.imagen}" class="card-img-top" alt="${dato.alt}">
								<div class="card-body">
									<h5 class="card-title">${dato.materia}</h5>
								</div>
							</div>
						</div>`);
					}  
				}
			});
		});

	}else if(location.hash === "#/pages/profesores.html"){
		//1.2 EN ESTA SECCION SE MUESTRAN LOS PROFESORES DE LA ESCUELA
			app.html(`<div class="h1container">
						<h1 class='materiasH1 ${lightOnOff()}'>CONÓCE A LOS PROFESORES</h1>
					  </div>
					  <div class="row row-cols-1 row-cols-md-3 g-4 profesoresContainer" id='cardsContainer'></div>`)
		//AQUÍ ENCONTRAMOS INFORMACION PARA RELLENAR LAS CARDS DE LOS PROFESORES
		const URLGET = "../data/profesores.json";
		//IMPRIMIMOS LA INFORMACION EN FORMATO DE CARD
		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
				let misDatos = respuesta;
				for (const dato of misDatos) {
					
						$(".profesoresContainer").prepend(`
						<div class="col">
							  <div class="card ${lightOnOff()} h-100" onclick='teachersInfo("${dato.nombre}","${dato.materia}","${dato.horario}","${dato.fotoUrl}","${dato.edad}","${dato.contact}")'>
								<img src="${dato.fotoUrl}" class="card-img-top" alt="Foto de Profesor de Escuela">
								<div class="card-body">
									  <h5 class="card-title">${dato.nombre}</h5>
									  <p class="card-text">${dato.materia}</p>
								   </div>
								<div class="card-footer">
									  <small class="text-muted">${dato.uptade}</small>
								</div>
							  </div>
							</div>
						`);
							  }  
						  }
					  });
				  });
	}else if(location.hash === "#/pages/info.html"){
		//ACA MOSTRAMOS LA INFO DE CURSADA
		let imagenPersonal = "../multimedia/fotoPersonal.jpg";
		app.html(`<div class="h1container">
					<h1 class='materiasH1 ${lightOnOff()}'>Datos Personales</h1>
	  			  </div>
					<div class='infoContainer'>
					<img class="infoImagen" src="${imagenPersonal}" alt="Alumna">
					<h2>Ludmila Landry</h2>
					<p class="infoContainerparagraph ${lightOnOff()}"><strong>Carrera:</strong> Diseño Multimedia</p>
					<p class="infoContainerparagraph ${lightOnOff()}"><strong>Comisión:</strong> M2035</p>
					<p class="infoContainerparagraph ${lightOnOff()}"><strong>Materia:</strong> Diseño y Programación Web I</p>
					<p class="infoContainerparagraph ${lightOnOff()}"><strong>Turno:</strong> Noche</p>

				  </div>`)
	}
})


if($('.upsPic').hasClass('light')){
        
}
//Lista que usaremos para almacenar a los alumnos
let listaAlumnos = [];

//PAGINA 'ALUMNOS' (MAIN PAGE)
let upsPicLightMode = "./multimedia/disconnected.png";
let upsPicDarkMode = "./multimedia/disconnected-dark.png";
let upsPicUrl = $('body').hasClass('light') ? upsPicLightMode : upsPicDarkMode;

// 1.3. IMPRIMIMOS LO QUE TENEMOS GUARDADO EN EL LOCALSTORAGE (OBJETIVO: IMPRIMIR EL REGISTRO DE ALUMNOS EN PANTALLA)
if (localStorage.getItem("listaAlumnos") === null){
	//SI NO HAY NADA GUARDADO, CARGAMOS USUARIOS POR DEFECTO PARA QUE POR LO MENOS SE VEA ALGO EN PANTALLA.
	$('.registroAlumnos').append(`<div>
												<div class='ups'>
													<img src="${upsPicUrl}" class="upsPic" alt='Foto de Error que señala que no se han registrado entradas aún'/>
													<p class='errorMsg'>¡Oops! No se encuentran alumnos registrados aún.</p>						
												</div>
											</div>`);
}else{
	//SI EL LOCALSTORAGE TIENE KEYS (ALUMNOS) GUARDADAS, LAS MOSTRAMOS EN PANTALLA
		let student = localStorage.getItem('listaAlumnos');
		let alumnoParse = JSON.parse(student)
		for (let alumno of alumnoParse){
			if (alumno.promedioFinal >= 7){
				$('.registroAlumnos').append(`<div>
												<div class='main'>
													<p class='previewUser'>${alumno.nombre} ${alumno.apellido}</p>
													<p class='previewResult'>aprobo con un promedio de ${alumno.promedioFinal}</p>
												</div><br>
											</div>`);
			}else{
				$('.registroAlumnos').append(`<div>
												<div class='main'>
													<p class='previewUser'>${alumno.nombre} ${alumno.apellido}</p>
													<p class='previewResult'>desaprobo con un promedio de ${alumno.promedioFinal}</p>
												</div><br>
											</div>`);
			}
		}
	
}

