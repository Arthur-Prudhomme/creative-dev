import Scene from "../canvas2d/Scene";
import { RotatingArc } from "../canvas2d/shapes/arc";
import { ClockHands } from "../canvas2d/shapes/clockHands";
import { deg2rad } from "../utils/MathUtils";

export default class Scenario1 extends Scene {
	constructor(id = "canvas-scene") {
		super(id);

		this.mainRadius = this.width < this.height ? this.width : this.height;
		this.mainRadius = (this.mainRadius / 2) * 0.75;
		this.deltaRadius = this.mainRadius * 0.075;

		//arcs
		this.arcs = [];
		const nArcs_ = 2;

		for (let i = 0; i < nArcs_; i++) {
			const arc_ = new RotatingArc(
				this.width / 2,
				this.height / 2,
				this.mainRadius + (4 * i - nArcs_ / 2) * this.deltaRadius,
				i != 0 && i != nArcs_ - 1 ? deg2rad(Math.random() * 360) : 0,
				i != 0 && i != nArcs_ - 1 ? deg2rad(Math.random() * 360) : Math.PI * 2
			);
			this.arcs.push(arc_);
		}

		//debug
		this.params["line-width"] = 10;
		this.params["MainColor"] = "#fff";

		if (this.debug.active) {
			this.debugFolder.add(this.params, "line-width", 1, 15, 1);
			this.debugFolder.addColor(this.params, "MainColor");
		}

		this.drawGradutation(80, 150);
		this.drawGradutation(12, 0);
		this.drawClock();
	}

	resize() {
		super.resize();

		if (!!this.arcs) {
			this.arcs.forEach((e) => {
				e.x = this.width / 2;
				e.y = this.height / 2;
			});
		}
	}

	drawGradutation(nGraduations, rotation) {
		//draw graduation
		const nGraduations_ = nGraduations;
		for (let i = 0; i < nGraduations_; i++) {
			const angle_ = 2 * Math.PI * (i / nGraduations_);
			const x_ =
				Math.cos(angle_) * (this.mainRadius - this.deltaRadius / 2) +
				this.width / 2;
			const y_ =
				Math.sin(angle_) * (this.mainRadius - this.deltaRadius / 2) +
				this.height / 2;
			const length_ = this.deltaRadius * (this.arcs.length - 1);

			//à faire en fonction
			this.context.save();
			this.context.strokeStyle = this.params["MainColor"];
			this.context.lineWidth = 2;
			this.context.beginPath();
			this.context.translate(x_, y_);
			this.context.rotate(angle_);
			this.context.moveTo(-length_ / 2, rotation);
			this.context.lineTo(length_ / 2, 0);
			this.context.stroke();
			this.context.closePath();
			this.context.restore();
		}
	}

	update() {
		if (!super.update()) return;
		// console.log("update scénario", this.id);

		this.context.strokeStyle = this.params["MainColor"];
		this.context.lineWidth = this.params["line-width"];

		this.clear();
		this.drawGradutation(80, 150);
		this.drawGradutation(12, 0);
		this.arcs.forEach((e) => {
			e.update(this.GlobalContext.time.delta / 1000, this.params.speed);
			e.drawArc(this.context);
		});
		this.drawClock();
	}

	drawClock() {
		var now = new Date();
		var timeHours = now.getHours();
		var timeMinutes = now.getMinutes();
		var timeSeconds = now.getSeconds();

		var hourAngle = (timeHours % 12) * 30 + timeMinutes / 2;
		var minuteAngle = timeMinutes * 6 + timeSeconds / 10;
		var secondAngle = timeSeconds * 6;

		var hourLength = this.mainRadius / 2;
		var minuteLength = this.mainRadius / 1.6;
		var secondLength = this.mainRadius / 1.2;

		var centerX = this.width / 2;
		var centerY = this.height / 2;

		this.clockHands = [];
		const hours = new ClockHands(
			centerX,
			centerY,
			hourAngle,
			hourLength,
			6,
			"green"
		);
		const minutes = new ClockHands(
			centerX,
			centerY,
			minuteAngle,
			minuteLength,
			3.5,
			"blue"
		);
		const seconds = new ClockHands(
			centerX,
			centerY,
			secondAngle,
			secondLength,
			2,
			"red"
		);
		this.clockHands.push(hours, minutes, seconds);

		this.clockHands.forEach((hand) => {
			hand.drawClockHands(this.context);
		});

		this.context.beginPath();
		this.context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
		this.context.fillStyle = "white";
		this.context.fill();
	}

	//JE LA LAISSE MAIS C'EST DU TEXTE DONC PAS AUTORISÉ
	// drawClockNumbers() {
	// 	var centerX = this.width / 2;
	// 	var centerY = this.height / 2;
	// 	var radius = this.width / 5.2;

	// 	for (var i = 1; i <= 12; i++) {
	// 		var angle = ((i - 3) * (Math.PI * 2)) / 12;
	// 		var numX = centerX + Math.cos(angle) * radius;
	// 		var numY = centerY + Math.sin(angle) * radius;

	// 		this.context.beginPath();
	// 		this.context.arc(numX, numY, 10, 0, Math.PI * 2);
	// 		this.context.fillStyle = "black";
	// 		this.context.fill();

	// 		this.context.fillStyle = "white";
	// 		this.context.font = "bold 14px Arial";
	// 		this.context.textAlign = "center";
	// 		this.context.textBaseline = "middle";
	// 		this.context.fillText(i, numX, numY);
	// 	}
	// }
}
