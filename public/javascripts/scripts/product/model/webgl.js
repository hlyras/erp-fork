// document.addEventListener('DOMContentLoaded', function(event) {
    
// });

var canvas = document.getElementById('canvas');
var canvasClientRect = canvas.getBoundingClientRect();

var offsetX = canvasClientRect.left;
var offsetY = canvasClientRect.top;

var startX = 100;
var startY = 100;

let md = false;

function animateScene() {
    requestAnimationFrame(animateScene);

    cube.rotation.y += 0.02;
    cube.rotation.x += 0.01;

    renderScene();
}

function createCube(color) {
    let cubeMaterials = [
        new THREE.MeshBasicMaterial({color:0x990000}),
        new THREE.MeshBasicMaterial({color:0x999900}),
        new THREE.MeshBasicMaterial({color:0x999999}),
        new THREE.MeshBasicMaterial({color:0x009900}),
        new THREE.MeshBasicMaterial({color:0x990099}),
        new THREE.MeshBasicMaterial({color:0x009999}),
    ];

    let cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    return cube;
}

function startScene(cube) {
    render = new THREE.WebGLRenderer();

    render.setClearColor(0x000000, 1);

    let canvasWidth = canvas.getAttribute('width');
    let canvasHeight = canvas.getAttribute('height');
    render.setSize(canvasWidth, canvasHeight);

    canvas.appendChild(render.domElement);

    scene = new THREE.Scene();
    let aspect = canvasWidth / canvasHeight;

    camera = new THREE.PerspectiveCamera(20, aspect);
    camera.position.set(0, 0, 25);
    camera.lookAt(scene.position);
    scene.add(camera);

    cube.position.set(0, 0, 0);
    scene.add(cube);
}

function renderScene() {
    render.render(scene, camera);
}

let cube = createCube();
startScene(cube);
renderScene();
animateScene()

document.addEventListener("keydown", e => {
    e.preventDefault();
    e.stopPropagation();

    if(e.keyCode == 87){
        camera.position.z -= 0.5;
    };

    if(e.keyCode == 83){
        camera.position.z += 0.5;
    };

    if(e.keyCode == 65){
        camera.position.x -= 0.1;
    };

    if(e.keyCode == 68){
        camera.position.x += 0.1;
    };


    if(e.keyCode == 37){
        camera.rotation.y += 0.01;
    };

    if(e.keyCode == 38){
        camera.rotation.x += 0.01;
    };

    if(e.keyCode == 39){
        camera.rotation.y -= 0.01;
    };

    if(e.keyCode == 40){
        camera.rotation.x -= 0.01;
    };

    renderScene();
});

const controller = {
    mouse: {
        down: (e) => {
            e.preventDefault();
            e.stopPropagation();
            md = true;

            let mx=parseInt(e.clientX-offsetX);
            let my=parseInt(e.clientY-offsetY);

            startX = mx;
            startY = my;
        },
        move: (e) => {
            if(md){
                let mx = parseInt(e.clientX-offsetX);
                let my = parseInt(e.clientY-offsetY);

                let dx = mx-startX;
                let dy = my-startY;

                camera.rotation.x += (dy / 500);
                camera.rotation.y += (dx / 500);

                renderScene();

                startX = mx;
                startY = my;
            };
        },
        up: (e) => {
            e.preventDefault();
            e.stopPropagation();
            md = false;
        },
        out: (e) => {
            e.preventDefault();
            e.stopPropagation();
            md = false;
        }
    },
    touch: {
        down: (e) => {
            e.preventDefault();
            e.stopPropagation();
            md = true;

            let mx = parseInt(e.targetTouches[0].clientX-offsetX);
            let my = parseInt(e.targetTouches[0].clientY-offsetY);

            startX = mx;
            startY = my;
        },
        move: (e) => {
            if(md){
                let mx=parseInt(e.targetTouches[0].clientX-offsetX);
                let my=parseInt(e.targetTouches[0].clientY-offsetY);

                let dx = mx-startX;
                let dy = my-startY;

                camera.rotation.x += (dy / 500);
                camera.rotation.y += (dx / 500);

                renderScene();
                
                startX = mx;
                startY = my;
            }
        },
        up: (e) => {
            md = false;
        },
        out: (e) => {
            md = false;
        }
    }
};

canvas.onmousedown = controller.mouse.down;
canvas.onmousemove = controller.mouse.move;
canvas.onmouseup = controller.mouse.up;
canvas.onmouseout = controller.mouse.out;

canvas.ontouchstart = controller.touch.down;
canvas.ontouchmove = controller.touch.move;
canvas.ontouchend = controller.touch.up;
canvas.ontouchcancel = controller.touch.out;