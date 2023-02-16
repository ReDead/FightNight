const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const player1 = new Player({
	position: {
		x: 0,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	}
})

const keys = {
	left: {
		pressed: false
	},
	right: {
		pressed: false
	},
	jump: {
		pressed: false
	}
}

function update() {
	window.requestAnimationFrame(update)

	// Background
	context.fillStyle = 'black'
	context.fillRect(0, 0, canvas.width, canvas.height)

	player1.update()
}

update()

window.addEventListener('keydown', (event) => {
	switch(event.key) {
		case LEFT:
			keys.left.pressed = true;
			break
		case RIGHT:
			keys.right.pressed = true;
			break
		case JUMP:
			keys.jump.pressed = true;
			break
	}
})

window.addEventListener('keyup', (event) => {
	switch(event.key) {
		case LEFT:
			keys.left.pressed = false;
			break
		case RIGHT:
			keys.right.pressed = false;
			break
		case JUMP:
			keys.jump.pressed = false;
			break
	}
})