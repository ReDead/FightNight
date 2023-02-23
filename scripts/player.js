class Player extends Sprite {
	isJumping = false
	jumpReleased = true
	doubleJumps = DOUBLE_JUMPS
	jumpTime = JUMP_TIME

	constructor({position, velocity, sprites, scale, playerNum, offset, hitbox}) {
		super({position, velocity, image: sprites.idle, scale, offset})
		this.playerNum = playerNum
		this.hitbox = hitbox
		this.sprites = sprites
		for(const index in this.sprites) {
			this.sprites[index].image = new Image()
			this.sprites[index].image.src = this.sprites[index].src
		}
	}

	isGrounded() {
		return this.position.y + this.hitbox.height >= canvas.height
	}

	update() {
		this.draw()
		this.animate()

		// Draw Hitbox
		// context.fillStyle = 'red'
		// context.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height)

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		// gravity
		this.velocity.y += GRAVITY
		if(this.position.y + this.hitbox.height + this.velocity.y > canvas.height)
			this.velocity.y = 0

		if(this.velocity.y > MAX_FALL_SPEED)
			this.velocity.y = MAX_FALL_SPEED

		// walking
		if(keys[this.playerNum].left.pressed && !keys[this.playerNum].right.pressed) {
			this.velocity.x -= WALK_ACCEL
			this.image = this.sprites.walk.image
			this.frames = this.sprites.walk.frames
		} else if(keys[this.playerNum].right.pressed && !keys[this.playerNum].left.pressed) {
			this.velocity.x += WALK_ACCEL
			this.image = this.sprites.walk.image
			this.frames = this.sprites.walk.frames
		} else if(this.isGrounded()) {
			if(this.velocity.x < -WALK_DECEL)
				this.velocity.x += WALK_DECEL
			else if(this.velocity.x > WALK_DECEL)
				this.velocity.x -= WALK_DECEL
			else {
				this.velocity.x = 0
				this.image = this.sprites.idle.image
				this.frames = this.sprites.idle.frames
			}
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

	hit(other) {
		return this.position.x + this.hitbox.width > other.position.x 
		&& this.position.x < other.position.x + other.hitbox.width 
		&& this.position.y + this.hitbox.height > other.position.y
		&& this.position.y < other.position.y
	}

	bounce() {
		this.velocity.y = -BOUNCE_FORCE
	}
}