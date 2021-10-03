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
			if(!toggleRun) return
			this.pos.add(this.runVector)

			//	prevent players to run outside the canvas
			this.pos.x = Math.max(0, Math.min(this.pos.x, width))
			this.pos.y = Math.max(0, Math.min(this.pos.y, height))
		}
	}

	run(v){
		if(ball.owner == this) return
		this.runVector.add(v, 0).limit(options.players.runMaxSpeed)
	}

	render(){
		push()
		translate(this.pos.x, this.pos.y)

		// selected player highlight
		if(this.selected){
			stroke(125 + frameCount % 60, 0, 0)
			strokeWeight(3)
			line(-options.players.bodyRadius, options.players.bodyRadius*2, options.players.bodyRadius, options.players.bodyRadius*2)
		}

		// kit color
		imageMode(CENTER)
		if(this.team == TEAM_DEF){
			if(this.isGK)
				image(img_kit_def_gk, 0, 0, options.players.bodyRadius * options.renderScale*3, options.players.bodyRadius * options.renderScale*3)
			else
				image(img_kit_def, 0, 0, options.players.bodyRadius * options.renderScale*3, options.players.bodyRadius * options.renderScale*3)
		}
		else if(this.team == TEAM_ATK){
			if(this.isGK)
				image(img_kit_atk_gk, 0, 0, options.players.bodyRadius * options.renderScale*3, options.players.bodyRadius * options.renderScale*3)
			else
				image(img_kit_atk, 0, 0, options.players.bodyRadius * options.renderScale*3, options.players.bodyRadius * options.renderScale*3)
		}

		// kit number
		noStroke()
		fill(255)
		textSize(options.players.bodyRadius * options.renderScale)
		textAlign(CENTER, CENTER)
		text(this.number, 0, 0)

		//	offside indicator
		if(offsideLine.visibility && this.team == TEAM_ATK && this.pos.x + options.players.bodyRadius > offsideLine.posX){
			image(img_offside_flag, 0, -options.players.bodyRadius * options.renderScale*2, options.players.bodyRadius * options.renderScale, options.players.bodyRadius * options.renderScale)
		}

		//	automatic run indicator
		if(this.runVector.x != 0){
			let s = ''
			for(let a = 0; a < Math.abs(this.runVector.x); a++) s+= '~'
			if(this.runVector.x < 0) s = '<' + s
			else s = s + '>'

			if(toggleRun) fill(255)
			else fill(255, 0, 0)
			stroke(0)
			textSize(options.players.bodyRadius * options.renderScale * 1.5)
			text(s, 0, options.players.bodyRadius * options.renderScale*2)
		}
		pop()
	}
}