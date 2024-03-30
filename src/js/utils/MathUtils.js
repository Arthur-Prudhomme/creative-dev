export const deg2rad = (deg) => {
	return deg * 2 * (Math.PI / 360);
};

export const distance2D = (x1, x2, y1, y2) => {
	const dx_ = x2 - x1;
	const dy_ = y2 - y1;
	return Math.sqrt(dx_ * dx_ + dy_ * dy_);
};

export const randomRange = (min, max) => {
	return min + (max - min) * Math.random();
};
