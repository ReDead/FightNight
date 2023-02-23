class Player {
	width = 40
	height = 50
	isJumping = false
	jumpReleased = true
	doubleJumps = DOUBLE_JUMPS
	jumpTime = JUMP_TIME

	constructor({position, velocity, playerNum}) {
		this.position = position
		this.velocity = velocity
		this.playerNum = playerNum - 1
	}

	isGrounded() {
		return this.position.y + this.height >= canvas.height
	}

	draw() {
		context.fillStyle = 'red'
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update() {
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		// gravity
		this.velocity.y += GRAVITY
		if(this.position.y + this.height + this.velocity.y > canvas.height)
			this.velocity.y = 0

		if(this.velocity.y > MAX_FALL_SPEED)
			this.velocity.y = MAX_FALL_SPEED

		// walking
		if(keys[this.playerNum].left.pressed && !keys[this.playerNum].right.pressed)
			this.velocity.x -= WALK_ACCEL
		else if(keys[this.playerNum].right.pressed && !keys[this.playerNum].left.pressed)
			this.velocity.x += WALK_ACCEL
		else if(this.isGrounded()) {
			if(this.velocity.x < -WALK_DECEL)
				this.velocity.x += WALK_DECEL
			else if(this.velocity.x > WALK_DECEL)
				this.velocity.x -= WALK_DECEL
			else
				this.velocity.x = 0
		}

		if(this.velocity.x > MAX_WALK_SPEED)
			this.velocity.x = MAX_WALK_SPEED
		if(this.velocity.x < -MAX_WALK_SPEED)
			this.velocity.x = -MAX_WALK_SPEED

		// reset jump time counter and num of double jumps remaining
		if(this.isGrounded()) {
			this.jumpTime = JUMP_TIME
			this.doubleJumps = DOUBLE_JUMPS
		}

		// jump
		if(this.isGrounded() && keys[this.playerNum].jump.pressed) {
			this.isJumping = true
			this.jumpReleased = false
		}
		if(keys[this.playerNum].jump.pressed && this.isJumping && this.jumpTime > 0) {
			this.velocity.y = -JUMP_FORCE
			this.jumpTime--
		} else {
			this.isJumping = false
		}

		if(!keys[this.playerNum].jump.pressed)
			this.jumpReleased = true

		// double jump
		if(this.jumpReleased && keys[this.playerNum].jump.pressed && !this.isGrounded() && this.velocity.y > 0 && this.doubleJumps > 0) {
			this.velocity.y = -JUMP_FORCE
			this.doubleJumps--
			this.jumpReleased = false
		}
	}
}