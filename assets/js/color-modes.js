import * as THREE from 'three';
import { scene } from './render-model.js'; // Importa a variável scene

(() => {
    "use strict";

    // Função para obter o tema atual do localStorage ou do sistema
    const getTheme = () => localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    // Função para definir o tema no localStorage e no <body>
    const setTheme = (theme) => {
        localStorage.setItem("theme", theme);
        document.body.dataset.bsTheme = theme;
        updateVantaColor(theme);
        updateNavbarClass(theme);
        updateActiveButton(theme);
        updateColorThreeJs(theme);
    };

    // Função para atualizar a cor de fundo do ThreeJs.js com base no tema
    const updateColorThreeJs = (theme) => {
        // const colorThreeJs = theme === "dark" ? 0x020617 : 0xe1e2e4;
        const colorThreeJs = theme === "dark" ? 0x020617 : 0xe1e2e4;
        // Altera o background da cena no modo light
        scene.background = new THREE.Color(colorThreeJs);
    };

    // Função para atualizar a cor do Vanta.js com base no tema
    const updateVantaColor = (theme) => {
        const vantaColor = theme === "dark" ? 0x1a2d : 0xa4a4a4;
        if (window.VANTA && window.VANTA.WAVES) {
            window.VANTA.WAVES({
                el: "#home",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 456,
                minWidth: window.innerWidth,
                scale: 1.00,
                scaleMobile: 1.00,
                color: vantaColor
            });
        }
    };

    // Função para atualizar a classe do navbar com base no tema
    const updateNavbarClass = (theme) => {
        const navbar = document.querySelector("nav.navbar");
        const iconTheme = document.querySelector("i.theme-icon-active");
        if (navbar) {
            if (theme === "dark") {
                navbar.classList.remove("navbar-light");
                navbar.classList.add("navbar-dark");
                iconTheme.classList.remove("bi-sun-fill");
                iconTheme.classList.add("bi-moon-stars-fill");
                iconTheme.parentElement.classList.remove("bg-warning", "border-warning", "text-warning");
                iconTheme.parentElement.classList.add("bg-primary", "border-primary", "text-primary");
            } else {
                navbar.classList.remove("navbar-dark");
                navbar.classList.add("navbar-light");
                iconTheme.classList.remove("bi-moon-stars-fill");
                iconTheme.classList.add("bi-sun-fill");
                iconTheme.parentElement.classList.remove("bg-primary", "border-primary", "text-primary");
                iconTheme.parentElement.classList.add("bg-warning", "border-warning", "text-warning");
            }
        }
    };

    // Função para atualizar o botão ativo com base no tema
    const updateActiveButton = (theme) => {
        document.querySelectorAll("[data-bs-theme-value]").forEach(button => {
            if (button.getAttribute("data-bs-theme-value") === theme) {
                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");
            } else {
                button.classList.remove("active");
                button.setAttribute("aria-pressed", "false");
            }
        });
    };

    // Event listener para alterações no tema preferido do sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (getTheme() === "auto") {
            setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        }
    });

    // Event listener quando o DOM é carregado
    window.addEventListener("DOMContentLoaded", () => {
        // Definir o tema no <body> ao carregar a página
        setTheme(getTheme());

        // Adicionar event listeners aos botões do tema
        document.querySelectorAll("[data-bs-theme-value]").forEach(button => {
            button.addEventListener("click", () => {
                const newTheme = button.getAttribute("data-bs-theme-value");
                setTheme(newTheme);
                $('.offcanvas').offcanvas('hide')
            });
        });
    });
})();
