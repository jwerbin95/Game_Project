let x = 290;
let y = 170;
let squareDimensions = 30;
let shape = 'line';
let directionX = 0;
let directionY = 1;
let rotateFlag = false;
let blockCounter = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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
let blockArray = [];
let currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
ctx.fillStyle = 'green';
$(document).keydown(function(event) {
	if (event.keyCode == 39) {
		redraw(x + 10, y);
	}
});
$(document).keydown(function(event) {
	if (event.keyCode == 37) {
		redraw(x - 10, y);
	}
});
$(document).keydown(function(event) {
	if (event.keyCode == 40) {
		redraw(x, y + 10);
	}
});
$(document).keydown(function(event) {
	if (shape === 'L') {
		clearL();
	}
	if (shape === 'square') {
		clearSquare();
	}
	if (shape === 'line') {
		clearLine();
	}
	if (shape === 'T') {
		clearT();
	}
	if (shape === 'Z') {
		clearZ();
	}
	if (event.keyCode === 82) {
		if (rotateFlag) {
			ctx.translate(x + 15, y + 15);
			ctx.rotate((90 * Math.PI) / 180);
			ctx.translate(-(x + 15), -(y + 15));
			directionX = 0;
			directionY = 1;
			rotateFlag = false;
		} else {
			ctx.translate(x + 15, y + 15);
			ctx.rotate((-90 * Math.PI) / 180);
			ctx.translate(-(x + 15), -(y + 15));
			directionX = -1;
			directionY = 0;
			rotateFlag = true;
		}
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
	currentBlock.x1 = newX;
	currentBlock.y1 = newY;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = newX + squareDimensions;
	currentBlock.y2 = newY;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = newX + squareDimensions * 2;
	currentBlock.y3 = newY;
	ctx.fillRect(
		newX,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = newX;
	currentBlock.y4 = newY - squareDimensions;
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
	currentBlock.x1 = newX;
	currentBlock.y1 = newY;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = newX + squareDimensions;
	currentBlock.y2 = newY;
	ctx.fillRect(
		newX,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = newX;
	currentBlock.y3 = newY - squareDimensions;
	ctx.fillRect(
		newX + squareDimensions,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = newX + squareDimensions;
	currentBlock.y4 = newY - squareDimensions;
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
	currentBlock.x1 = newX;
	currentBlock.y1 = newY;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = newX + squareDimensions;
	currentBlock.y2 = newY;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = newX + squareDimensions * 2;
	currentBlock.y3 = newY;
	ctx.fillRect(
		newX + squareDimensions * 3,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = newX + squareDimensions * 3;
	currentBlock.y4 = newY;
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
	currentBlock.x1 = newX;
	currentBlock.y1 = newY;
	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = newX + squareDimensions;
	currentBlock.y2 = newY;
	ctx.fillRect(
		newX + squareDimensions * 2,
		newY,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = newX + squareDimensions * 2;
	currentBlock.y3 = newY;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = newX + squareDimensions;
	currentBlock.y4 = newY + squareDimensions;
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
	currentBlock.x1 = newX;
	currentBlock.y1 = newY;
	ctx.fillRect(
		newX,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x2 = newX;
	currentBlock.y2 = newY + squareDimensions;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = newX + squareDimensions;
	currentBlock.y3 = newY + squareDimensions;
	ctx.fillRect(
		newX + squareDimensions,
		newY + squareDimensions * 2,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x4 = newX;
	currentBlock.y4 = newY + squareDimensions * 2;
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
function collision() {
	if (blockArray.length === 0) return false;
	for (let block of blockArray) {
		console.log(
			ones(block) || twos(block) || threes(block) || fours(block)
		);
		if (ones(block) || twos(block) || threes(block) || fours(block)) {
			return true;
		}
	}
	return false;
}
function ones(block) {
	return (
		(currentBlock.x1 >= block.x1 &&
			currentBlock.y1 < block.y1 &&
			currentBlock.x1 < block.x1 + squareDimensions &&
			currentBlock.y1 > block.y1 - squareDimensions) ||
		(currentBlock.x1 >= block.x2 &&
			currentBlock.y1 < block.y2 &&
			currentBlock.x1 < block.x2 + squareDimensions &&
			currentBlock.y1 > block.y2 - squareDimensions) ||
		(currentBlock.x1 >= block.x3 &&
			currentBlock.y1 < block.y3 &&
			currentBlock.x1 < block.x3 + squareDimensions &&
			currentBlock.y1 > block.y3 - squareDimensions) ||
		(currentBlock.x1 >= block.x4 &&
			currentBlock.y1 < block.y4 &&
			currentBlock.x1 < block.x4 + squareDimensions &&
			currentBlock.y1 > block.y4 - squareDimensions)
	);
}
function twos(block) {
	return (
		(currentBlock.x2 >= block.x1 &&
			currentBlock.y2 < block.y1 &&
			currentBlock.x2 < block.x1 + squareDimensions &&
			currentBlock.y2 > block.y1 - squareDimensions) ||
		(currentBlock.x2 >= block.x2 &&
			currentBlock.y2 < block.y2 &&
			currentBlock.x2 < block.x2 + squareDimensions &&
			currentBlock.y2 > block.y2 - squareDimensions) || //currentBlock.x2 >= block.x3 &&
		(currentBlock.y2 < block.y3 &&
			currentBlock.x2 < block.x3 + squareDimensions &&
			currentBlock.y2 > block.y3 - squareDimensions) ||
		(currentBlock.x2 >= block.x4 &&
			currentBlock.y2 < block.y4 &&
			currentBlock.x2 < block.x4 + squareDimensions &&
			currentBlock.y2 > block.y4 - squareDimensions)
	);
}
function threes(block) {
	return (
		(currentBlock.x3 >= block.x1 &&
			currentBlock.y3 < block.y1 &&
			currentBlock.x3 < block.x1 + squareDimensions &&
			currentBlock.y3 > block.y1 - squareDimensions) ||
		(currentBlock.x3 >= block.x2 &&
			currentBlock.y3 < block.y2 &&
			currentBlock.x3 < block.x2 + squareDimensions &&
			currentBlock.y3 > block.y2 - squareDimensions) ||
		(currentBlock.x3 >= block.x3 &&
			currentBlock.y3 < block.y3 &&
			currentBlock.x3 < block.x3 + squareDimensions &&
			currentBlock.y3 > block.y3 - squareDimensions) ||
		(currentBlock.x3 >= block.x4 &&
			currentBlock.y3 < block.y4 &&
			currentBlock.x3 < block.x4 + squareDimensions &&
			currentBlock.y3 > block.y4 - squareDimensions)
	);
}
function fours(block) {
	return (
		(currentBlock.x4 >= block.x1 &&
			currentBlock.y4 < block.y1 &&
			currentBlock.x4 < block.x1 + squareDimensions &&
			currentBlock.y4 > block.y1 - squareDimensions) ||
		(currentBlock.x4 >= block.x2 &&
			currentBlock.y4 < block.y2 &&
			currentBlock.x4 < block.x2 + squareDimensions &&
			currentBlock.y4 > block.y2 - squareDimensions) ||
		(currentBlock.x4 >= block.x3 &&
			currentBlock.y4 < block.y3 &&
			currentBlock.x4 < block.x3 + squareDimensions &&
			currentBlock.y4 > block.y3 - squareDimensions) ||
		(currentBlock.x4 >= block.x4 &&
			currentBlock.y4 < block.y4 &&
			currentBlock.x4 < block.x4 + squareDimensions &&
			currentBlock.y4 > block.y4 - squareDimensions)
	);
}
setInterval(function() {
	if (y < 680 && !collision()) {
		redraw(x + directionX, y + directionY);
		$('.coordinates').text(
			`${currentBlock.x2} ${currentBlock.y2} ${blockArray[0].x3 +
				squareDimensions} ${blockArray[0].y3} ${currentBlock.x2 >=
				blockArray.x3}`
		);
	} else {
		blockArray.push(currentBlock);
		currentBlock = new Block();
		blockCounter++;
		x = 290;
		y = 170;
	}
}, 100);
