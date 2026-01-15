"use strict";

document.addEventListener("DOMContentLoaded", () => {
    //  1. AÑO DEL COPYRIGHT
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
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
     //  3. GESTIÓN DEL SCROLL (Ocultar botón desliza-central)
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
});