let x = 0;
let y = 0;
let coordX = 0;
let coordY = 0;
let bottom = 26;
let boundRight = 16;
let boundLeft = 0;
let squareDimensions = 30;
let directionX = 0;
let directionY = squareDimensions;
let rotateFlag = false;
let shape = 'line';
let shapes = ['line', 'Z', 'T', 'square', 'L'];
let colors = ['purple', 'blue', 'red', 'yellow', 'green'];
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
for (let i = 0; i <= 19; i++) {
	grid[i] = [];
	for (let j = 0; j <= bottom; j++) {
		if (j === bottom) grid[i].push(true);
		else grid[i].push([false]);
	}
}
let currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
$(document).keydown(function(event) {
	if (event.keyCode == 39 && coordX < boundRight && !collisionRight()) {
		redraw(x + squareDimensions, y);
		coordX++;
	}
	$('.coordinates').text(`${coordY} ${coordX}`);
});
$(document).keydown(function(event) {
	if (event.keyCode == 37 && coordX > boundLeft) {
		redraw(x - squareDimensions, y);
		coordX--;
	}
});
$(document).keydown(function(event) {
	if (event.keyCode == 40 && !collision()) {
		redraw(x, y + squareDimensions);
		coordY++;
	}
});
$(document).keydown(function(event) {
	if (event.keyCode === 82) {
		if (!rotateFlag) {
			if (shape === 'L') {
				clearUnrotatedL();
				coordY += 2;
				boundLeft = 1;
				boundRight = 19;
			}
			if (shape === 'line') {
				clearUnrotatedLine();
				coordY += 3;
				boundRight = 19;
			}
			if (shape === 'T') {
				clearUnrotatedT();
				coordY++;
				boundRight = 18;
			}
			if (shape === 'Z') {
				clearUnrotatedZ();
				boundRight = 17;
				coordY -= 1;
			}
		} else {
			if (shape === 'L') {
				clearRotatedL();
				coordY -= 2;
				boundLeft = 0;
				boundRight = 17;
			}
			if (shape === 'line') {
				clearRotatedLine();
				coordY -= 3;
				boundRight = 16;
				boundLeft = 0;
			}
			if (shape === 'T') {
				clearRotatedT();
				coordY--;
				boundRight = 17;
			}
			if (shape === 'Z') {
				clearRotatedZ();
				coordY += 1;
			}
		}
		rotateFlag = !rotateFlag;
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
	if (!rotateFlag) {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

		ctx.fillRect(
			newX + squareDimensions,
			newY,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions * 2,
			newY,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX,
			newY - squareDimensions,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x3 = 2;
		currentBlock.y3 = 0;
		currentBlock.x2 = 1;
		currentBlock.y2 = 0;
		currentBlock.x1 = 0;
		currentBlock.y1 = 0;
		currentBlock.x4 = 0;
		currentBlock.y4 = 1;
	} else {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
		ctx.fillRect(
			newX,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX,
			newY + squareDimensions * 2,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX - squareDimensions,
			newY,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x3 = 0;
		currentBlock.y3 = 2;
		currentBlock.x2 = 0;
		currentBlock.y2 = 1;
		currentBlock.x1 = 0;
		currentBlock.y1 = 0;
		currentBlock.x4 = -1;
		currentBlock.y4 = 2;
	}
}
function clearUnrotatedL() {
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
function clearRotatedL() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x, y + squareDimensions, squareDimensions, squareDimensions);
	ctx.clearRect(
		x,
		y + squareDimensions * 2,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(x - squareDimensions, y, squareDimensions, squareDimensions);
}
function clearL() {
	if (!rotateFlag) {
		clearUnrotatedL();
	} else {
		clearRotatedL();
	}
}
function drawSquare(newX, newY) {
	ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

	ctx.fillRect(
		newX + squareDimensions,
		newY,
		squareDimensions,
		squareDimensions
	);

	ctx.fillRect(
		newX,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);

	ctx.fillRect(
		newX + squareDimensions,
		newY - squareDimensions,
		squareDimensions,
		squareDimensions
	);
	currentBlock.x3 = 0;
	currentBlock.y3 = 1;
	currentBlock.x2 = 1;
	currentBlock.y2 = 0;
	currentBlock.x1 = 0;
	currentBlock.y1 = 0;
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
	if (!rotateFlag) {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

		ctx.fillRect(
			newX + squareDimensions,
			newY,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions * 2,
			newY,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions * 3,
			newY,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 1;
		currentBlock.y2 = 0;
		currentBlock.x3 = 2;
		currentBlock.y3 = 0;
		currentBlock.x1 = 0;
		currentBlock.y1 = 0;
		currentBlock.x4 = 3;
		currentBlock.y4 = 0;
	} else {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

		ctx.fillRect(
			newX,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX,
			newY + squareDimensions * 2,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX,
			newY + squareDimensions * 3,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 0;
		currentBlock.y2 = 1;
		currentBlock.x3 = 0;
		currentBlock.y3 = 2;
		currentBlock.x1 = 0;
		currentBlock.y1 = 0;
		currentBlock.x4 = 0;
		currentBlock.y4 = 3;
	}
}
function clearUnrotatedLine() {
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
function clearRotatedLine() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x, y + squareDimensions, squareDimensions, squareDimensions);
	ctx.clearRect(
		x,
		y + squareDimensions * 2,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(
		x,
		y + squareDimensions * 3,
		squareDimensions,
		squareDimensions
	);
}
function clearLine() {
	if (!rotateFlag) {
		clearUnrotatedLine();
	} else {
		clearRotatedLine();
	}
}
function drawT(newX, newY) {
	if (!rotateFlag) {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
		ctx.fillRect(
			newX + squareDimensions,
			newY,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX + squareDimensions * 2,
			newY,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX + squareDimensions,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 1;
		currentBlock.y2 = 0;
		currentBlock.x3 = 2;
		currentBlock.y3 = 1;
		currentBlock.x1 = 0;
		currentBlock.y1 = 1;
		currentBlock.x4 = 1;
		currentBlock.y4 = 1;
	} else {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);
		ctx.fillRect(
			newX,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX,
			newY + squareDimensions * 2,
			squareDimensions,
			squareDimensions
		);
		ctx.fillRect(
			newX + squareDimensions,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 0;
		currentBlock.y2 = 1;
		currentBlock.x3 = 0;
		currentBlock.y3 = 2;
		currentBlock.x1 = 0;
		currentBlock.y1 = 0;
		currentBlock.x4 = 1;
		currentBlock.y4 = 1;
	}
}
function clearUnrotatedT() {
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
function clearRotatedT() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x, y + squareDimensions, squareDimensions, squareDimensions);
	ctx.clearRect(
		x,
		y + squareDimensions * 2,
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
function clearT() {
	if (!rotateFlag) {
		clearUnrotatedT();
	} else {
		clearRotatedT();
	}
}
function drawZ(newX, newY) {
	if (!rotateFlag) {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

		ctx.fillRect(
			newX,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions,
			newY + squareDimensions * 2,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 1;
		currentBlock.y2 = 1;
		currentBlock.x3 = 0;
		currentBlock.y3 = 1;
		currentBlock.x1 = 1;
		currentBlock.y1 = 0;
		currentBlock.x4 = 0;
		currentBlock.y4 = 2;
	} else {
		ctx.fillRect(newX, newY, squareDimensions, squareDimensions);

		ctx.fillRect(
			newX + squareDimensions,
			newY,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);

		ctx.fillRect(
			newX + squareDimensions * 2,
			newY + squareDimensions,
			squareDimensions,
			squareDimensions
		);
		currentBlock.x2 = 1;
		currentBlock.y2 = 0;
		currentBlock.x3 = 1;
		currentBlock.y3 = 1;
		currentBlock.x1 = 0;
		currentBlock.y1 = 1;
		currentBlock.x4 = 2;
		currentBlock.y4 = 0;
	}
}
function clearUnrotatedZ() {
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
function clearRotatedZ() {
	ctx.clearRect(x, y, squareDimensions, squareDimensions);
	ctx.clearRect(x + squareDimensions, y, squareDimensions, squareDimensions);
	ctx.clearRect(
		x + squareDimensions,
		y + squareDimensions,
		squareDimensions,
		squareDimensions
	);
	ctx.clearRect(
		x + squareDimensions * 2,
		y + squareDimensions,
		squareDimensions,
		squareDimensions
	);
}
function clearZ() {
	if (!rotateFlag) {
		clearUnrotatedZ();
	} else {
		clearRotatedZ();
	}
}
function collision() {
	if (
		grid[coordX + currentBlock.x1][coordY - currentBlock.y1 + 1] === true ||
		grid[coordX + currentBlock.x2][coordY - currentBlock.y2 + 1] === true ||
		grid[coordX + currentBlock.x3][coordY - currentBlock.y3 + 1] === true ||
		grid[coordX + currentBlock.x4][coordY - currentBlock.y4 + 1] === true
	)
		return true;
	else return false;
}
function collisionRight() {
	if (
		grid[coordX + currentBlock.x1 + 1][coordY - currentBlock.y1] === true ||
		grid[coordX + currentBlock.x2 + 1][coordY - currentBlock.y2] === true ||
		grid[coordX + currentBlock.x3 + 1][coordY - currentBlock.y3] === true ||
		grid[coordX + currentBlock.x4 + 1][coordY - currentBlock.y4] === true
	)
		return true;
	else return false;
}
let randomShape = 0;
let randomColor = 0;
setInterval(function() {
	if (!collision()) {
		redraw(x + directionX, y + directionY);
		coordY++;
		$('.coordinates').text(`${coordY} ${coordX} ${rotateFlag}`);
	} else {
		randomShape = Math.floor(Math.random() * 5);
		randomColor = Math.floor(Math.random() * 5);
		shape = shapes[randomShape];
		ctx.fillStyle = colors[randomColor];
		grid[coordX + currentBlock.x1][coordY - currentBlock.y1] = true;
		grid[coordX + currentBlock.x2][coordY - currentBlock.y2] = true;
		grid[coordX + currentBlock.x3][coordY - currentBlock.y3] = true;
		grid[coordX + currentBlock.x4][coordY - currentBlock.y4] = true;
		x = 0;
		y = 0;
		coordX = 0;
		coordY = 0;
		boundRight = 16;
		rotateFlag = false;
		currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
		if (shape === 'Z') {
			coordY = 2;
		}
		if (shape === 'T') {
			coordY = 1;
		}
	}
}, 1000);
setInterval(function() {
	redraw(x, y);
}, 0);