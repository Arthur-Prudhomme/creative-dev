import EventEmitter from "events";
import Debug from "./utils/Debug";
import { Size } from "./utils/Size";
import Time from "./utils/Time";

let instance = null;

export default class GlobalContext {
	constructor() {
		if (!!instance) return instance;
		instance = this;

		//debug

		this.debug = new Debug();

		//time
		this.time = new Time();
		this.time.on("update", () => {
			this.update();
		});

		//Size
		this.windowSize = new Size();
		this.windowSize.on("resize", () => {
			this.resize();
		});

		//scenes
		this.scenes = [];
	}

	pushScene(scene) {
		this.scenes.push(scene);
	}

	resize() {
		console.log("resize");
		this.scenes.forEach((s) => {
			s.resize();
		});
	}

	update() {
		// console.log("context-update");

		this.scenes.forEach((s) => {
			s.update();
		});
	}

	destroy() {
		this.time.off("update");
		this.debug.destroy();
		this.scenes.forEach((s) => {
			s.destroy();
		});
	}
}
