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
		stroke(options.fieldLinesColor)
		strokeWeight(options.fieldLinesSize)
		noFill()
		ellipse(options.fieldOffset, options.fieldOffset, options.cornersRadius*2)
		ellipse(width-options.fieldOffset, options.fieldOffset, options.cornersRadius*2)
		ellipse(options.fieldOffset, height-options.fieldOffset, options.cornersRadius*2)
		ellipse(width-options.fieldOffset, height-options.fieldOffset, options.cornersRadius*2)
		pop()
	}
	renderOffsets(){
		push()
		rectMode(CORNER)
		noStroke()
		fill(options.fieldGrassColorOut)
		rect(0, 0, width, options.fieldOffset)
		rect(0, 0, options.fieldOffset, height)
		rect(width-options.fieldOffset, 0, width-options.fieldOffset, height)
		rect(0, height-options.fieldOffset, width-options.fieldOffset, height-options.fieldOffset)
		pop()
	}
	renderFieldBorders(){
		push()
		stroke(options.fieldLinesColor)
		strokeWeight(options.fieldLinesSize)
		line(options.fieldOffset, options.fieldOffset, options.fieldOffset, height-options.fieldOffset)
		line(options.fieldOffset, options.fieldOffset, width-options.fieldOffset, options.fieldOffset)
		line(options.fieldOffset, height-options.fieldOffset, width-options.fieldOffset, height-options.fieldOffset)
		line(width-options.fieldOffset, height-options.fieldOffset, width-options.fieldOffset, options.fieldOffset)
		pop()
	}
	renderLeftPenaltyBox(){
		push()
		fill(options.fieldGrassColor)
		stroke(options.fieldLinesColor)
		strokeWeight(options.fieldLinesSize)
		rectMode(CENTER)
		
		// left penalty kick circle
		ellipse((options.penaltyKickDist * options.renderScale) + options.fieldOffset, height/2, options.penaltyCircleRadius * options.renderScale*2)
		// left penalty box borders
		rect(((options.penaltyBoxWidth/2) * options.renderScale) + options.fieldOffset, 
			height/2, 
			options.penaltyBoxWidth * options.renderScale, 
			options.penaltyBoxHeight * options.renderScale
		)
		// left goal box
		rect(((options.goalBoxWidth/2) * options.renderScale) + options.fieldOffset, 
			height/2, 
			options.goalBoxWidth * options.renderScale, 
			options.goalBoxHeight * options.renderScale
		)
		// left penalty kick point
		ellipse((options.penaltyKickDist * options.renderScale) + options.fieldOffset, height/2, 2)
		pop()
	}
	renderRightPenaltyBox(){
		push()
		fill(options.fieldGrassColor)
		stroke(options.fieldLinesColor)
		strokeWeight(options.fieldLinesSize)
		rectMode(CENTER)

		// right penalty kick circle
		ellipse((width-options.penaltyKickDist * options.renderScale) - options.fieldOffset, height/2, options.penaltyCircleRadius * options.renderScale*2)
		// right penalty box borders
		rect((width-(options.penaltyBoxWidth/2) * options.renderScale) - options.fieldOffset, 
			height/2, 
			options.penaltyBoxWidth * options.renderScale, 
			options.penaltyBoxHeight * options.renderScale
		)
		// right goal box
		rect((width-(options.goalBoxWidth/2) * options.renderScale) - options.fieldOffset, 
			height/2, 
			options.goalBoxWidth * options.renderScale, 
			options.goalBoxHeight * options.renderScale
		)
		// right penalty kick point
		ellipse((width-options.penaltyKickDist * options.renderScale) - options.fieldOffset, height/2, 2)
		pop()
	}
	renderMiddleCircle(){
		push()
		noFill()
		stroke(options.fieldLinesColor)
		strokeWeight(options.fieldLinesSize)
		line(width/2, options.fieldOffset, width/2, height-options.fieldOffset)
		ellipse(width/2, height/2, options.middleCircleRadius * options.renderScale*2)
		ellipse(width/2, height/2, 4)
		pop()
	}
	renderGoals(){
		push()
		noStroke()
		fill(options.goalNetColor)
		rectMode(CENTER)
		rect(options.fieldOffset-options.goalWidth/2, height/2, options.goalWidth, options.goalHeight)
		rect(width-options.fieldOffset+options.goalWidth/2, height/2, options.goalWidth, options.goalHeight)
		pop()
	}
}