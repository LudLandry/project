//4.FUNCIONES  
        //4.1 Calcula el promedio de las notas del alumno en todas las materias
function Promedio(nota){
    let cantidad = materias.length;
    return nota / cantidad;
}
     //4.2 Funcion que verifica si el modo dia esta encendido.
function lightOnOff(){
    if($('body').hasClass('light')){
        return 'light'
    }
}
         //4.3 Funcion que crea el modal con el form para registrar a un alumno en la pagina 'alumnos'
function Modal(){
    $('body').prepend(`<div class="modalContainer">
                           <div class='modal ${lightOnOff()}'>
                               <form>
                                    <p class='tituloModal'>INGRESE LOS SIGUIENTES DATOS</p>
                                    <div class = 'datos'>
                                        <input placeholder='Nombre del Alumno' class='datosAlumno' type="text" id="fname" name="fname" required><br>
                                        <input placeholder='Apellido del Alumno' class='datosAlumno' type="text" id="lname" name="lname" required><br>
                                        <input placeholder='Edad del Alumno' class='datosAlumno' type="text" id="age" name="age" required><br>
                                    </div>
                                    <p class='tituloModal'>CALIFICACION DEL ALUMNO</p>
                                    <div class='grupoDeMaterias'>
                                        <div class='materiasGrupo1'>
                                            <label class='materia' for="matematica">Calificacion en Matematica:</label>
                                            <input type="number" class='${lightOnOff()}' id="matematica" name="matematica"
                                            min="1" max="10"><br>
                                            <label class='materia' for="biologia">Calificación en Biología:</label>
                                            <input type="number" class='${lightOnOff()}' id="biologia" name="biologia"
                                             min="1" max="10">
                                        </div>
                                        <div class='materiasGrupo2'>
                                            <label class='materia' for="quimica">Calificación en Quimica:</label>
                                            <input type="number" class='${lightOnOff()}' id="quimica" name="quimica"
                                            min="1" max="10"><br>
                                            <label class='materia' for="fisica">Calificación en Física:</label>
                                            <input type="number" class='${lightOnOff()}' id="fisica" name="fisica"
                                            min="1" max="10">
                                        </div>
                                        <div class='materiasGrupo3'>
                                            <label class='materia' for="historia">Calificación en Historia:</label>
                                            <input type="number" class='${lightOnOff()}' id="historia" name="historia"
                                            min="1" max="10"><br>
                                            <label class='materia' for="geografia">Calificación en Geografía:</label>
                                            <input type="number" class='${lightOnOff()}' id="geografia" name="geografia"
                                            min="1" max="10">
                                        </div>
                                    </div>
                                    <div class='modalBtnGroup'>
                                        <button type="button" onclick='almacenarValores()' class='saveBtn'>CALCULAR PROMEDIO</button>
                                        <button type="button"  onclick='deleteModal()' class='quitBtn'>CANCELAR</button>
                                    </div>
                                </form>
                            </div>
                         </div>`);
            
}
        // 4.4 Función que elimina el modal
        
function deleteModal(){
     $('.modalContainer').remove();
}
        //4.5 Funcion que almacena los valores de los inputs, y agrega una vista previa de los resultados del alumno a la pagina principal.
 
const almacenarValores = () =>{
    filledInput = 0; //se resetea el valor de filledInput
    //se suma la cantidad de inputs rellenados
    $('#fname, #lname, #age, #matematica, #historia, #geografia, #fisica, #quimica, #biologia').each(function() {
        if ($(this).val() != '') {
            filledInput++;
        }
    });
    //si todos los inputs fueron llenados, le da funcionalidad al botón 
    if (filledInput >= 9){
     // Sumamos todas las calificaciones (NOTAS) y dividimos esa suma por la cantidad  de materias.
        let nota = parseInt($('#matematica').val()) + parseInt($('#biologia').val()) + parseInt($('#quimica').val()) + parseInt($('#historia').val()) + parseInt($('#fisica').val()) + parseInt($('#geografia').val());
        notaFinal += nota;
        let promedioFinal = parseInt(Promedio(notaFinal));
        // Comparacion para saber si el alumno aprobó o desaprobó. Se mostrara el resultado en un bloque de codigo en la pagina principal.
        if (promedioFinal >= 7){
            $('.registroAlumnos').append(`<div>
                                            <div class='main'>
                                                <p class='previewUser'>${$('#fname').val()} ${$('#lname').val()}</p>
                                                <p class='previewResult'>aprobo con un promedio de ${promedioFinal}</p>
                                            </div><br>
                                          </div>`);
        }else{
            $('.registroAlumnos').append(`<div>
                                            <div class='main'>
                                                <p class='previewUser'>${$('#fname').val()} ${$('#lname').val()}</p>
                                                <p class='previewResult'>desaprobo con un promedio de ${promedioFinal}</p>
                                            </div><br>
                                          </div>`);
        }
            
        // Crea un objeto alumno con los datos entregados por el usuario
        const alumno1 = new Alumno($('#fname').val(),$('#lname').val(),$('#age').val(),promedioFinal);
            
        // Agrega el alumno al Storage, para poder ver el registro cuando recargues la página.
        //Si en LocalStorage hay algo guardado, entonces actualizamos la lista con el nuevo alumno
        if (localStorage.getItem("listaAlumnos") !== null){
            const oldInfo = JSON.parse(localStorage.getItem('listaAlumnos'));
            oldInfo.push(alumno1);
            localStorage.setItem(`listaAlumnos`, JSON.stringify(oldInfo));
        }else{
        //Si no hay nada guardado, almacenamos la lista en localStorage por primera vez
            listaAlumnos.push(alumno1);
            localStorage.setItem(`listaAlumnos`, JSON.stringify(listaAlumnos));
        }
        //Por ultimo, el modal se elimina, para poder volver a la pagina principal y ver los resultados.
        deleteModal();
        $('.ups').remove();
        notaFinal = 0;
    }
}
        //4.6 Función que le da funcionalidad al boton 'Eliminar registro'.
const addDeleteClass = ()=>{
    if($('.main').length){
        if(!$('.main').hasClass('selectedCard')){
            $('header').hide();
            $('.main').addClass('selectedCard');
            $('.main').append(`<button type="button" class="deleteStudent">Eliminar</button>`)
            $('.Eliminar-Button').text('Cancelar');
            $('.deleteStudent').on('click',function(e){
                let deleteStudentParent = $(e.target).parent();
                let card = deleteStudentParent.parent();
                card.remove();
                let nombreCompleto = $(e.target).siblings('.previewUser').text();
                let primerNombre = nombreCompleto.split(' ')[0];
                let alumnosLocalStorage = localStorage.getItem('listaAlumnos');
                let alumnos = JSON.parse(alumnosLocalStorage)
                for (let alumno of alumnos){
                    if(alumno.nombre == primerNombre){
                        const index = alumnos.indexOf(alumno);
                        alumnos.splice(index, 1);
                        localStorage.setItem('listaAlumnos',JSON.stringify(alumnos));
                        let local = JSON.parse(localStorage.getItem('listaAlumnos'));
                        if (local.length == 0){
                            localStorage.removeItem('listaAlumnos')
                        }
                        break		
                    }
                }
            })
        }else{
            if($('.main').length){
                $('.main').removeClass('selectedCard');
            }
            $('.deleteStudent').remove();
            $('.Eliminar-Button').text('Eliminar registro')
            $('header').show();

        }
    }else{
        $('.Eliminar-Button').text('Eliminar registro')
        $('header').show();
        //Arregla un bug que generaba la imagen de ups por cada vez que se clickeaba eliminar registro.
        if ($('.ups').length <= 0) {
            let upsPicLightMode = "multimedia/disconnected.png";
            let upsPicDarkMode = "multimedia/disconnected-dark.png";
            $('.registroAlumnos').append(`<div>
                                            <div class='ups'>
                                                <img src="${$('body').hasClass('light') ? upsPicLightMode : upsPicDarkMode}" class="upsPic"/>
                                                <p class='errorMsg'>¡Oops! No se encuentran alumnos registrados aún.</p>						
                                            </div>
                                        </div>`);
        }     
    } 
       
}
        //4.7 Funcion que crea la pagina de las Materias dinamicamente.

        const subjectInfo = (nombre, descripcion, profesor, horario, imagen, altImagen)=>{
            
                //cambia el hash con el nombre de la materia
                var hash = `#nombre=${encodeURIComponent(nombre)}&descripcion=${encodeURIComponent(descripcion)}`;
                window.location.hash = hash;
                //llevamos el scroll de la pagina arriba de todo
                window.scrollTo(0, 0);
                //crea el contenido dinamico de la pagina dependiendo de la card clicekada
                $('.app').empty();
                $('.app').append(`<div class="h1container">
				                    <h1 class='materiasH1 ${lightOnOff()}'>${nombre}</h1>
			                      </div>
                                  <div class='infoContainer'>
                                    <img class="infoImagen" src="${imagen}" alt="${altImagen}">
                                    <h2>${descripcion}</h2>
                                    <p class="infoContainerparagraph ${lightOnOff()}"><strong>Profesor:</strong> ${profesor}</p>
                                    <p class="infoContainerparagraph ${lightOnOff()}"><strong>Horarios:</strong> ${horario}</p>
                                  </div>
                                `);
        }

         //4.8 Funcion que crea la pagina de los profesores dinamicamente.

         const teachersInfo = (nombre, materia, horario, imagen, edad, contacto)=>{
            
            //cambia el hash con el nombre de la materia
            var hash = `#nombre=${encodeURIComponent(nombre)}&descripcion=${encodeURIComponent(materia)}`;
            window.location.hash = hash;
            //llevamos el scroll de la pagina arriba de todo
            window.scrollTo(0, 0);
            //crea el contenido dinamico de la pagina dependiendo de la card clicekada
            $('.app').empty();
            $('.app').append(`<div class="h1container">
                                <h1 class='materiasH1 ${lightOnOff()}'>${materia}</h1>
                              </div>
                              <div class='infoContainer'>
                                <img class="infoImagen" src="${imagen}" alt="Profesor de la Escuela">
                                <h2>${nombre}</h2>
                                <p class="infoContainerparagraph ${lightOnOff()}"><strong>Edad:</strong> ${edad}</p>
                                <p class="infoContainerparagraph ${lightOnOff()}"><strong>Horarios:</strong> ${horario}</p>
                                <p class="infoContainerparagraph ${lightOnOff()}"><strong>Contacto:</strong> ${contacto}</p>

                              </div>
                            `);
    }