right_wrist_x=0;
right_wrist_y=0;
left_wrist_x=0;
left_wrist_y=0;
right_score=0;
left_score=0;
nose_x=0;
nose_y=0;
Song="";
function preload(){
Song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(800,600);
canvas.position(330,200);   
camera=createCapture(VIDEO);
camera.hide();
myModel=ml5.poseNet(camera,modelLoaded);
myModel.on("pose",result);
}

function modelLoaded(){
console.log("Your Model Is Ready To Use");
}

function result(answer){
if(answer.length>0){
console.log(answer);
right_wrist_x=answer[0].pose.rightWrist.x;
right_wrist_y=answer[0].pose.rightWrist.y;
left_wrist_x=answer[0].pose.leftWrist.x;
left_wrist_y=answer[0].pose.leftWrist.y;
right_score=answer[0].pose.keypoints[10].score;
left_score=answer[0].pose.keypoints[9].score;
nose_x=answer[0].pose.nose.x;
nose_y=answer[0].pose.nose.y;
}
}


function draw(){    
image(camera,0,0,800,600);
fill("#fc0303");
stroke("#fc0303");


if(left_score>0.2){
    circle(left_wrist_x,left_wrist_y,30);
    if(right_wrist_y>0 && right_wrist_y<=100){
        document.getElementById("speed").innerHTML="Speed: 0.5x";
        Song.rate(0.5);
    }
    else if(right_wrist_y>100 && right_wrist_y<=200){
        document.getElementById("speed").innerHTML="Speed: 1x";
        Song.rate(1);
    }
    else if(right_wrist_y>200 && right_wrist_y<=300){
        document.getElementById("speed").innerHTML="Speed: 1.5x";
        Song.rate(1.5);
    }
    else if(right_wrist_y>300 && right_wrist_y<=400){
        document.getElementById("speed").innerHTML="Speed: 2x";
        Song.rate(2);
    }
    else if(right_wrist_y>400){
        document.getElementById("speed").innerHTML="Speed: 2.5x";
        Song.rate(2.5);
    }
}
  


if(left_score>0.2){
    circle(left_wrist_x,left_wrist_y,30);
    number=Number(left_wrist_y);
    remove_decimals=floor(number);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTMl="Volume= "+volume;
    song.setVolume(volume);
}
}


function play(){
    Song.play();
    Song.setVolume(0.1);
    Song.rate(1);
    }