"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const anioActual = new Date().getFullYear();

    //  1. Actualización de Fechas Automáticas
    const elementosAnios = document.querySelectorAll('.anios-experiencia');
    elementosAnios.forEach(el => {
        el.textContent = anioActual - 2014;
    });

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = anioActual;
    }

    //  2. Animación de entrada para las secciones de "Nosotros"
    //  Esto hará que las fotos y textos aparezcan suavemente
    const appearElements = document.querySelectorAll(".container-appear, section");
    
    if (appearElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        appearElements.forEach(el => {
            //  Estado inicial por JS para asegurar accesibilidad
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s ease-out";
            observer.observe(el);
        });
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