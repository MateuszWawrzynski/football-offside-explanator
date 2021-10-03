class OffsideLine {
	constructor(){
		this.visibility = false
		this.posX = Infinity
	}

	calculate(){
		let lastDefenderX = 0
		
		//	get position of last defender
		for(let p of players){
			if(p.team == TEAM_DEF && !p.isGK && p.pos.x + options.players.bodyRadius > lastDefenderX){
				lastDefenderX = p.pos.x + options.players.bodyRadius
			}
		}

		//	check if ball is 'last defender'
		if(ball.pos.x + options.players.bodyRadius + options.ball.radius > lastDefenderX){
			lastDefenderX = ball.pos.x + options.players.bodyRadius + options.ball.radius
		}
		
		//	attacking player can't be offside if stands on his own pitch half
		this.posX = Math.max(width/2, lastDefenderX)
	}
	
	render(){
		push()
		strokeWeight(2)
		stroke(options.offside.lineColor)
		line(this.posX, 0, this.posX, height)
		image(img_offside_flag, this.posX, 0, options.players.bodyRadius * options.renderScale, options.players.bodyRadius * options.renderScale)
		pop()
	}
}