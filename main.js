Img="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('identifier').innerHTML = "Status = Detecting objects";
} 
function modelLoaded(){
    console.log("model is initialized");
    status=true;
    
}
function gotResults(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function preload(){
    Img=loadImage('dog_cat.jpg');
}
function draw(){
    image(video , 0, 0, 380, 380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video , gotResults);
       for(i= 0 ; i<objects.length;i++){
        document.getElementById("identifier").innerHTML = "status = object detected";
        document.getElementById("objects").innerHTML = "number of objects detected are =" + objects.length ;
        fill(r, g, b);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
       }


    }
    
}