import * as THREE from "./assets/libs/threejs/build/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "./assets/libs/threejs/jsm/renderers/CSS2DRenderer.js"; // Ajuste o caminho conforme necessário

// Cria uma instância de CSS2DRenderer
const rendererCSS = new CSS2DRenderer();
rendererCSS.setSize(window.innerWidth, window.innerHeight);
rendererCSS.domElement.style.position = 'absolute';
rendererCSS.domElement.style.top = '0';
document.body.appendChild(rendererCSS.domElement);

// Função para criar o elemento da anotação
function createAnnotationElement(number) {
    const element = document.createElement('div');
    element.textContent = number;
    element.classList.add('annotation');
    return element;
}

// Cria um CSS2DObject para a anotação
const annotation1 = new CSS2DObject(createAnnotationElement('1'));
annotation1.position.set(0, 0, 0); // Posição da anotação na cena
scene.add(annotation1); // Adiciona a anotação à cena