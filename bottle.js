img = "";
object = [];
Status = "";

function preload() {
    img = loadImage("bottle.png");
}

function setup() {
    canvas = createCanvas(640, 340);
    canvas.center();
    ObjectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detected Object";
}

function modelloaded() {
    console.log("cocossd is loaded");
    Status = true;
    ObjectDetector.detect(img, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(img, 0, 0, 640, 340);

    if (Status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("red");
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
        }
    }
}