const canvas = document.getElementById("fluidCanvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const gridSize = 20;
const damping = 0.99;
const fluid = [];

// Initialiser le fluide avec des valeurs par défaut
function initFluid() {
	for (let x = 0; x < width / gridSize; x++) {
		fluid[x] = [];
		for (let y = 0; y < height / gridSize; y++) {
			fluid[x][y] = { vx: 0, vy: 0 };
		}
	}
}

// Appliquer les forces aux cellules du fluide
function applyForces() {
	for (let x = 0; x < fluid.length; x++) {
		for (let y = 0; y < fluid[x].length; y++) {
			// Ajouter une force vers le bas (simulant la gravité)
			fluid[x][y].vy += 0.1;

			// Appliquer la vitesse
			fluid[x][y].vx *= damping;
			fluid[x][y].vy *= damping;
		}
	}
}

// Mettre à jour les vitesses des cellules du fluide en fonction des voisins
function updateFluid() {
	for (let x = 0; x < fluid.length; x++) {
		for (let y = 0; y < fluid[x].length; y++) {
			// Calculer la moyenne des vitesses des cellules voisines
			let vx = 0;
			let vy = 0;
			for (let dx = -1; dx <= 1; dx++) {
				for (let dy = -1; dy <= 1; dy++) {
					const nx = x + dx;
					const ny = y + dy;
					if (nx >= 0 && nx < fluid.length && ny >= 0 && ny < fluid[x].length) {
						vx += fluid[nx][ny].vx;
						vy += fluid[nx][ny].vy;
					}
				}
			}
			fluid[x][y].vx = vx / 9;
			fluid[x][y].vy = vy / 9;
		}
	}
}

// Dessiner le fluide sur le canvas
function drawFluid() {
	ctx.clearRect(0, 0, width, height);
	for (let x = 0; x < fluid.length; x++) {
		for (let y = 0; y < fluid[x].length; y++) {
			ctx.fillStyle = `rgba(0, 0, 255, ${
				Math.sqrt(fluid[x][y].vx ** 2 + fluid[x][y].vy ** 2) / 2
			})`;
			ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
		}
	}
}

// Animation
function animate() {
	applyForces();
	updateFluid();
	drawFluid();
	requestAnimationFrame(animate);
}

// Initialisation et démarrage de l'animation
initFluid();
animate();
