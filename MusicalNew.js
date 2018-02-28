/*
creating a visual instrument similar to a theramin, but has visual feedback.
*/

var playSound = false;
var osc;
var pg;
var lastMousePos = [];
var beingPressed = false;
var circles = [];
var lines = [];
var B;
var H;

function setup() { 
  createCanvas(400, 400);
	pg = createGraphics(400,400);
	osc = new p5.Oscillator();
  osc.amp(0);
	colorMode(HSB)
	for(let i = 0; i < 6; i ++){
		circles[i] = new circleBubble(0,0,i+1,100*(i+1)%2);
	}
} 

function draw() {
	background(color(0,0,0));
	B = map(mouseX, 0, width, 0, 255);
	H = map(mouseY, 0, width, 0, 255);
	osc.amp(map(mouseX, 0, width, 0, 1));
	osc.freq(map(mouseY, 0, height, 0, 1000), map(mouseY, 0, height, 0, 1));
  fill(color(H,120,B));
	if(mouseIsPressed == true){
			for(let i = circles.length -1; i > 0; i --){
		circles[i].x = mouseX;
		circles[i].y = mouseY;
		circles[i].display();
		if((i+1)%2 == 0){
			circles[i].color = color(H,120,B);
		}
	}
	} else {
			for(let i = circles.length -1; i > 0; i --){
		circles[i].x = -100;
		circles[i].y = -100;
		circles[i].display();
		if((i+1)%2 == 0){
			circles[i].color = color(H,120,B);
		}
	}
	}
	print(playSound);
	drawLines();
	/*
	if(mouseIsPressed == true) {
		if(beingPressed == false){
			lastMousePos[0] = mouseX;
			lastMousePos[1] = mouseY;
		}
		fill(255);
		//ellipse(mouseX, mouseY, 20);
		pg.stroke(color(H,120,B));
		pg.line(lastMousePos[0]/2,lastMousePos[1]/2, mouseX/2, mouseY/2);
		beingPressed = true;
	}
	lastMousePos[0] = mouseX;
	lastMousePos[1] = mouseY;
	image(pg,0,0);
	*/
	
}

function circleBubble(x,y,pos,col){
	this.x = x;
	this.y = y;
	this.pos = pos;
	this.size = 5 * this.pos;
	this.color = col;
	
	this.display = function() {
		this.size += 1;
		if(this.size > 60) {
			this.size = 10;
		}
		
		fill(this.color);
		ellipse(this.x, this.y, this.size);
	}
}
function lineObj(x,y,col) {
	this.x = x;
	this.y = y;
	
}
function drawLines(){
	if(mouseIsPressed == true) {
		pg.clear();
		if(beingPressed == false){
			lastMousePos[0] = mouseX;
			lastMousePos[1] = mouseY;
			lines[0] = new lineObj(lastMousePos[0],lastMousePos[1]);
		}
		pg.stroke(color(H,120,B));
		lines[lines.length] = new lineObj(mouseX,mouseY)
		for(let i = 0; i < lines.length; i ++){
			if(lines[i + 1]){
				pg.line(lines[i].x/2,lines[i].y/2,lines[i+1].x/2, lines[i+1].y/2);
			}
			if(lines.length > 10){
				lines.splice(0,1);
			}
		}
		//pg.line(lastMousePos[0]/2,lastMousePos[1]/2, mouseX/2, mouseY/2);
		beingPressed = true;
	}
	lastMousePos[0] = mouseX;
	lastMousePos[1] = mouseY;
	image(pg,0,0);
	
}

function mousePressed(){
	playSound = true;	
	osc.start();
}
function mouseReleased(){
	playSound = false;	
	osc.stop();
	pg.clear();
	beingPressed = false;
}
