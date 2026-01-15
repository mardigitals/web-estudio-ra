"use strict";

document.addEventListener('DOMContentLoaded', function() {
    
    //  1. GESTIÓN DEL SCROLL (Ocultar botón desliza-central)
    const deslizaCentral = document.querySelector('.desliza-central');

    if (deslizaCentral) {
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100; 

            if (scrollPosition > scrollThreshold) {
                deslizaCentral.classList.add('hide-on-scroll');
            } else {
                deslizaCentral.classList.remove('hide-on-scroll');
            }
        }
        window.addEventListener('scroll', handleScroll);
    }

    //  2. AÑO DEL COPYRIGHT 
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