
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
    //  load images
    img_kit_atk = loadImage('src/assets/img/kits/team-atk-kit.png')
    img_kit_atk_gk = loadImage('src/assets/img/kits/team-atk-kit-gk.png')
    img_kit_def = loadImage('src/assets/img/kits/team-def-kit.png')
    img_kit_def_gk = loadImage('src/assets/img/kits/team-def-kit-gk.png')
    img_ball = loadImage('src/assets/img/ball.png')
    img_offside_flag = loadImage('src/assets/img/offside-flag.png')

    //  load sounds
    sound_whistle = createAudio('src/assets/sfx/whistle.mp3')
    sound_ballkick = createAudio('src/assets/sfx/ball-kick.mp3')
}
function setup() {
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
    putPlayersOnPitch(options.playersInitialPosition)

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

    //  change all players position
    else if(key == 'r'){
        let mode = prompt(`
            Type players position mode number below:\n
            0 - All players stand completely random
            1 - Each team has random formation on own side
            2 - All players random on attackers team side
            3 - All players random on defenders team side
            4 - Everyone starts on bench
        `)

        if(mode == null) return
        putPlayersOnPitch(parseInt(mode) || options.playersInitialPosition)
    }
}
