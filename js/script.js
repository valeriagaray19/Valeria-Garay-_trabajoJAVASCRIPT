
// Index.html - Cargar noticias desde JSON
function cargarNoticias() {
    fetch('data/noticias.json')
        .then(response => response.json())
        .then(data => {
            const listaNoticias = document.getElementById('lista-noticias');
            data.forEach(noticia => {
                const elementoNoticia = document.createElement('div');
                const enlaceNoticia = document.createElement('a');
                enlaceNoticia.href = noticia.enlace; // Asigna el enlace de la noticia
                enlaceNoticia.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.descripcion}</p>`;
                elementoNoticia.appendChild(enlaceNoticia);
                listaNoticias.appendChild(elementoNoticia);
            });
        })
        .catch(error => console.error('Error al cargar noticias:', error));
}
// Galeria.html - Crear galeria dinámica
function crearGaleria() {
    const galeria = document.getElementById('galeria');
    for (let i = 1; i <= 6; i++) {
        const imagen = document.createElement('img');
        imagen.src = `img/imagen${i}.jpg`; // Asegúrate de tener las imágenes
        imagen.alt = `Imagen ${i}`;
        galeria.appendChild(imagen);
    }
}

// Presupuesto.html - Validar formulario y calcular presupuesto
document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extra1Checkbox = document.getElementById('extra1');
    const extra2Checkbox = document.getElementById('extra2');
    const extra3Checkbox = document.getElementById('extra3');
    const presupuestoP = document.getElementById('presupuesto');
    const condicionesCheckbox = document.getElementById('condiciones');
    const enviarButton = document.getElementById('enviar');
    const resetButton = document.getElementById('reset');

    // Validación de datos de contacto
    function validarContacto() {
        if (!/^[a-zA-Z]+$/.test(nombreInput.value) || nombreInput.value.length > 15) {
            alert('Nombre inválido');
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(apellidosInput.value) || apellidosInput.value.length > 40) {
            alert('Apellidos inválidos');
            return false;
        }
        if (!/^\d+$/.test(telefonoInput.value) || telefonoInput.value.length > 9) {
            alert('Teléfono inválido');
            return false;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
            alert('Email inválido');
            return false;
        }
        return true;
    }

    // Cálculo del presupuesto
    function calcularPresupuesto() {
        let precioBase = parseInt(productoSelect.value);
        let plazo = parseInt(plazoInput.value);
        let descuento = (plazo > 5) ? (precioBase * 0.05) : 0;
        let extras = 0;

        if (extra1Checkbox.checked) extras += parseInt(extra1Checkbox.value);
        if (extra2Checkbox.checked) extras += parseInt(extra2Checkbox.value);
        if (extra3Checkbox.checked) extras += parseInt(extra3Checkbox.value);

        let total = precioBase - descuento + extras;
        presupuestoP.innerText = total;
    }

    // Eventos
    productoSelect.addEventListener('change', calcularPresupuesto);
    plazoInput.addEventListener('input', calcularPresupuesto);
    extra1Checkbox.addEventListener('change', calcularPresupuesto);
    extra2Checkbox.addEventListener('change', calcularPresupuesto);
    extra3Checkbox.addEventListener('change', calcularPresupuesto);

    enviarButton.addEventListener('click', function(event) {
        if (validarContacto() && condicionesCheckbox.checked) {
            // Enviar formulario
            console.log('Formulario enviado');
        } else {
            event.preventDefault();
            alert('Por favor, complete todos los campos correctamente');
        }
    });

    resetButton.addEventListener('click', function() {
        document.getElementById('formulario-presupuesto').reset(); // Restablece el formulario
        presupuestoP.innerText = '0'; // Restablece el presupuesto a 0
    });
    
});
//-----------------------------------------------------------------------------------
// Llama a las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('lista-noticias')) {
        cargarNoticias();
    }
    if (document.getElementById('galeria')) {
        crearGaleria();
    }
    if (document.getElementById('formulario-presupuesto')) {
        validarFormulario();
    }

    $(document).ready(function(){
        $('.slider').slick({
            dots: true,          // Muestra los puntos de navegación
            infinite: true,      // Permite el bucle infinito
            speed: 500,          // Velocidad de transición en milisegundos
            slidesToShow: 1,     // Muestra una imagen a la vez
            slidesToScroll: 1,   // Desplaza una imagen a la vez
            autoplay: true,       // Activa el autoplay
            autoplaySpeed: 3000,  // Intervalo de autoplay en milisegundos (3 segundos)
            arrows: true         // Muestra las flechas de navegación
        });
    });
});

let slides = document.querySelectorAll('.slide');
let index = 0;
let intervalId;

// Función para cambiar a la siguiente imagen
function nextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

// Función para cambiar a la imagen anterior
function prevSlide() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// Inicializa el intervalo para cambiar automáticamente
intervalId = setInterval(nextSlide, 5000);

// Eventos para las flechas
document.querySelector('.next').addEventListener('click', function() {
    clearInterval(intervalId);
    nextSlide();
    intervalId = setInterval(nextSlide, 5000);
});

document.querySelector('.prev').addEventListener('click', function() {
    clearInterval(intervalId);
    prevSlide();
    intervalId = setInterval(nextSlide, 5000);
});

// Arreglo de objetos con las imágenes
const imagenes = [
    { src: 'logo.png', alt: 'Imagen 1' },
    { src: 'imagen2.jpg', alt: 'Imagen 2' },
    { src: 'imagen3.jpg', alt: 'Imagen 3' },
    // Agrega más imágenes aquí...
];

let indiceActual = 0;

// Función para cargar la galería
function cargarGaleria() {
    const visor = document.getElementById('imagenActual');
    const miniaturas = document.querySelector('.miniaturas');
    const btnAnterior = document.getElementById('anterior');
    const btnSiguiente = document.getElementById('siguiente');

    // Cargar imagen actual
    visor.src = imagenes[indiceActual].src;
    visor.alt = imagenes[indiceActual].alt;

    // Generar miniaturas
    miniaturas.innerHTML = '';
    imagenes.forEach((imagen, indice) => {
        const miniatura = document.createElement('div');
        miniatura.classList.add('miniatura');
        if (indice === indiceActual) {
            miniatura.classList.add('seleccionada');
        }
        const imgMiniatura = document.createElement('img');
        imgMiniatura.src = imagen.src;
        imgMiniatura.alt = imagen.alt;
        imgMiniatura.onclick = () => seleccionarImagen(indice);
        miniatura.appendChild(imgMiniatura);
        miniaturas.appendChild(miniatura);
    });

    // Eventos para botones
    btnAnterior.onclick = mostrarAnterior;
    btnSiguiente.onclick = mostrarSiguiente;
}

// Función para mostrar la imagen anterior
function mostrarAnterior() {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    cargarGaleria();
}

// Función para mostrar la imagen siguiente
function mostrarSiguiente() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    cargarGaleria();
}

// Función para seleccionar una imagen desde las miniaturas
function seleccionarImagen(indice) {
    indiceActual = indice;
    cargarGaleria();
}

// Inicializar la galería
cargarGaleria();
// Validar formulario de suscripcion
function subscribe() {
    const emailInput = document.getElementById("email");
    const message = document.getElementById("message");

    if (emailInput.value.includes("@") && emailInput.value.includes(".")) {
        message.style.color = "lightgreen";
        message.textContent = "✅ ¡Gracias por suscribirte!";
        emailInput.value = "";
    } else {
        message.style.color = "red";
        message.textContent = "❌ Ingresa un correo válido.";
    }
}

// Script de mapa

window.onload = function () {
    iniciarMap();
};

function iniciarMap() {
    var coord = { lat: -25.50972, lng: -54.61111 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coord
    });

    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Evento del botón para calcular la ruta
    document.getElementById('rutaBtn').addEventListener('click', function () {
        obtenerUbicacionUsuario(directionsService, directionsRenderer, coord);
    });
}

function obtenerUbicacionUsuario(directionsService, directionsRenderer, destino) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                calculateAndDisplayRoute(directionsService, directionsRenderer, userLocation, destino);
            },
            function (error) {
                let mensaje = "";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        mensaje = "Permiso denegado para acceder a la ubicación.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensaje = "Ubicación no disponible.";
                        break;
                    case error.TIMEOUT:
                        mensaje = "Tiempo de espera agotado.";
                        break;
                    default:
                        mensaje = "Error desconocido.";
                }
                alert(mensaje);
            }
        );
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination) {
    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert("No se pudo calcular la ruta: " + status);
            }
        }
    );
}


