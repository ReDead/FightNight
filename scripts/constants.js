const NUM_PLAYERS = 2

// CANVAS
const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 576

// PHYSICS
const GRAVITY = 1
const MAX_FALL_SPEED = 20
const WALK_ACCEL = 1
const WALK_DECEL = 2
const MAX_WALK_SPEED = 10
const JUMP_FORCE = 15
const BOUNCE_FORCE = 25
const DOUBLE_JUMPS = document.getElementById('double').value
const JUMP_TIME = 10

// INPUT
const INPUT = [
	{
		LEFT: 'a',
		RIGHT: 'd',
		JUMP: 'w'
	},
	{
		LEFT: 'ArrowLeft',
		RIGHT: 'ArrowRight',
		JUMP: 'ArrowUp'
	}
]