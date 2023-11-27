function mostrarInfo() {
  var texto1 = document.getElementById("texto1").value;
  var texto2 = document.getElementById("texto2").value;
  var texto3 = document.getElementById("texto3").value;
  var texto4 = document.getElementById("texto4").value;
  var texto5 = document.getElementById("texto5").value;
  var texto6 = document.getElementById("texto6").value;
  var texto7 = document.getElementById("texto7").value;
  var texto8 = document.getElementById("texto8").value;
  var texto9 = document.getElementById("texto9").value;
  var texto10 = document.getElementById("texto10").value;

  var imagenes = document.querySelectorAll('input[type="file"]');
  var imagenesCargadas = [];

  var contador = 0;

  imagenes.forEach(function (imagenInput) {
    var imagen = imagenInput.files[0];
    if (imagen) {
      var reader = new FileReader();
      reader.onload = function (e) {
        imagenesCargadas.push(e.target.result);
        contador++;
        if (contador === imagenes.length) {
          mostrarVentana(texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10, imagenesCargadas);
        }
      };
      reader.readAsDataURL(imagen);
    } else {
      contador++;
      if (contador === imagenes.length) {
        mostrarVentana(texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10, imagenesCargadas);
      }
    }
  });
}

function mostrarVentana(texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10, imagenesCargadas) {
  var nuevaVentana = window.open('', '', 'width=800,height=1080');
  nuevaVentana.document.write('<!DOCTYPE html>');
  nuevaVentana.document.write('<html>');
  nuevaVentana.document.write('<head>');
  nuevaVentana.document.write('<title>Información Ingresada</title>');
  nuevaVentana.document.write('<link rel="stylesheet" type="text/css" href="../fichas.css">');
  nuevaVentana.document.write('</head>');
  nuevaVentana.document.write('<body>');

  nuevaVentana.document.write('<div id="title-container">INMUEBLE PARTICULAR</div>');
  nuevaVentana.document.write('<div id="container">');
  nuevaVentana.document.write('<div class="first-image-container">');
  // Mostrar la primera imagen junto con el texto
  if (imagenesCargadas.length > 0 && imagenesCargadas[0].startsWith('data:image')) {
    nuevaVentana.document.write('<img src="' + imagenesCargadas[0] + '">');
  }
  nuevaVentana.document.write('<div>');
  nuevaVentana.document.write('<p><span class="info-label">Habitaciones:</span> ' + texto1 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Baños:</span> ' + texto2 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Estacionamientos:</span> ' + texto3 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Niveles construidos:</span> ' + texto4 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">m^2 de construcción:</span> ' + texto5 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Antiguedad:</span> ' + texto6 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Uso de suelo:</span> ' + texto7 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Jardin:</span> ' + texto8 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Cuarto de lavado:</span> ' + texto9 + '</p>');
  nuevaVentana.document.write('<p><span class="info-label">Dirección:</span> ' + texto10 + '</p>');
  
  nuevaVentana.document.write('</div>');
  nuevaVentana.document.write('</div>');

  nuevaVentana.document.write('<h2>Vistas adicionales:</h2>');

  // Mostrar imágenes restantes en una cuadrícula de 3 columnas y 2 filas
  nuevaVentana.document.write('<div class="image-grid">');
  for (var i = 1; i < imagenesCargadas.length; i++) {
    if (imagenesCargadas[i].startsWith('data:image')) {
      nuevaVentana.document.write('<img src="' + imagenesCargadas[i] + '">');
    }
  }
  nuevaVentana.document.write('</div>');

  nuevaVentana.document.write('<button id="exportPDF">Exportar a PDF</button>');
  nuevaVentana.document.write('</div>');

  nuevaVentana.document.write('</body>');
  nuevaVentana.document.write('</html>');
  
  // Manejar la exportación a PDF cuando se hace clic en el botón
  nuevaVentana.document.getElementById('exportPDF').addEventListener('click', exportarAPDF);

  // Función para exportar el contenido a PDF
  function exportarAPDF() {
    var opt = {
      margin:       0,
      filename:     'documento.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } // Cambio a orientación horizontal
  };

    // Obtener el contenido HTML de la ventana emergente
    var contenidoHTML = nuevaVentana.document.documentElement.innerHTML;

    // Usar html2pdf para generar el PDF
    html2pdf().from(contenidoHTML).set(opt).save();
  }
}
