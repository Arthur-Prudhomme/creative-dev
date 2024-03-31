export class ClockHands {
	constructor(x, y, angle, length, lineWidth, color) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.length = length;
		this.lineWidth = lineWidth;
		this.color = color;
	}

	drawClockHands(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate((this.angle * Math.PI) / 180);
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, -this.length);
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.color;
		context.stroke();
		context.restore();
	}
}
