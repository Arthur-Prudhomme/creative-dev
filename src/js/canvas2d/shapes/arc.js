import { randomRange } from "../../utils/MathUtils";

export class RotatingArc {
	constructor(x, y, radius, startAngle, angle) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.startAngle = startAngle;
		this.angle = angle;

		this.vAngular = randomRange(-2, 2);
	}

	drawArc(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, this.startAngle, this.angle);
		context.stroke();
		context.closePath();
	}

	update(deltaTime = 16, speed = 1) {
		this.startAngle += this.vAngular * deltaTime * speed;
		this.angle += this.vAngular * deltaTime * speed;
	}
}
