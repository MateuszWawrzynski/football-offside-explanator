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
		//	if the pass was to player on offside
		if(this.owner.team == TEAM_ATK && newOwner.team == TEAM_ATK){
			if(newOwner.pos.x + options.players.bodyRadius > offsideLine.posX){
				whistle.play()
			}
		}

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