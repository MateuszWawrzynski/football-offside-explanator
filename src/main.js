
let field


function setup() {
    createCanvas(
        (options.fieldWidth + options.fieldOffset*2) * options.renderScale, 
        (options.fieldHeight + options.fieldOffset*2) * options.renderScale
    )
    
    //  objects to render
    field = new Field()
}

function draw() {
    background(options.fieldGrassColor)
    field.render();
}
