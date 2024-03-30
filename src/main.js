// const deg2rad = (deg) => {
// 	return deg * (Math.PI / 180);
// };
const deg2rad = (deg) => {
	return deg * 2 * (Math.PI / 360);
};

console.log("Hello Javascript");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const size = 100;
const red = "#d21616";
const blue = "#532deb";

const drawRecangle = (color) => {
	context.beginPath(); //
	context.fillStyle = color;
	context.rect(0, 0, size, size);
	context.fill();
	context.closePath(); //
};

context.translate(100, 100);
drawRecangle(red);
context.translate(100, 100);
drawRecangle(blue);

context.translate(100, 100);
context.rotate(deg2rad(45));
drawRecangle(red);

context.save();
context.translate(100, 100);
drawRecangle(blue);
context.restore();

// context.fillStyle = "blue";
// context.strokeStyle = "black";
// context.lineWidth = 4;
// context.fillRect(100, 100, 100, 100);
// context.strokeRect(50, 100, 100, 100);

// context.beginPath(); //
// context.fillStyle = "blue";
// context.strokeStyle = "black";
// context.lineWidth = 4;
// context.rect(400, 100, 100, 100);
// context.fill();
// context.stroke();
// context.closePath(); //

// context.beginPath(); //
// context.fillStyle = "blue";
// context.strokeStyle = "black";
// context.lineWidth = 10;
// context.arc(200, 300, 50, 0, deg2rad(360));
// context.fill();
// context.stroke();
// context.closePath(); //

// context.beginPath(); //
// context.fillStyle = "blue";
// context.lineWidth = 4;
// context.strokeStyle = "black";
// context.moveTo(300, 500);
// context.lineTo(200, 300);
// context.lineTo(200, 600);
// context.closePath();
// context.fill();
// context.stroke();
// context.closePath(); //

// context.beginPath(); //
// context.fillStyle = "red";
// context.lineWidth = 4;
// context.strokeStyle = "black";
// context.bezierCurveTo(100, 550, 200, 1000, 200, 300);
// context.bezierCurveTo(200, 450, 300, 150, 600, 700);
// context.bezierCurveTo(300, 350, 200, 800, 500, 500);
// context.bezierCurveTo(300, 850, 400, 600, 580, 420);
// context.bezierCurveTo(400, 250, 900, 400, 1000, 380);
// context.stroke();
// context.fill();
// context.closePath(); //
