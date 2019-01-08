let x = 0;
let y = 0;
let coordX = 0;
let coordY = 2;
let bottom = 25;
let boundRight = 16;
let boundLeft = 0;
let squareDimensions = 30;
let shape = 'Z';
class Block {
	constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		this.x4 = x4;
		this.y4 = y4;
	}
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
let grid = [];
for (let i = 0; i < boundRight; i++) {
	grid[i] = [];
	for (let j = 0; j <= bottom; j++) {
		grid[i].push([false]);
	}
}
let currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
$(document).keydown(function(event) {
	if (event.keyCode == 39 && coordX < boundRight) {
		redraw(x + squareDimensions, y);
		coordX++;
	}
	$('.coordinates').text(`${coordY} ${coordX}`);
});
$(document).keydown(function(event) {
	if (event.keyCode == 37 && coordX > boundLeft) {
		redraw(x - squareDimensions, y);
		coordY--;
	}
});
$(document).keydown(function(event) {
	if (event.keyCode == 40 && coordY < bottom) {
		redraw(x, y + squareDimensions);
		coordY++;
	}
});
function redraw(newX, newY) {
	if (shape === 'L') {
		clearL();
		drawL(newX, newY);
	}
	if (shape === 'square') {
		clearSquare();
		drawSquare(newX, newY);
	}
	if (shape === 'line') {
		clearLine();
		drawLine(newX, newY);
	}
	if (shape === 'T') {
		clearT();
		drawT(newX, newY);
	}
	if (shape === 'Z') {
		clearZ();
		drawZ(newX, newY);
	}
	x = newX;
	y = newY;
}
function drawL(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
	currentBlock.x1 = 0;
	currentBlock.y1 = 0;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = 1;
	currentBlock.y2 = 0;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 2;
	currentBlock.y3 = 0;
	ctx.fillRect(
		newX,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = 0;
	currentBlock.y4 = -1;
}
function clearL() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x + squareDimensions, y, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions * 2,
		y,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(x, y - squareDimensions, squareDimensions, squareDimensions);
}
function drawSquare(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
	currentBlock.x1 = 0;
	currentBlock.y1 = 0;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = 1;
	currentBlock.y2 = 0;
	ctx.fillRect(
		newX,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 0;
	currentBlock.y3 = 1;
	ctx.fillRect(
		newX + squareDimensions,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = 1;
	currentBlock.y4 = 1;
}
function clearSquare() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x + squareDimensions, y, squareDimensions, squareDimensions);
	ctx.clearRect(x, y - squareDimensions, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions,
		y - squareDimensions,
		squareDimensions,
		squareDimensions
	);
}
function drawLine(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
	currentBlock.x1 = 0;
	currentBlock.y1 = 0;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = 1;
	currentBlock.y2 = 0;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 2;
	currentBlock.y3 = 0;
	ctx.fillRect(
		newX + squareDimensions * 3,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = 3;
	currentBlock.y4 = 0;
}
function clearLine() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x + squareDimensions, y, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions * 2,
		y,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(
		x + squareDimensions * 3,
		y,
		squareDimensions,
		squareDimensions
	);
}
function drawT(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
	currentBlock.x1 = 0;
	currentBlock.y1 = 1;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = 1;
	currentBlock.y2 = 0;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 2;
	currentBlock.y3 = 1;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = 1;
	currentBlock.y4 = 1;
}
function clearT() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x + squareDimensions, y, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions * 2,
		y,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(
		x + squareDimensions,
		y + squareDimensions,
		squareDimensions,
		squareDimensions
	);
}
function drawZ(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
	currentBlock.x1 = 0;
	currentBlock.y1 = 1;
	ctx.fillRect(
		newX,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = 0;
	currentBlock.y2 = 2;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 1;
	currentBlock.y3 = 0;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions * 2,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = 1;
	currentBlock.y4 = 1;
}
function clearZ() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x, y + squareDimensions, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions,
		y + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(
		x + squareDimensions,
		y + squareDimensions * 2,
		squareDimensions,
		squareDimensions
	);
}
setInterval(function() {
	if (coordY < bottom) {
		redraw(x, y + squareDimensions);
		coordY++;
		$('.coordinates').text(`${coordY} ${coordX}`);
	} else {
		grid[coordX + currentBlock.x1][coordY - currentBlock.y1] = true;
		console.log(currentBlock.y1);
		grid[coordX + currentBlock.x2][coordY - currentBlock.y2] = true;
		grid[coordX + currentBlock.x3][coordY - currentBlock.y3] = true;
		grid[coordX + currentBlock.x4][coordY - currentBlock.y4] = true;
		console.log(grid);
		x = 0;
		y = 0;
		coordX = 0;
		coordY = 0;
		currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
	}
}, 1000);
