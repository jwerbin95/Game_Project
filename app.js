//***********************************************************
//Data Structure
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
let lineClearCounter = squareDimensions;
let shape = 'line';
let shapes = ['line', 'Z', 'T', 'square', 'L'];
let colors = ['purple', 'blue', 'red', 'yellow', 'green'];
let blockArray = [];
let grid = [];
let randomShape = 0;
let randomColor = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';

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
//***********************************************************

//***********************************************************
//New Object Construction

for (let i = 0; i <= 19; i++) {
	grid[i] = [];
	for (let j = 0; j <= bottom; j++) {
		if (j === bottom) grid[i].push(true);
		else grid[i].push([false]);
	}
}

let currentBlock = new Block(0, 0, 0, 0, 0, 0, 0, 0);
//***********************************************************

//***********************************************************
//Key Tracking for controls
$(document).keydown(function(event) {
	if (event.keyCode == 39 && coordX < boundRight && !collisionRight()) {
		redraw(x + squareDimensions, y);
		coordX++;
	}
});

$(document).keydown(function(event) {
	if (event.keyCode == 37 && coordX > boundLeft && !collisionLeft()) {
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
	if (event.keyCode === 82 && !cantRotate()) {
		rotate();
	}
});
//***********************************************************

//***********************************************************
//Movement Functions (Coordinates had to change depending on shape
//in play)
function rotate() {
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

function moveDown(index) {
	let count = 1;
	for (let i = 0; i <= blockArray.length; i++) {
		if (count === 1) {
			if (blockArray[i].y1 <= index) {
				ctx.fillStyle = blockArray[i].colorType;
				ctx.clearRect(
					blockArray[i].x1,
					blockArray[i].y1,
					squareDimensions,
					squareDimensions
				);
				ctx.fillRect(
					blockArray[i].x1,
					blockArray[i].y1 + squareDimensions,
					squareDimensions,
					squareDimensions
				);
				blockArray[i].y1 += squareDimensions;
			}
		}
		if (count === 2) {
			if (blockArray[i].y2 <= index) {
				ctx.fillStyle = blockArray[i].colorType;
				ctx.clearRect(
					blockArray[i].x2,
					blockArray[i].y2,
					squareDimensions,
					squareDimensions
				);
				ctx.fillRect(
					blockArray[i].x2,
					blockArray[i].y2 + squareDimensions,
					squareDimensions,
					squareDimensions
				);
				blockArray[i].y2 += squareDimensions;
			}
		}
		if (count === 3) {
			if (blockArray[i].y3 <= index) {
				ctx.fillStyle = blockArray[i].colorType;
				ctx.clearRect(
					blockArray[i].x3,
					blockArray[i].y3,
					squareDimensions,
					squareDimensions
				);
				ctx.fillRect(
					blockArray[i].x3,
					blockArray[i].y3 + squareDimensions,
					squareDimensions,
					squareDimensions
				);
				blockArray[i].y3 += squareDimensions;
			}
		}
		if (count === 4) {
			if (blockArray[i].y4 <= index) {
				ctx.fillStyle = blockArray[i].colorType;
				ctx.clearRect(
					blockArray[i].x4,
					blockArray[i].y4,
					squareDimensions,
					squareDimensions
				);
				ctx.fillRect(
					blockArray[i].x4,
					blockArray[i].y4 + squareDimensions,
					squareDimensions,
					squareDimensions
				);
				blockArray[i].y4 += squareDimensions;
			}
			count = 0;
		}
		count++;
	}
}
//***********************************************************

//***********************************************************
//Redraw Function, broken down into smaller functions to clear
//the shape and redraw in its new position
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
//***********************************************************

//***********************************************************
//Next two functions used to check if the block can be rotated
//A block cannot be rotated if too close to a wall or another block
function gridPlacement() {
	if (shape === 'L') {
		if (!rotateFlag) {
			currentBlock.x3 = 2;
			currentBlock.y3 = 0;
			currentBlock.x2 = 1;
			currentBlock.y2 = 0;
			currentBlock.x1 = 0;
			currentBlock.y1 = 0;
			currentBlock.x4 = 0;
			currentBlock.y4 = 1;
		} else {
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
	if (shape === 'line') {
		if (!rotateFlag) {
			currentBlock.x2 = 1;
			currentBlock.y2 = 0;
			currentBlock.x3 = 2;
			currentBlock.y3 = 0;
			currentBlock.x1 = 0;
			currentBlock.y1 = 0;
			currentBlock.x4 = 3;
			currentBlock.y4 = 0;
		} else {
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
	if (shape === 'T') {
		if (!rotateFlag) {
			currentBlock.x2 = 1;
			currentBlock.y2 = 0;
			currentBlock.x3 = 2;
			currentBlock.y3 = 1;
			currentBlock.x1 = 0;
			currentBlock.y1 = 1;
			currentBlock.x4 = 1;
			currentBlock.y4 = 1;
		} else {
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
	if (shape === 'Z') {
		if (!rotateFlag) {
			currentBlock.x2 = 1;
			currentBlock.y2 = 1;
			currentBlock.x3 = 0;
			currentBlock.y3 = 1;
			currentBlock.x1 = 1;
			currentBlock.y1 = 0;
			currentBlock.x4 = 0;
			currentBlock.y4 = 2;
		} else {
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
}

function cantRotate() {
	rotateFlag = !rotateFlag;
	if (coordX <= 4 || coordX >= 15 || coordY >= 25) {
		rotateFlag = !rotateFlag;
		gridPlacement();
		return true;
	}
	gridPlacement();
	if (
		grid[coordX + currentBlock.x1][coordY - currentBlock.y1] === true ||
		grid[coordX + currentBlock.x2][coordY - currentBlock.y2] === true ||
		grid[coordX + currentBlock.x3][coordY - currentBlock.y3] === true ||
		grid[coordX + currentBlock.x4][coordY - currentBlock.y4] === true
	) {
		rotateFlag = !rotateFlag;
		gridPlacement();
		return true;
	} else {
		rotateFlag = !rotateFlag;
		return false;
	}
}
//***********************************************************

//***********************************************************
//Function to clear a line when the line has filled
function lineClear() {
	let countClearLines = 0;
	let line = 0;
	let lineCount = grid[0].length - 2;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[j][lineCount] === true) line++;
		}
		if (line === grid.length) {
			countClearLines++;
			ctx.clearRect(
				0,
				(bottom - 1 - i) * squareDimensions,
				squareDimensions * 20,
				squareDimensions
			);
			clearPlacement(lineCount);
			moveDown((lineCount - 1) * squareDimensions);
			lineCount++;
		}
		lineCount--;
		line = 0;
	}
}

function clearPlacement(index) {
	for (let i = 0; i < grid.length; i++) {
		grid[i].splice(index, 1);
		grid[i].unshift([false]);
	}
}
//***********************************************************

//***********************************************************
//Functions to draw shaped, used in the redraw function
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
		gridPlacement();
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
//***********************************************************

//***********************************************************
//Function to check for collision
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

function collisionLeft() {
	if (
		grid[coordX + currentBlock.x1 - 1][coordY - currentBlock.y1] === true ||
		grid[coordX + currentBlock.x2 - 1][coordY - currentBlock.y2] === true ||
		grid[coordX + currentBlock.x3 - 1][coordY - currentBlock.y3] === true ||
		grid[coordX + currentBlock.x4 - 1][coordY - currentBlock.y4] === true
	)
		return true;
	else return false;
}
//***********************************************************

//***********************************************************
//Timer and main control panel for game logic
setInterval(function() {
	lineClear();
	if (!collision()) {
		redraw(x + directionX, y + directionY);
		coordY++;
	} else {
		blockArray.push(
			{
				x1: (coordX + currentBlock.x1) * squareDimensions,
				y1: (coordY - currentBlock.y1) * squareDimensions,
				colorType: colors[randomColor]
			},
			{
				x2: (coordX + currentBlock.x2) * squareDimensions,
				y2: (coordY - currentBlock.y2) * squareDimensions,
				colorType: colors[randomColor]
			},
			{
				x3: (coordX + currentBlock.x3) * squareDimensions,
				y3: (coordY - currentBlock.y3) * squareDimensions,
				colorType: colors[randomColor]
			},
			{
				x4: (coordX + currentBlock.x4) * squareDimensions,
				y4: (coordY - currentBlock.y4) * squareDimensions,
				colorType: colors[randomColor]
			}
		);
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
			boundRight = 18;
			coordY = 2;
		}
		if (shape === 'T') {
			boundRight = 17;
			coordY = 1;
		}
		if (shape === 'square') {
			boundRight = 18;
		}
		if (shape === 'L') {
			boundRight = 17;
		}
	}
}, 1000);

setInterval(function() {
	redraw(x, y);
}, 0);
//***********************************************************
