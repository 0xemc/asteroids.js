function start() {
  let app = new PIXI.Application({
    width: 600,
    height: 600,
    antialias: true
  });
  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  var stage = app.stage;

  //load an image and run the `setup` function when it's done
  PIXI.loader
    .add("res/spaceship.png")
    .load(setup);

  //This `setup` function will run when the image has loaded
  function setup() {

    //Create the cat sprite
    let ship = new PIXI.Sprite(PIXI.loader.resources["res/spaceship.png"].texture);

    //Add the cat to the stage
    app.stage.addChild(ship);
  }
}