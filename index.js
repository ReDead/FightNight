const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const players = []
for(let i=0; i<NUM_PLAYERS; i++) {
	players.push(new Player({
		position: {
			x: canvas.width / NUM_PLAYERS * (i + .5),
			y: 0
		},
		velocity: {
			x: 0,
			y: 0
		},
		playerNum: i
	}))
}

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

	for(let i=0; i<NUM_PLAYERS; i++) {
		players[i].update()
	}

	// Collision Detection
	for(let i=0; i<NUM_PLAYERS; i++) {
		for(let j=0; j<NUM_PLAYERS; j++) {
			if(i != j && players[i].hit(players[j]))
				players[i].bounce()
		}
	}
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