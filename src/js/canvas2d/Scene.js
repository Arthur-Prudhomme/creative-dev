import GlobalContext from "../GlobalContext";
import DomElement from "../utils/DomElement";

export default class Scene {
	constructor(id = "canvas-scene") {
		this.GlobalContext = new GlobalContext();
		this.GlobalContext.pushScene(this);
		this.id = id;

		//debug
		this.params = {
			isUpdate: true,
		};
		this.debug = this.GlobalContext.debug;
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(this.id);
			this.debugFolder.add(this.params, "isUpdate");
		}

		//canvas
		this.domElement = new DomElement(this.id);
		this.canvas = this.domElement.instance;
		this.context = this.canvas.getContext("2d");
		this.resize();
	}
	get width() {
		return this.domElement.width;
	}
	get height() {
		return this.domElement.height;
	}
	get position() {
		return this.domElement.position;
	}

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	update() {
		return this.params["isUpdate"];
		// console.log("update", this.id);
	}

	resize() {
		// console.log("resize");
		this.domElement.getBoundingRect();
		this.canvas.width =
			this.domElement.width * this.GlobalContext.windowSize.pixelRatio;
		this.canvas.height =
			this.domElement.height * this.GlobalContext.windowSize.pixelRatio;

		this.context.scale(
			this.GlobalContext.windowSize.pixelRatio,
			this.GlobalContext.windowSize.pixelRatio
		);
	}

	destroy() {}
}
