"use strict";

//Descripción: Gestión de carruseles, scroll dinámico y carga de contenido en modales.

document.addEventListener('DOMContentLoaded', function() {

    //  1. GESTIÓN DEL SCROLL (Ocultar botón desliza-central)
    const deslizaCentral = document.querySelector('.desliza-central');
    
    if (deslizaCentral) {
        window.addEventListener('scroll', function() {
            const scrollThreshold = 100; 
            if (window.scrollY > scrollThreshold) {
                deslizaCentral.classList.add('hide-on-scroll');
            } else {
                deslizaCentral.classList.remove('hide-on-scroll');
            }
        });
    }

    //  2. CARGA DINÁMICA DE CONTENIDO EN EL MODAL (FETCH)
    const dynamicModal = document.getElementById('dynamicModal');

    if (dynamicModal) {
        //  Evento al abrir el modal
        dynamicModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget; 
            const contentURL = button.getAttribute('data-modal-url');
            const modalBody = dynamicModal.querySelector('#dynamicModalBody');
            const modalTitle = dynamicModal.querySelector('#dynamicModalLabel');
            
            //  Estado de carga inicial
            modalBody.innerHTML = '<p class="text-center p-5">Cargando galería...</p>';
            modalTitle.textContent = 'Cargando Proyecto...';

            //  Petición AJAX para traer el HTML del proyecto
            fetch(contentURL)
                .then(response => {
                    if (!response.ok) throw new Error('Error en la carga');
                    return response.text();
                })
                .then(htmlContent => {
                    modalBody.innerHTML = htmlContent;
                    
                    const newCarousel = modalBody.querySelector('.carousel');
                    if (newCarousel) {
                        //  REVISIÓN INTELIGENTE:
                        //  Buscamos si hay un iframe o un video dentro del contenido cargado
                        const tieneVideo = newCarousel.querySelector('iframe, video');
                        
                        new bootstrap.Carousel(newCarousel, {
                            //  Si tiene video, interval es false. Si no tiene, es 1500.
                            interval: tieneVideo ? false : 1500,
                            ride: tieneVideo ? false : 'carousel'
                        });
                    }

                    const cardTitle = button.querySelector('.card-text.fw-bold');
                    if (cardTitle) {
                        modalTitle.textContent = cardTitle.textContent;
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                    modalBody.innerHTML = '<p class="text-center text-danger p-5">Error al cargar el proyecto.</p>';
                    modalTitle.textContent = 'Error';
                });
        });

        //  3. APAGAR VIDEO DE YOUTUBE AL CERRAR (Versión Dinámica)
        dynamicModal.addEventListener('hidden.bs.modal', function () {
            //  Buscamos cualquier iframe (YouTube) que se haya cargado
            const iframe = dynamicModal.querySelector('iframe');
            if (iframe) {
                const actualSrc = iframe.src;
                iframe.src = ''; 
                iframe.src = actualSrc; // Al resetear el link, el video se detiene
            }
        });
    }

    //  4. INICIALIZACIÓN DE CARRUSELES ESTÁTICOS (Si existieran fuera del modal)
    const staticCarousel = document.getElementById('carouselMV');
    if (staticCarousel) {
        new bootstrap.Carousel(staticCarousel, {
            interval: false,
            ride: false
        });
    }

     //  5. AÑO DEL COPYRIGHT 
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        //  Definimos la fecha actual antes de usarla
        const anioActual = new Date().getFullYear();
        yearSpan.textContent = anioActual;
    }

    //  2. LOGICA DE WHATSAPP UNIFICADA (Para ID y para Icono Flotante)
    const botonesWA = document.querySelectorAll('.btn-whatsapp-universal');
    
    botonesWA.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el '#' recargue la página
            const telefono = "5493492301503";
            const texto = "Hola Nadia! Vi tu web de Estudio RA y me gustaría realizar una consulta sobre un proyecto.";
            
            const url = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(texto);
            window.location.href = url; 
        });
    });
});