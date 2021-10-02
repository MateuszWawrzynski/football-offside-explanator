class OffsideLine {
	constructor(){
		this.visibility = false
		this.posX = 0
	}
	
	render(){
		push()
		strokeWeight(2)
		stroke(options.offsideLine.color)
		
		let lastDefenderX = null
		for(let p of players){
			if(p.team == TEAM_DEF && !p.isGK && p.pos.x > lastDefenderX){
				lastDefenderX = p.pos.x
			}
		}
		
		this.posX = lastDefenderX + options.players.bodyRadius
		line(this.posX, 0, this.posX, height)
		pop()
	}
}