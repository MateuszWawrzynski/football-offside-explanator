class OffsideLine {
	constructor(){
		this.visibility = false
		this.posX = Infinity
	}
	
	render(){
		push()
		strokeWeight(2)
		stroke(options.offside.lineColor)
		
		let lastDefenderX = null
		for(let p of players){
			if(p.team == TEAM_DEF && !p.isGK && p.pos.x + options.players.bodyRadius > lastDefenderX){
				lastDefenderX = p.pos.x + options.players.bodyRadius
			}
		}

		if(ball.pos.x + options.players.bodyRadius + options.ball.radius > lastDefenderX){
			lastDefenderX = ball.pos.x + options.players.bodyRadius + options.ball.radius
		}
		
		this.posX = Math.max(width/2, lastDefenderX)
		line(this.posX, 0, this.posX, height)
		pop()
	}
}