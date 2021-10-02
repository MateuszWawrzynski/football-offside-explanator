class Ball {
	constructor(_owner){
		this.owner = _owner
		
		this.pos = createVector(0, 0)
	}

	move(){
		this.pos = createVector(this.owner.pos.x, this.owner.pos.y)
	}

	pass(newOwner){
		ball.owner = newOwner
	}

	render(){
		push()
		translate(this.pos.x + options.players.bodyRadius, this.pos.y)
		stroke(0)
		fill(options.ball.color)
		ellipse(0, 0, options.ball.radius * options.renderScale*2)
		pop()
	}
}