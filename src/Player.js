class Player {
	constructor(_pos, _team, _number, _isGK = false){
		this.pos = _pos
		this.team = _team
		this.number = _number
		this.isGK = _isGK

		this.selected = false
		this.runVector = createVector(0, 0)
	}

	move(){
		if(this.selected){
			this.pos = createVector(mouseX, mouseY - options.players.bodyRadius/2 * options.renderScale)
		}
		else{
			if(ball.owner == this) return
			this.pos.add(this.runVector)

			//	prevent players to run outside the canvas
			this.pos.x = Math.max(0, Math.min(this.pos.x, width))
			this.pos.y = Math.max(0, Math.min(this.pos.y, height))
		}
	}

	run(v){
		if(ball.owner == this) return
		this.runVector.add(v, 0).limit(1)
	}

	render(){
		push()
		translate(this.pos.x, this.pos.y)

		// selected player highlight
		if(this.selected){
			stroke(125 + frameCount % 60, 0, 0)
			strokeWeight(3)
			line(-options.players.bodyRadius, options.players.bodyRadius, options.players.bodyRadius, options.players.bodyRadius)
		}

		// kit color
		if(this.team == TEAM_DEF){
			fill(options.players.defendersColor)
		}
		else if(this.team == TEAM_ATK){
			fill(options.players.attackersColor)
		}

		// goalkeeper kit
		if(this.isGK)
			stroke(options.players.gkStroke)
		else
			stroke(255)

		strokeWeight(2)
		ellipse(0, 0, options.players.bodyRadius * options.renderScale*2)

		// kit number
		noStroke()
		fill(255)
		textSize(options.players.bodyRadius * options.renderScale)
		textAlign(CENTER, CENTER)
		text(this.number, 0, 0)

		//	offside indicator
		if(offsideLine.visibility && this.team == TEAM_ATK && this.pos.x + options.players.bodyRadius > offsideLine.posX){
			fill(options.offside.indicatorColor)
			ellipse(0, -options.players.bodyRadius * options.renderScale*2, options.players.bodyRadius * options.renderScale)	
		}
		pop()
	}
}