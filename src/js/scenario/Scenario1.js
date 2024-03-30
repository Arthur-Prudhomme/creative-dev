import Scene from "../canvas2d/Scene";
import { RotatingArc } from "../canvas2d/shapes/arc";
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
				this.mainRadius + (i - nArcs_ / 0.2) * this.deltaRadius,
				i != 0 && i != nArcs_ - 1 ? deg2rad(Math.random() * 360) : 0,
				i != 0 && i != nArcs_ - 1 ? deg2rad(Math.random() * 360) : Math.PI * 2
			);
			this.arcs.push(arc_);
		}

		//debug
		this.params["line-width"] = 4;
		this.params["speed"] = 1;

		if (this.debug.active) {
			this.debugFolder.add(this.params, "line-width", 1, 10, 1);
			this.debugFolder.add(this.params, "speed", -100, 100, 0.25);
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
			this.context.strokeStyle = "white";
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

		this.context.strokeStyle = "white";
		this.context.lineWidth = this.params["line-width"];

		this.clear();
		this.drawGradutation(80, 150);
		this.drawGradutation(12, 0);
		this.drawClock();
		this.arcs.forEach((e) => {
			e.update(this.GlobalContext.time.delta / 1000, this.params.speed);
			e.drawArc(this.context);
		});
	}

	drawClock() {
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();

		var hourAngle = (hours % 12) * 30 + minutes / 2;
		var minuteAngle = minutes * 6 + seconds / 10;
		var secondAngle = seconds * 6;

		var hourLength = this.width / 7;
		var minLength = this.width / 5.5;
		var secondLength = this.width / 4.5;

		var centerX = this.width / 2;
		var centerY = this.height / 2;

		this.context.save();
		this.context.translate(centerX, centerY);
		this.context.rotate((hourAngle * Math.PI) / 180);
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(0, -hourLength);
		this.context.lineWidth = 5;
		this.context.strokeStyle = "green";
		this.context.stroke();
		this.context.restore();
		this.context;

		this.context.save();
		this.context.translate(centerX, centerY);
		this.context.rotate((minuteAngle * Math.PI) / 180);
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(0, -minLength);
		this.context.lineWidth = 3;
		this.context.strokeStyle = "blue";
		this.context.stroke();
		this.context.restore();
		this.context;

		this.context.save();
		this.context.translate(centerX, centerY);
		this.context.rotate((secondAngle * Math.PI) / 180);
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(0, -secondLength);
		this.context.lineWidth = 1;
		this.context.strokeStyle = "red";
		this.context.stroke();
		this.context.restore();
	}
}
