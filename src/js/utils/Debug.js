import { GUI } from "dat.gui";

export default class Debug {
	constructor() {
		this.ui = null;
		this.active = window.location.hash === "#debug";
	}

	set active(isActive) {
		if (!!!this.ui && isActive) this.ui = new GUI();
	}
	get active() {
		return !!this.ui;
	}

	destroy() {
		if (!!this.ui) this.ui.destroy();
	}
}
