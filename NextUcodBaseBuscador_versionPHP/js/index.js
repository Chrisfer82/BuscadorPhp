/*
* Una vez que la pagina se cargue llamamos a las funciones
* */
$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(document).height() - $(window).height()) {
            cargarMasComentarios();
        }
    }).scroll();
    $(".cargar-mas").click(function () {
        cargarMasComentarios();
    });
    cargarCiudad();
});

/*
*funcion ajax para cargar datos
* */

function cargarDatos() {
    var datos = $("#formulario").serializeArray();
    $.ajax({
        type: "POST",
        url: "./buscador.php?function=getDataFilter",
        data: datos,
        dataType: "json",
        beforeSend: function (objeto, data) {
        },
        success: function (response) {
            $(".comentarios").html('');
            insertarComentarios(response.data);
        }
    });
}

/*
*funcion ajax para cargar datos
* */

function cargarCiudad() {
    var datos = {function: 'getCity'};
    $.ajax({
        type: "POST",
        url: "./buscador.php",
        data: datos,
        dataType: "json",
        beforeSend: function (objeto, data) {
        },
        success: function (response) {
            if (response.success) {
                $('#selectCity').html("<option value='' selected > Todas </option>");
                $.each(response.data, function (indice, elemento) {
                    $("#selectCity").append("<option value='" + indice + "'> " + elemento + " </option>");
                });
                cargarDatos();
            }
        }
    });
}

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};

/*
  Función que inicializa el elemento Slider
*/
function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 18952,
        to: 21576,
        prefix: "$",
    });
}


//Funcion que llama a todos los datos de l archivo JSON
function insertarComentarios($comentarios) {
    $.each($comentarios, function (indice, elemento) {
        var insertar = "<img src='img/home.jpg' width='325' height='150'/><div class='comentario'>"+
            "<div class='id'> <b>ID :</b> " + elemento.Id + "</div>" +
            "<div class='direccion'><b>Direccion :</b> " + elemento.Direccion + "</div>" +
            "<div class='ciudad'><b>Ciudad :</b> " + elemento.Ciudad + "</div>" +
            "<div class='telefono'><b>Telefono :</b> " + elemento.Telefono + "</div>" +
            "<div class='codigo'><b>Postal :</b> " + elemento.Codigo_Postal + "</div>" +
            "<div class='tipo'><b>Tipo de casa :</b> " + elemento.Tipo + "</div>" +
            "<div class='precio'><b>Precio :</b> $" + elemento.Precio + "<p></p>-------------------------------------------------------------------------------<br></div>" +
            "</div>" +

            "<div class='divider'></div>";
        $(".comentarios").append(insertar);
        console.log($comentarios)

    });
}

function cargarMasComentarios() {
    fetch("./data-1.json")
        .then(function (respuesta) {
            respuesta.json().then(function (datos) {
                insertarComentarios(datos);
            });
        });
}


/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            if (scrollActual > ultimoScroll) {
                //video.play();
            } else {
                //this.rewind(1.0, video, intervalRewind);
                //video.play();
            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            //video.pause();
        }, 10)
}

inicializarSlider();
playVideoOnScroll();
