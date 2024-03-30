import * as dat from "dat.gui";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const params = {
	nBubbles: 100,
	speed: 1,
};

const cWidth = canvas.getBoundingClientRect().width;
const cHeight = canvas.getBoundingClientRect().height;

class Bubble {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.rayon = 5;

		this.vx = Math.random() * 4 - 2;
		this.vy = Math.random() * 4 - 2;
	}

	update() {
		this.x += this.vx * params.speed;
		this.y += this.vy * params.speed;

		if (cWidth < this.x || this.x < 0) this.vx *= -1;
		if (cHeight < this.y || this.y < 0) this.vy *= -1;
	}

	drawBubble() {
		context.fillStyle = "white";
		context.lineWidth = 3;
		context.save();
		context.translate(this.x, this.y);
		context.beginPath();
		context.arc(0, 0, this.rayon, 0, Math.PI * 2);
		context.fill();
		context.closePath();
		context.restore();
	}
}

const generate = () => {
	const bubbles = [];

	for (let i = 0; i < params.nBubbles; i++) {
		const x_ = Math.random() * cWidth;
		const y_ = Math.random() * cHeight;

		const bubble_ = new Bubble(x_, y_);
		bubbles.push(bubble_);
	}

	const update = () => {
		context.clearRect(0, 0, cWidth, cHeight);

		for (let i = 0; i < bubbles.length; i++) {
			const current_ = bubbles[i];
			for (let j = i; j < bubbles.length; j++) {
				const next_ = bubbles[j];
				let distance =
					Math.abs(current_.x - next_.x) + Math.abs(current_.y - next_.y);
				context.save();
				context.beginPath();
				if (distance < 255) {
					context.strokeStyle = `rgb(${255 - distance},255,255)`;
					context.lineWidth = 250 / distance;
					context.globalAlpha = 200 / distance;
					context.moveTo(current_.x, current_.y);
					context.lineTo(next_.x, next_.y);
				}
				context.stroke();
				context.closePath();
				context.restore();
			}
		}

		bubbles.forEach((e) => {
			e.update();
			e.drawBubble();
		});
		window.requestAnimationFrame(() => {
			update();
		});
	};

	update();
};

var gui = new dat.GUI();
var folder = gui.addFolder("Settings");
folder.add(params, "nBubbles", 1, 100, 1).onChange(generate);
folder.add(params, "speed", -20, 20, 0.25);
generate();
