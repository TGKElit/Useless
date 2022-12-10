let nodes = [];
let indexCounter = 0;
let intervalId;
let oldX;
let oldY;
let mousedown = 0;

for (i = -40; i < 40; i++) {
    for (j = -40; j < 40; j++) {
        if(Math.random() < 0.7) {
            const x = (i * 100) + Math.random() * 50;
            const y = (j * 100) + Math.random() * 50;
            newNode = document.createElement("div");
            newNode.setAttribute("id", "node" + indexCounter);
            newNode.classList.add("node");
            newNode.setAttribute("style", "top: " + y + "px; left: " + x + "px;");
            document.body.appendChild(newNode);
            nodes[indexCounter] = [x, y];
            indexCounter++;
        }
    }
}

document.addEventListener("mousemove", function(e) {
    nodes.forEach((node, index) => {
        const distance = Math.sqrt(Math.pow(e.x - node[0], 2) + Math.pow(e.y - node[1], 2));
        let size = 100 - Math.pow(distance, 2)/5000;
        if (size < 0) {
            size = 0;
        }
        currentNode = document.getElementById("node" + index);
        currentNode.style.width = size + "px";
        currentNode.style.height = size + "px";
        currentNode.style.borderWidth = size/40 + "px";
        currentNode.style.zIndex = Math.round(size);
        currentNode.style.left = node[0] - size/2 + Math.pow(size, 2) * (node[0] - e.x) / 10000 + "px";
        currentNode.style.top = node[1] - size/2 + Math.pow(size, 2) * (node[1] - e.y) / 10000 + "px";
    });
})

document.addEventListener("mousedown", function(e) {
    document.body.style.cursor = "grabbing";
    oldX = e.x;
    oldY = e.y;
    mousedown = 1;
})

document.addEventListener("mouseup", function(e) {
    document.body.style.cursor = "";
    mousedown = 0;
})

document.addEventListener("mousemove", function(e) {
    if(mousedown == 1){
        console.log(oldX + " | " + oldY);
        nodes.forEach(node => {
            node[0] += e.x-oldX;
            node[1] += e.y-oldY;
        });
        oldX = e.x;
        oldY = e.y;
    }
})
