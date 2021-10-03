
let field
let ball
let players = []
let offsideLine

let whistle


function setup() {
    //  add whistle sound
    whistle = createAudio('src/assets/whistle.mp3')

    //  adjust renderScale to fit to the window
    options.renderScale = (window.innerHeight * .8) / options.env.fieldHeight
    
    createCanvas(
        (options.env.fieldWidth + options.env.fieldOffset*2) * options.renderScale, 
        (options.env.fieldHeight + options.env.fieldOffset*2) * options.renderScale
    )
    
    //  create field
    field = new Field()

    //  add players
    // attackers
    for(let a = 0; a < 11; a++){
        let posCalcX = (width/5) + a * (options.players.bodyRadius * options.renderScale*2.5)
        let posCalcY = options.env.fieldOffset/3*2
        if(a == 0) players.push(new Player(createVector(posCalcX, posCalcY), TEAM_ATK, a+1, true))
        else players.push(new Player(createVector(posCalcX, posCalcY), TEAM_ATK, a+1))
    }
    // defenders
    for(let a = 0; a < 11; a++){
        let posCalcX = (width-width/5) - a * (options.players.bodyRadius * options.renderScale*2.5)
        let posCalcY = options.env.fieldOffset/3*2
        if(a == 0) players.push(new Player(createVector(posCalcX, posCalcY), TEAM_DEF, a+1, true))
        else players.push(new Player(createVector(posCalcX, posCalcY), TEAM_DEF, a+1))
    }

    //  randomize players positions
    // for(let p of players){
    //     p.pos.x = random(width/10, width-width/10)
    //     p.pos.y = random(height/10, height-height/10)
    // }

	//	add ball and pass it to random player
	ball = new Ball(random(players))

    //  add offside line
    offsideLine = new OffsideLine()
}

function draw() {
    background(options.env.fieldGrassColor)
    
    //  render field
    field.render();
    
    //  render players
    for(let p of players){
		p.move()
        p.render()
    }

	//	render ball and update it position
	ball.move()
	ball.render()

    //  draw offside line
    if(offsideLine.visibility)
        offsideLine.render()
}

let selectedPlayer = undefined
function mouseClicked(){
    if(selectedPlayer){
		selectedPlayer.selected = false
		return selectedPlayer = undefined
	}
	
	for(let p of players){
        let d = dist(mouseX, mouseY, p.pos.x, p.pos.y)
		if(d <= options.players.bodyRadius){
			selectedPlayer = p
            return p.selected = true
        }
    }
}

function keyPressed(){
	//  ball passing
    if(key == 'e'){
		if(selectedPlayer){
			return
		}
		
		for(let p of players){
			let d = dist(mouseX, mouseY, p.pos.x, p.pos.y)
			if(p != ball.owner && d <= options.players.bodyRadius){
				return ball.pass(p)
			}
		}
	}

    //  player run option
    else if(keyCode == LEFT_ARROW){
        for(let p of players){
			let d = dist(mouseX, mouseY, p.pos.x, p.pos.y)
			if(d <= options.players.bodyRadius){
				return p.run(-1)
			}
		}
    }
    else if(keyCode == RIGHT_ARROW){
        for(let p of players){
			let d = dist(mouseX, mouseY, p.pos.x, p.pos.y)
			if(d <= options.players.bodyRadius){
				return p.run(1)
			}
		}
    }

    //  toggle the offside line rendering
    else if(key == 'f'){
        offsideLine.visibility = !offsideLine.visibility
    }
}
