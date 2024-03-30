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
		const nArcs_ = 10;

		for (let i = 0; i < nArcs_; i++) {
			const arc_ = new RotatingArc(
				this.width / 2,
				this.height / 2,
				this.mainRadius + (i - nArcs_ / 2) * this.deltaRadius,
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

		this.drawGradutation();
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

	drawGradutation() {
		//draw graduation
		const nGraduations_ = 12;
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
			this.context.moveTo(-length_ / 2, 0);
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
		this.drawGradutation();
		this.arcs.forEach((e) => {
			e.update(this.GlobalContext.time.delta / 1000, this.params.speed);
			e.drawArc(this.context);
		});
	}
}
