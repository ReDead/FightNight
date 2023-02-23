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
	},
	playerNum: 1
})

const player2 = new Player({
	position: {
		x: 500,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	},
	playerNum: 2
})

const keys = []
for(let i=0; i<INPUT.length; i++) {
	keys.push({
		left: { pressed: false },
		right: { pressed: false },
		jump: { pressed: false }
	})
}

function update() {
	window.requestAnimationFrame(update)

	// Background
	context.fillStyle = 'black'
	context.fillRect(0, 0, canvas.width, canvas.height)

	player1.update()
	player2.update()
}

update()

window.addEventListener('keydown', (event) => {
	for(let i=0; i<INPUT.length; i++) {
		switch(event.key) {
			case INPUT[i].LEFT:
				keys[i].left.pressed = true;
				break
			case INPUT[i].RIGHT:
				keys[i].right.pressed = true;
				break
			case INPUT[i].JUMP:
				keys[i].jump.pressed = true;
				break
		}
	}	
})

window.addEventListener('keyup', (event) => {
	for(let i=0; i<INPUT.length; i++) {
		switch(event.key) {
			case INPUT[i].LEFT:
				keys[i].left.pressed = false;
				break
			case INPUT[i].RIGHT:
				keys[i].right.pressed = false;
				break
			case INPUT[i].JUMP:
				keys[i].jump.pressed = false;
				break
		}
	}
})