import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import TWEEN from '@tweenjs/tween.js';


// Variável de controle de rotação
let rotating = true;
let rotateDirection = 1;

// Calcula e define o tamanho da cena dinamicamente
const container = document.getElementById('containerBMW');
const parentWidth = container.offsetWidth;
const parentHeight = container.offsetHeight;

// Configuração da cena
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x020617 );
const camera = new THREE.PerspectiveCamera(30, parentWidth / parentHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(parentWidth, 500);
document.getElementById('containerBMW').appendChild(renderer.domElement);

camera.position.set(1, 0, 5);
camera.layers.enableAll();

// Luz Ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Luz Direcional
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 3, 3);
scene.add(directionalLight);

// Luz Spot
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-2, 2, -2);
spotLight.target.position.set(0, 0, 0); // Defina o alvo da luz spot
scene.add(spotLight);
scene.add(spotLight.target);


// Array de anotações
const annotations = [
    {
        position: new THREE.Vector3(0, 1, 1.2),
        content: '1',
        lookAt: new THREE.Vector3(-2, 2, 3),
        value: 'Cilindrada:	 320,6 cc',
        id: 'cilindrada',
        icon: 'fas fa-chart-bar',
        title: 'Motor',
    },
    {
        position: new THREE.Vector3(1, 1, -2),
        content: '2',
        lookAt: new THREE.Vector3(3, 2, 1),
        value: '3,02 kgfm @ 9.000 rpm',
        id: 'torque',
        icon: 'fa-solid fa-bolt',
        title: 'Torque',
    },
    {
        position: new THREE.Vector3(-0.8, 0.8, 1.8),
        content: '3',
        lookAt: new THREE.Vector3(1.5, 3, -2),
        value: '42,01 cv @ 10.750 rpm',
        id: 'potencia',
        icon: 'fa-solid fa-bolt',
        title: 'Potência',
    },
];

// Função para adicionar os labels ao modelo carregado
function addLabelsToModel(model) {
    annotations.forEach((annotation) => {
        const button = document.createElement('button');
        button.textContent = annotation.content;
        button.style.width = '1.5rem';
        button.style.height = '1.5rem';
        button.classList.add('annotation-btn');

        const css2DObject = new CSS2DObject(button);
        css2DObject.position.copy(annotation.position);
        
        // Adiciona o CSS2DObject como filho do modelo
        model.add(css2DObject);

        button.addEventListener('click', () => {
            moveToAnnotation(annotation);
        });
    });
}

// Função para mover a câmera para a anotação correspondente
function moveToAnnotation(annotation) {
    new TWEEN.Tween(camera.position)
        .to(annotation.position, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(camera.lookAt)
        .to(annotation.lookAt, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
}

// Carrega o GLTF
const loader = new GLTFLoader();
loader.load('./assets/models/bmw_m4_f82.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, -0.8, 0); // Move o modelo 1 unidade para baixo
    scene.add(model);

    // Adicionar os labels ao modelo carregado
    addLabelsToModel(model);

    // Inicia a rotação do modelo
    function rotateModel() {
        if (rotating) {
            model.rotation.y += 0.005 * rotateDirection; // Ajusta a velocidade de rotação
        }
        requestAnimationFrame(rotateModel);
    }
    rotateModel();

    // Evento para pausar rotação do modelo
    const pauseRotate = document.getElementById('pauseRotate');
    pauseRotate.addEventListener('click', () => {
        // Verifica se o ícone está pausado ou não
        if (rotating) {
            pauseRotate.innerHTML = '<i class="bi bi-play-circle fs-4"></i>'; // Altera para o novo ícone
        } else {
            pauseRotate.innerHTML = '<i class="bi bi-pause-circle fs-4"></i>'; // Altera para o ícone original
        }

        rotating = !rotating; // Inverte o estado do ícone
    });
    
    // Evento para pausar rotação do modelo
    const changeRotate = document.getElementById('changeRotate');
    changeRotate.addEventListener('click', () => {
        // Verifica se o ícone está pausado ou não
        if (rotateDirection === 1) {
            changeRotate.innerHTML = '<i class="bi bi-arrow-clockwise fs-4"></i>';
        } else {
            changeRotate.innerHTML = '<i class="bi bi-arrow-counterclockwise fs-4"></i>';
        }

        rotateDirection *= -1; // Inverte a direção da rotação
    });
});

const css2DRenderer = new CSS2DRenderer();
css2DRenderer.setSize(parentWidth, parentHeight);
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.top = '0';
container.appendChild(css2DRenderer.domElement);

// Controle de Orbita
const controls = new OrbitControls(camera, css2DRenderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = -10;
controls.maxDistance = 15;
controls.target.set( 0, 0, 0 );


// Ao clicar no elemento câmera a posição atual do modelo é salvo como imagem
const downloadBtn = document.getElementById('downloadImage');
downloadBtn.addEventListener('click', () => {
    // Cria um renderizador off-screen
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    // Captura a imagem renderizada
    const dataUrl = renderer.domElement.toDataURL('image/png');

    // Cria um link de download para a imagem
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'modelo.png';
    document.body.appendChild(downloadLink);
    
    // Simula o clique no link para iniciar o download
    downloadLink.click();

    // Remove o link após o download
    document.body.removeChild(downloadLink);

    // Limpa o renderizador
    renderer.dispose();
});


// Render loop
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
    css2DRenderer.render(scene, camera);
}
animate();

export { scene, ambientLight };