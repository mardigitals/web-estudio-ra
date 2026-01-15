"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    //  --- 1. Animación de entrada (Intersection Observer) ---
    const appearElements = document.querySelectorAll(".container-appear");
    if (appearElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        appearElements.forEach(el => observer.observe(el));
    }

    //  --- 2. Animación 3D del Carrusel (GSAP) ---
    const carouselEl = document.getElementById("carouselProyectos");
    // Verificamos que exista el carrusel y que GSAP esté cargado
    if (carouselEl && typeof gsap !== "undefined") {
        
        const animarCards = (contenedor) => {
            const cards = contenedor.querySelectorAll(".card");
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { z: -200, scale: 0.8, opacity: 0 },
                    { z: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
                );
            }
        };

        // Animación inicial
        const activeItem = carouselEl.querySelector(".carousel-item.active");
        if (activeItem) animarCards(activeItem);

        //  Animación al cambiar slide
        carouselEl.addEventListener("slide.bs.carousel", (event) => {
            animarCards(event.relatedTarget);
        });
    }

    //  --- 3. Actualización de Fechas Automáticas ---
    const anioActual = new Date().getFullYear();
    
    //  Años de experiencia (Base 2014)
    const elementosAnios = document.querySelectorAll('.anios-experiencia');
    elementosAnios.forEach(el => {
        el.textContent = anioActual - 2014;
    });

    //  4. Año del Copyright en Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = anioActual;
    }

    //  5. LOGICA DE WHATSAPP UNIFICADA (Para ID y para Icono Flotante)
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

//  6. MODAL DINÁMICO PARA PROYECTOS (Reutilizable)
document.addEventListener('DOMContentLoaded', function() {
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

                    const cardTitle = button.querySelector('.card-title.fw-bold');
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
    }
});