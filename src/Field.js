class Field {
	render(){
		this.renderCorners()
		this.renderOffsets()
		this.renderFieldBorders()
		this.renderLeftPenaltyBox()
		this.renderRightPenaltyBox()
		this.renderMiddleCircle()
		this.renderGoals()
		// == decorations...? ==
	}

	renderCorners(){
		push()
		stroke(options.env.fieldLinesColor)
		strokeWeight(options.env.fieldLinesSize)
		noFill()
		ellipse(options.env.fieldOffset, options.env.fieldOffset, options.env.cornersRadius*2)
		ellipse(width-options.env.fieldOffset, options.env.fieldOffset, options.env.cornersRadius*2)
		ellipse(options.env.fieldOffset, height-options.env.fieldOffset, options.env.cornersRadius*2)
		ellipse(width-options.env.fieldOffset, height-options.env.fieldOffset, options.env.cornersRadius*2)
		pop()
	}
	renderOffsets(){
		push()
		rectMode(CORNER)
		noStroke()
		fill(options.env.fieldGrassColorOut)
		rect(0, 0, width, options.env.fieldOffset)
		rect(0, 0, options.env.fieldOffset, height)
		rect(width-options.env.fieldOffset, 0, width-options.env.fieldOffset, height)
		rect(0, height-options.env.fieldOffset, width-options.env.fieldOffset, height-options.env.fieldOffset)
		pop()
	}
	renderFieldBorders(){
		push()
		stroke(options.env.fieldLinesColor)
		strokeWeight(options.env.fieldLinesSize)
		line(options.env.fieldOffset, options.env.fieldOffset, options.env.fieldOffset, height-options.env.fieldOffset)
		line(options.env.fieldOffset, options.env.fieldOffset, width-options.env.fieldOffset, options.env.fieldOffset)
		line(options.env.fieldOffset, height-options.env.fieldOffset, width-options.env.fieldOffset, height-options.env.fieldOffset)
		line(width-options.env.fieldOffset, height-options.env.fieldOffset, width-options.env.fieldOffset, options.env.fieldOffset)
		pop()
	}
	renderLeftPenaltyBox(){
		push()
		fill(options.env.fieldGrassColor)
		stroke(options.env.fieldLinesColor)
		strokeWeight(options.env.fieldLinesSize)
		rectMode(CENTER)
		
		// left penalty kick circle
		ellipse((options.env.penaltyKickDist * options.renderScale) + options.env.fieldOffset, height/2, options.env.penaltyCircleRadius * options.renderScale*2)
		// left penalty box borders
		rect(((options.env.penaltyBoxWidth/2) * options.renderScale) + options.env.fieldOffset, 
			height/2, 
			options.env.penaltyBoxWidth * options.renderScale, 
			options.env.penaltyBoxHeight * options.renderScale
		)
		// left goal box
		rect(((options.env.goalBoxWidth/2) * options.renderScale) + options.env.fieldOffset, 
			height/2, 
			options.env.goalBoxWidth * options.renderScale, 
			options.env.goalBoxHeight * options.renderScale
		)
		// left penalty kick point
		ellipse((options.env.penaltyKickDist * options.renderScale) + options.env.fieldOffset, height/2, 2)
		pop()
	}
	renderRightPenaltyBox(){
		push()
		fill(options.env.fieldGrassColor)
		stroke(options.env.fieldLinesColor)
		strokeWeight(options.env.fieldLinesSize)
		rectMode(CENTER)

		// right penalty kick circle
		ellipse((width-options.env.penaltyKickDist * options.renderScale) - options.env.fieldOffset, height/2, options.env.penaltyCircleRadius * options.renderScale*2)
		// right penalty box borders
		rect((width-(options.env.penaltyBoxWidth/2) * options.renderScale) - options.env.fieldOffset, 
			height/2, 
			options.env.penaltyBoxWidth * options.renderScale, 
			options.env.penaltyBoxHeight * options.renderScale
		)
		// right goal box
		rect((width-(options.env.goalBoxWidth/2) * options.renderScale) - options.env.fieldOffset, 
			height/2, 
			options.env.goalBoxWidth * options.renderScale, 
			options.env.goalBoxHeight * options.renderScale
		)
		// right penalty kick point
		ellipse((width-options.env.penaltyKickDist * options.renderScale) - options.env.fieldOffset, height/2, 2)
		pop()
	}
	renderMiddleCircle(){
		push()
		noFill()
		stroke(options.env.fieldLinesColor)
		strokeWeight(options.env.fieldLinesSize)
		line(width/2, options.env.fieldOffset, width/2, height-options.env.fieldOffset)
		ellipse(width/2, height/2, options.env.middleCircleRadius * options.renderScale*2)
		ellipse(width/2, height/2, 4)
		pop()
	}
	renderGoals(){
		push()
		noStroke()
		fill(options.env.goalNetColor)
		rectMode(CENTER)
		rect(options.env.fieldOffset-options.env.goalWidth/2, height/2, options.env.goalWidth, options.env.goalHeight)
		rect(width-options.env.fieldOffset+options.env.goalWidth/2, height/2, options.env.goalWidth, options.env.goalHeight)
		pop()
	}
}