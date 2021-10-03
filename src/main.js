
let field
let ball
let players = []
let offsideLine

let sound_whistle
let sound_ballkick

let img_kit_def
let img_kit_def_gk
let img_kit_atk
let img_kit_atk_gk
let img_ball
let img_offside_flag

let selectedPlayer = undefined
let toggleRun = false

function preload(){
    img_kit_atk = loadImage('src/assets/img/kits/team-atk-kit.png')
    img_kit_atk_gk = loadImage('src/assets/img/kits/team-atk-kit-gk.png')
    img_kit_def = loadImage('src/assets/img/kits/team-def-kit.png')
    img_kit_def_gk = loadImage('src/assets/img/kits/team-def-kit-gk.png')
    img_ball = loadImage('src/assets/img/ball.png')
    img_offside_flag = loadImage('src/assets/img/offside-flag.png')
}
function setup() {
    //  add whistle sound
    sound_whistle = createAudio('src/assets/sfx/whistle.mp3')
    sound_ballkick = createAudio('src/assets/sfx/ball-kick.mp3')

    //  adjust renderScale to fit to the window
    options.renderScale = (window.innerHeight * .9) / options.env.fieldHeight
    
    createCanvas(
        (options.env.fieldWidth + options.env.fieldOffset*2) * options.renderScale, 
        (options.env.fieldHeight + options.env.fieldOffset*2) * options.renderScale
    )
    
    //  create field
    field = new Field()

    //  add players
    // attackers
    for(let a = 0; a < 11; a++){
        if(a == 0) players.push(new Player(createVector(width/25, height/2), TEAM_ATK, a+1, true))
        else players.push(new Player(createVector(0, 0), TEAM_ATK, a+1))
    }
    // defenders
    for(let a = 0; a < 11; a++){
        if(a == 0) players.push(new Player(createVector(width-width/25, height/2), TEAM_DEF, a+1, true))
        else players.push(new Player(createVector(0, 0), TEAM_DEF, a+1))
    }

    //  set players positions
    if(options.playersInitialPosition == INIT_POS_RANDOM){
        for(let p of players){
            if(p.isGK) continue;
            p.pos = createVector(
                random(options.env.fieldOffset*2, width - options.env.fieldOffset*2),
                random(options.env.fieldOffset*2, height - options.env.fieldOffset*2)
            )
        }
    }
    else if(options.playersInitialPosition == INIT_POS_OWN_HALF){
        for(let p of players){
            if(p.isGK) continue;
            if(p.team == TEAM_ATK){
                p.pos = createVector(
                    random(options.env.fieldOffset*2, width/2 - options.env.fieldOffset*2),
                    random(options.env.fieldOffset*2, height - options.env.fieldOffset*2)
                )
            }
            else if(p.team == TEAM_DEF){
                p.pos = createVector(
                    random(width/2 + options.env.fieldOffset*2, width - options.env.fieldOffset*2),
                    random(options.env.fieldOffset*2, height - options.env.fieldOffset*2)
                )
            } 
        }
    }
    else if(options.playersInitialPosition == INIT_POS_ATK_HALF){
        for(let p of players){
            if(p.isGK) continue;
            p.pos = createVector(
                random(options.env.fieldOffset*2, width/2 - options.env.fieldOffset*2),
                random(options.env.fieldOffset*2, height - options.env.fieldOffset*2)
            )
        }
    }
    else if(options.playersInitialPosition == INIT_POS_DEF_HALF){
        for(let p of players){
            if(p.isGK) continue;
            p.pos = createVector(
                random(width/2 + options.env.fieldOffset*2, width - options.env.fieldOffset*2),
                random(options.env.fieldOffset*2, height - options.env.fieldOffset*2)
            )
        }
    }
    else if(options.playersInitialPosition == INIT_POS_BENCH){
        for(let p of players){
            if(p.isGK) continue;
            if(p.team == TEAM_ATK){
                p.pos = createVector(
                    (width/7) + p.number * (options.players.bodyRadius * options.renderScale*2.5),
                    options.env.fieldOffset/3*2
                )
            }
            else if(p.team == TEAM_DEF){
                p.pos = createVector(
                    (width-width/7) - p.number * (options.players.bodyRadius * options.renderScale*2.5),
                    options.env.fieldOffset/3*2
                )
            }
        }
    }
    

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

	//	update ball position and render it
	ball.move()
	ball.render()

    //  calculate and render offside line
    offsideLine.calculate()
    if(offsideLine.visibility)
        offsideLine.render()
}

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

    //  toggle the players automatic movement
    else if(key == 's'){
        toggleRun = !toggleRun
    }
}
