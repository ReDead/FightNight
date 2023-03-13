const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const score = document.getElementById('score')

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
context.imageSmoothingEnabled = false

const players = []
for(let i=0; i<NUM_PLAYERS; i++) {
	players.push(new Player({
		position: {
			x: canvas.width / NUM_PLAYERS * (i + .5),
			y: canvas.height - 65,
			spawnX: canvas.width / NUM_PLAYERS * (i + .5),
			spawnY: canvas.height - 65
		},
		velocity: {
			x: 0,
			y: 0
		},
		sprites: { 
			idle: { src: './imgs/Dino' + (i + 1) + '_Idle.png', frames: 4 },
			walk: { src: './imgs/Dino' + (i + 1) + '_Walk.png', frames: 6 }
		},
		scale: 4,
		playerNum: i,
		offset: {x:20, y:20},
		hitbox: {width:50, height:65}
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

const explosion = new Sprite({
					position: {x:0, y:0},
					velocity: {x:0, y:0},
					image: {src: './imgs/explosion-4.png', frames: 12},
					scale: 1,
					offset: {x:40, y:55}
				});

drawExplosion = false
doRespawn = false

function update() {
	window.requestAnimationFrame(update)

	// Background
	context.fillStyle = 'gray'
	context.fillRect(0, 0, canvas.width, canvas.height)

	// Platforms
	// context.fillStyle = 'red'
	// context.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 20, 400, 40)

	score.innerHTML = players[0].score + ' - ' + players[1].score

	for(let i=0; i<players.length; i++) {
		players[i].update()
	}

	if(drawExplosion) {
		explosion.draw()
		explosion.animate()
		if(explosion.numAnimates > 0) {
			drawExplosion = false
			explosion.numAnimates = 0
			doRespawn = true
		}
	}

	if(doRespawn) {
		for(let i=0; i<players.length; i++) {
			players[i].respawn()
			players[i].hide = false
			players[i].movementLock = false
		}
		doRespawn = false
	}

	// Collision Detection between players
	for(let i=0; i<players.length; i++) {
		for(let j=0; j<players.length; j++) {
			if(i != j && players[i].hit(players[j])) {
				players[i].bounce()
				players[i].score++
				explosion.position.x = players[j].position.x;
				explosion.position.y = players[j].position.y;
				drawExplosion = true
				players[j].hide = true
				players[i].movementLock = true
			}
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