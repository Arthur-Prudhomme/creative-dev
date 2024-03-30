import EventEmitter from "./EventEmitter";

export class Size extends EventEmitter {
	constructor() {
		super();

		window.addEventListener("resize", () => {
			this.setSize();
			this.trigger("resize");
		});

		window.addEventListener("load", () => {
			this.setSize();
			this.trigger("resize");
		});
	}

	setSize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
	}
}
