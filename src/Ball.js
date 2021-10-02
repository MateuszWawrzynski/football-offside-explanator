class Ball {
	constructor(_owner){
		this.owner = _owner
		this.pos = createVector(_owner.pos.x, _owner.pos.y)
	}

	move(){
		let newPos = this.owner.pos.copy()
		newPos.sub(this.pos).limit(options.ball.passSpeed)
		this.pos.add(newPos)
	}

	pass(newOwner){
		this.owner = newOwner
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