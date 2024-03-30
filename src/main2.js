import * as dat from "dat.gui";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context type: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext#typedecontexte

/**
 *  CONFIG
 */

let ROWS = (canvas.getBoundingClientRect().width / 100) * 4;
let COLS = (canvas.getBoundingClientRect().height / 100) * 4;

const red = "#E83A4E";
const yellow = "#FFE800";
const blue = "#3B76F5";
const green = "#71E394";
const pink = "#be40c1";
const brown = "#7f431e";
const cyan = "#19d4d7";
const beije = "#e4e3be";
const colors = [red, yellow, blue, green, pink, brown, cyan, beije];

/**
 *  METHODS
 */
const drawRectangle = (cWidth, cHeight, color) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(-cWidth / 2, -cHeight / 2, cWidth, cHeight);
	ctx.fill();
	ctx.closePath();
};

const deg2rad = (deg) => {
	return (deg * 2 * Math.PI) / 360;
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var params = { size: 40 };

const generate = () => {
	let cSize = canvas.getBoundingClientRect().width / params.size;
	ctx.fillStyle = "black";
	ctx.fillRect(
		0,
		0,
		canvas.getBoundingClientRect().width,
		canvas.getBoundingClientRect().height
	);
	for (let i = 1; i < params.size; i++) {
		for (let j = 1; j < params.size; j++) {
			const randomColor = Math.floor(Math.random() * colors.length);
			ctx.save();
			ctx.translate(cSize * j, cSize * i);
			if (Math.floor(Math.random() * 2) == 1) {
				ctx.rotate(deg2rad(45));
				ctx.scale(0.5, 0.5);
			}
			drawRectangle(cSize, cSize, colors[randomColor]);
			ctx.restore();
		}
	}
};

var gui = new dat.GUI();
var folder = gui.addFolder("Grid settings");
folder.add(params, "size", 1, 80, 1).onChange(generate);
generate();

// while (true) {
// 	ctx.fillStyle = "black";
// 	ctx.fillRect(
// 		0,
// 		0,
// 		canvas.getBoundingClientRect().width,
// 		canvas.getBoundingClientRect().height
// 	);
// 	for (let i = 1; i < ROWS; i++) {
// 		for (let j = 1; j < COLS; j++) {
// 			const randomColor = Math.floor(Math.random() * colors.length);
// 			ctx.save();
// 			ctx.translate(cHeight * j, cWidth * i);
// 			if (Math.floor(Math.random() * 2) == 1) {
// 				ctx.rotate(deg2rad(45));
// 				ctx.scale(0.5, 0.5);
// 			}
// 			drawRectangle(cHeight, cWidth, colors[randomColor]);
// 			ctx.restore();
// 		}
// 	}
// 	await sleep(50);
// }
