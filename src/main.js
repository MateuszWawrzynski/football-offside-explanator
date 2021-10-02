
let field
let players = []


function setup() {
    createCanvas(
        (options.env.fieldWidth + options.env.fieldOffset*2) * options.renderScale, 
        (options.env.fieldHeight + options.env.fieldOffset*2) * options.renderScale
    )
    
    //  create field
    field = new Field()

    //  add players
    // defenders
    for(let a = 0; a < 11; a++){
        let posCalcX = (width/5) + a * (options.players.bodyRadius * options.renderScale*2.5)
        let posCalcY = options.env.fieldOffset/3*2
        if(a == 0) players.push(new Player(createVector(posCalcX, posCalcY), TEAM_DEF, a+1, true))
        else players.push(new Player(createVector(posCalcX, posCalcY), TEAM_DEF, a+1))
    }
    // attackers
    for(let a = 0; a < 11; a++){
        let posCalcX = (width-width/5) - a * (options.players.bodyRadius * options.renderScale*2.5)
        let posCalcY = options.env.fieldOffset/3*2
        if(a == 0) players.push(new Player(createVector(posCalcX, posCalcY), TEAM_ATK, a+1, true))
        else players.push(new Player(createVector(posCalcX, posCalcY), TEAM_ATK, a+1))
    }
}

function draw() {
    background(options.env.fieldGrassColor)
    
    //  render field
    field.render();
    
    //  render players
    for(let p of players){
        p.render()
    }
}
