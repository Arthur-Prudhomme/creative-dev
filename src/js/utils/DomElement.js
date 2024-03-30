export default class DomElement {
	constructor(id) {
		this.id = id;
		this.instance = document.getElementById(this.id);
		this.getBoundingRect();
	}

	getBoundingRect() {
		const rect_ = this.instance.getBoundingClientRect();
		this.width = rect_.width;
		this.height = rect_.height;
		this.position = {
			left: rect_.left,
			right: rect_.right,
			top: rect_.top,
			bottom: rect_.bottom,
		};
	}
}
