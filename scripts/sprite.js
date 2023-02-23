class Sprite {
	currFrame = 0
	framesElapsed = 0

	constructor({position, velocity, image, scale, offset = {x:0, y:0}}) {
		this.position = position
		this.velocity = velocity
		this.image = new Image()
		this.image.src = image.src
		this.frames = image.frames
		this.scale = scale
		this.offset = offset
	}

	draw() {
		context.drawImage(this.image, 
			this.image.width / this.frames * this.currFrame, 
			0, 
			this.image.width / this.frames, this.image.height, 
			this.position.x - this.offset.x, this.position.y - this.offset.y, 
			this.image.width / this.frames * this.scale, 
			this.image.height * this.scale)
	}

	animate() {
		this.framesElapsed++;
		if(this.framesElapsed % FRAME_WAIT == 0)
			this.currFrame++;
		if(this.currFrame >= this.frames)
			this.currFrame = 0
	}
}