let nodes = [];
let indexCounter = 0;
let intervalId;
let oldX;
let oldY;
let mousedown = 0;
let nodeNumber = 36;
let oldNodes = [];
let pictureId;

nodeGenerator();

document.getElementById("few").addEventListener("click", function() {
    nodeNumber = 400;
    nodeGenerator();
});
document.getElementById("medium").addEventListener("click", function() {
    nodeNumber = 900;
    nodeGenerator();
});
document.getElementById("many").addEventListener("click", function() {
    nodeNumber = 2500;
    nodeGenerator();
});


function nodeGenerator() {
    oldNodes = document.getElementsByClassName('node');
    while(oldNodes[0]) {
        oldNodes[0].parentNode.removeChild(oldNodes[0]);
    }
    nodes = [];
    for (i = -Math.sqrt(nodeNumber)/2; i < Math.sqrt(nodeNumber)/2; i++) {
        for (j = -Math.sqrt(nodeNumber)/2; j < Math.sqrt(nodeNumber)/2; j++) {
            if(Math.random() < 0.7) {
              const x = (i * 100) + Math.random() * 50;
              const y = (j * 100) + Math.random() * 50;
              newNode = document.createElement("div");
              newNode.setAttribute("id", "node" + indexCounter);
              newNode.classList.add("node");
              newNode.setAttribute("style", "top: " + y + "px; left: " + x + "px;");
              newNode.setAttribute("onclick", "show(this)");
              document.body.appendChild(newNode);
              nodes[indexCounter] = [x, y];
              indexCounter++;
            }
        }
    }
    pictureId = Math.floor(Math.random()*nodes.length);
    pictureNode = document.getElementById("node" + pictureId);
    pictureNode.classList.add("picture-node");
    picture = pictureNode.appendChild(document.createElement("img"));
    picture.setAttribute("src", "/Rick.png");
}

function show(node) {
    node.classList.toggle("shown");
}

document.addEventListener("pointermove", function(e) {
    moveFocus(e);
    dragScreen(e);
})



document.addEventListener("pointerdown", function(e) {
    grab(e);
})

document.addEventListener("pointerup", function(e) {
    ungrab(e);
})



moveFocus = function (e) {
    nodes.forEach((node, index) => {
        let distance;
        let xDistance;
        let yDistance;
        if (window.innerWidth > 750) {
            xDistance = node[0] - e.x;
            yDistance = node[1] - e.y;
        } else {
            xDistance = node[0] - innerWidth/2;
            yDistance = node[1] - innerHeight/2;
        }
        distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        let size = 100 - Math.pow(distance, 2) / (2 * innerWidth);
        if (size < 0) {
            size = 0;
        }
        currentNode = document.getElementById("node" + index);
        currentNode.style.width = size + "px";
        currentNode.style.height = size + "px";
        currentNode.style.borderWidth = size/40 + "px";
        currentNode.style.zIndex = Math.round(size);
        currentNode.style.left = node[0] - size/2 + Math.pow(size, 2) * (xDistance) / 10000 + "px";
        currentNode.style.top = node[1] - size/2 + Math.pow(size, 2) * (yDistance) / 10000 + "px";

        //currentNode.innerHTML = size;
    });
}

dragScreen = function (e) {
    e.preventDefault();
    if(mousedown == 1){
        nodes.forEach(node => {
            node[0] += e.x-oldX;
            node[1] += e.y-oldY;
        });
        oldX = e.x;
        oldY = e.y;
    }
}

grab = function (e) {
    e.preventDefault();
    document.body.style.cursor = "grabbing";
    oldX = e.x;
    oldY = e.y;
    mousedown = 1;
}

ungrab = function (e) {
    e.preventDefault();
    document.body.style.cursor = "";
    mousedown = 0;
}

