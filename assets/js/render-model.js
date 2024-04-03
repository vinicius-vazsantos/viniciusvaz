import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import TWEEN from '@tweenjs/tween.js';


// Variáveis de controle
let rotating = true;
let move = true;
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Luz Spot
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 5, 0);
spotLight.intensity = 300;
scene.add(spotLight);

// Luz Spot da camera
const spotLightCamera = new THREE.SpotLight(0xffffff);
spotLightCamera.position.set(0, 0, 0);
spotLightCamera.intensity = 2;
scene.add(spotLightCamera);

// Array de anotações
const annotations = [
    {
        position: new THREE.Vector3(-0.8, 0.8, 1.8),
        lookAt: new THREE.Vector3(-2, 0, 4),
        reference: new THREE.Vector3(0, 0, 0),
        maxDistance: 5,
        content: '1',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Faróis de LED.</strong></p>
                      <p class="card-text mb-0"><strong>Regulagem de altura.</strong></p>`,
            'en': `<p class="card-text mb-0"><strong>LED headlights.</strong></p>
                   <p class="card-text mb-0"><strong>Height adjustment.</strong></p>`,},
        title: {'pt-br': 'Farol Dianteiro', 'en': 'Front Headlight'},
        srcImage: 'assets/images/demo/frontlight.jpg',
    },
    {
        position: new THREE.Vector3(0, 1, 1.2),
        lookAt: new THREE.Vector3(0, 0, 5),
        reference: new THREE.Vector3(0, 0, 0),
        maxDistance: 5,
        content: '2',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Cilindros:</strong> 6 em linha.</p>
                    <p class="card-text mb-0"><strong>Aspiração:</strong> Turbocompressor.</p>
                    <p class="card-text mb-0"><strong>Peso/potência:</strong> 3,65 kg/cv.</p>
                    <p class="card-text mb-0"><strong>Potência máxima:</strong> 431cv a 5600 rpm.</p>
                    <p class="card-text mb-0"><strong>Peso/torque:</strong> 28,0 kg/kgfm.</p>
                    <p class="card-text mb-0"><strong>Torque máximo:</strong> 56,1 kgfm a 1800 rpm.</p>
                    <p class="card-text mb-0"><strong>Rotação máxima:</strong> 7500 rpm.</p>`,
            'en': `<p class="card-text mb-0"><strong>Cylinders:</strong> 6 in line.</p>
                    <p class="card-text mb-0"><strong>Aspiration:</strong> Turbocharged.</p>
                    <p class="card-text mb-0"><strong>Weight/power:</strong> 3.65 kg/hp.</p>
                    <p class="card-text mb-0"><strong>Maximum power:</strong> 431 hp at 5600 rpm.</p>
                    <p class="card-text mb-0"><strong>Weight/torque:</strong> 28.0 kg/kgfm.</p>
                    <p class="card-text mb-0"><strong>Maximum torque:</strong> 56.1 kgfm at 1800 rpm.</p>
                    <p class="card-text mb-0"><strong>Maximum rotation:</strong> 7500 rpm.</p>`},
        title: {'pt-br': 'Motor', 'en': 'Engine'},
        srcImage: 'assets/images/demo/motor.jpg',
    },
    {
        position: new THREE.Vector3(0, 0.2, 1),
        lookAt: new THREE.Vector3(0, -5, 6),
        reference: new THREE.Vector3(0, 0, 0),
        maxDistance: 10,
        content: '3',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Tração:</strong> Traseira.</p>
                    <p class="card-text mb-0"><strong>Câmbio:</strong> Automatizado de 7 marchas.</p>
                    <p class="card-text mb-0"><strong>Acoplamento:</strong> Embreagem dupla a seco.</p>`,
            'en': `<p class="card-text mb-0"><strong>Drive:</strong> Rear.</p>
                    <p class="card-text mb-0"><strong>Transmission:</strong> 7-speed automated.</p>
                    <p class="card-text mb-0"><strong>Clutch:</strong> Dry dual clutch.</p>`},
        title: {'pt-br': 'Transmissão', 'en': 'Transmission'},
        srcImage: 'assets/images/demo/transmissao.webp',
    },
    {
        position: new THREE.Vector3(0.9, 0.7, 1.1),
        lookAt: new THREE.Vector3(2.8, -0.3, 1.6),
        reference: new THREE.Vector3(1, -0.3, 1.3),
        maxDistance: 5,
        content: '4',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Tipo:</strong> ABS.</p>
                    <p class="card-text mb-0"><strong>Dianteiros:</strong> Disco ventilado.</p>
                    <p class="card-text mb-0"><strong>Traseiros:</strong> Disco ventilado.</p>
                    <p class="card-text mb-0"><strong>Pneus:</strong> 255/35 R19.</p>
                    <p class="card-text mb-0"><strong>Frenagem automática de emergência.</strong></p>
                    <p class="card-text mb-0"><strong>Monitoramento de pressão dos pneus.</strong></p>`,
            'en': `<p class="card-text mb-0"><strong>Type:</strong> ABS.</p>
                <p class="card-text mb-0"><strong>Front:</strong> Ventilated disc.</p>
                <p class="card-text mb-0"><strong>Rear:</strong> Ventilated disc.</p>
                <p class="card-text mb-0"><strong>Tires:</strong> 255/35 R19.</p>
                <p class="card-text mb-0"><strong>Automatic emergency braking.</strong></p>
                <p class="card-text mb-0"><strong>Tire pressure monitoring.</strong></p>`},
        title: {'pt-br': 'Freios & Pneus', 'en': 'Brakes & Tires'},
        srcImage: 'assets/images/demo/roda.png',
    },
    {
        position: new THREE.Vector3(0.3, 1, 0),
        lookAt: new THREE.Vector3(0.4, 0.3, -0.6),
        reference: new THREE.Vector3(0.3, 0.2, 0),
        maxDistance: 0.6,
        content: '5',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Velocidade máxima:</strong> 250 km/h.</p>
                    <p class="card-text mb-0"><strong>Aceleração 0-100 km/h:</strong> 4,1 s.</p>
                    <p class="card-text mb-0"><strong>Consumo Urbano:</strong> 7,4 km/l.</p>
                    <p class="card-text mb-0"><strong>Consumo Rodoviário:</strong> 9,2 km/l.</p>
                    <p class="card-text mb-0"><strong>Autonomia Máxima:</strong> 552 km.</p>`,
            'en': `<p class="card-text mb-0"><strong>Maximum speed:</strong> 250 km/h.</p>
                    <p class="card-text mb-0"><strong>Acceleration 0-100 km/h:</strong> 4.1 s.</p>
                    <p class="card-text mb-0"><strong>Urban consumption:</strong> 7.4 km/l.</p>
                    <p class="card-text mb-0"><strong>Highway consumption:</strong> 9.2 km/l.</p>
                    <p class="card-text mb-0"><strong>Maximum autonomy:</strong> 552 km.</p>`},
        title: {'pt-br': 'Consumo & Desempenho', 'en': 'Consumption & Performance'},
        srcImage: 'assets/images/demo/painel.jpg',
    },
    {
        position: new THREE.Vector3(-0.8, 1, -2.2),
        lookAt: new THREE.Vector3(-1, 0.3, -5),
        reference: new THREE.Vector3(0, 0, 0),
        maxDistance: 8,
        content: '6',
        description: {
            'pt-br': `<p class="card-text mb-0"><strong>Sensores de estacionamento.</strong></p>
                    <p class="card-text mb-0"><strong>Câmera traseira para manobras.</strong></p>`,
            'en': `<p class="card-text mb-0"><strong>Parking sensors.</strong></p>
                    <p class="card-text mb-0"><strong>Rear camera for maneuvers.</strong></p>`},
        title: {'pt-br': 'Traseira', 'en': 'Rear'},
        srcImage: 'assets/images/demo/backlight.webp',
    },
];

// Função para adicionar os labels ao modelo carregado
function addLabelsToModel(model) {
    annotations.forEach((annotation, index) => {
        const button = document.createElement('div');
        button.textContent = annotation.content;
        button.style.width = '1.5rem';
        button.style.height = '1.5rem';
        button.style.zIndex = index;
        button.classList.add('annotation');

        // Adiciona o CSS2DObject como filho do modelo
        const css2DObject = new CSS2DObject(button);
        css2DObject.position.copy(annotation.position);
        model.add(css2DObject);

        // Evento desabilita controle para permitir click
        button.addEventListener('mouseenter', () => {
            move = false;
        })
        
        // Evento habilita controle para permitir controle de orbita
        button.addEventListener('mouseleave', () => {
            move = true;
        })

        button.addEventListener('click', () => {
            // Para a rotação e redefine a posição inicial do modelo
            rotating = false;
            controls.maxDistance = annotation.maxDistance; // delimita o controle

            // Cria o card como uma string HTML
            const lang = document.documentElement.lang;
            const cardHTML = `
            <div class="card border-primary" style="width: 14rem;">
                <div class="card-img">
                    <img src="${annotation.srcImage}" class="w-100" alt="Imagem Veiculo">
                </div>
                
                <div class="card-body">
                    <h5 class="card-title">${annotation.title[lang]}</h5>
                    ${annotation.description[lang]}
                </div>
            </div>`;

            // Cria o card com título, valor e imagem
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            cardElement.classList.add('annotation-card');
            cardElement.hidden = true; // Card começa oculto

            // Adiciona o CSS2DObject como filho do modelo
            const cardCss2DObject = new CSS2DObject(cardElement);
            cardCss2DObject.position.copy(annotation.position);
            model.add(cardCss2DObject);
            cardCss2DObject.center.set(0, 0);
            cardCss2DObject.layers.set(index);

            // Oculta asanotações
            hideAnnotations()

            // Exibe o card correspondente ao botão clicado
            setTimeout(() => {
                cardElement.hidden = false;
                cardElement.classList.add('fade-in');
            }, 1000);

            moveToAnnotation(annotation);
        });
    });
}

// Adiciona o event listener ao documento para detectar cliques fora do card
document.addEventListener('click', hideAnnotations);

// Função para ocultar todas as anotações
function hideAnnotations() {
    document.querySelectorAll('.annotation-card').forEach((element) => {
        element.hidden = true;
    });
}

// Função para mover a câmera para a anotação correspondente
function moveToAnnotation(annotation) {

    new TWEEN.Tween(camera.position)
        .to(annotation.lookAt, 1000)
        .onUpdate(() => {
            controls.update();
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(controls.target)
        .to(annotation.reference, 1000)
        .onUpdate(() => {
            controls.update();
        })
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
    
    // Evento para alternar rotação do modelo
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
controls.enabled = true;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.5; // Velocidade de rotação do controle
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

// Posição inicial da câmera em relação ao modelo
let angle = 0;

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Atualiza a posição da câmera para criar a rotação em torno do modelo
    const radius = 5; // Distância da câmera ao modelo
    const cameraX = Math.cos(angle) * radius;
    const cameraZ = Math.sin(angle) * radius;
    controls.enabled = move;

    if (rotating) {
        camera.position.set(cameraX, 0, cameraZ); // Ajuste a altura da câmera conforme necessário
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // Garante que a câmera sempre aponte para o modelo

        angle += 0.005 * rotateDirection; // Atualiza o ângulo para a próxima frame
    } 

    // Atualizando a posição da luz spot para acompanhar a câmera
    spotLightCamera.position.copy(camera.position);

    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
    css2DRenderer.render(scene, camera);
}
animate();

export { scene };