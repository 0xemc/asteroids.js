var app = new PIXI.Application(800,800)

// 2. Append canvas element to the body
document.body.appendChild(app.view);

var shipsize = 15;

function start(){
  var ship = new Ship(0,app.view.width/2,app.view.height/2,0,0);
  app.ticker.add(delta => render(ship));
}

function render(ship){
  resetStage()
  // ship.rotate(0.01)
  ship.move(0,-1);
  ship.draw()
}

function drawCircle(x, y, size){
    var circle = new PIXI.Graphics();
    circle.lineStyle(1, 0xFFFFFF, 1);
    // draw circle (x, y, radius)
    circle.drawCircle(x, y, size);
    app.stage.addChild(circle);
}

function drawTriangle(x,y){
    // 4d. Create a triangle
    var triangle = new PIXI.Graphics();
    triangle.lineStyle(1, 0xFFFFFF, 1);
    triangle.moveTo(x+shipsize,y+shipsize);
    triangle.lineTo(x, y-shipsize);
    triangle.lineTo(x-shipsize, y+shipsize);
    triangle.lineTo(x+shipsize, y+shipsize);
    
    app.stage.addChild(triangle);
}

function resetStage(){
  app.stage.children.forEach(function blah(child) {
    app.stage.removeChild(child);
  });
}


function drawTriangle(matrix){
  // 4d. Create a triangle
  var triangle = new PIXI.Graphics();
  triangle.lineStyle(1, 0xFFFFFF, 1);
  triangle.moveTo(matrix.a, matrix.b);
  triangle.lineTo(matrix.c, matrix.d);
  triangle.lineTo(matrix.tx, matrix.ty);
  triangle.lineTo(matrix.a, matrix.b);
  
  app.stage.addChild(triangle);
}

class Ship {
  constructor(angle,xPos,yPos,xVec,yVec){
    this.angle = angle;
    this.centerx = xPos;
    this.centery = yPos;
    this.matrix =  new PIXI.Matrix(xPos+shipsize,yPos+shipsize,xPos,yPos-shipsize, xPos-shipsize,yPos+shipsize);
    this.xVec = xVec;
    this.yVec = yVec;
  };

  draw(){
    // drawTriangle(this.center.tx, this.center.ty)
    drawTriangle(this.matrix);
  };

  rotate(degrees){
    this.angle += degrees;
    this.move(-this.centerx, -this.centery)
    this.matrix.rotate(this.angle)
    this.move(this.centerx, this.centery)
  }

  move(x,y){
    this.matrix.a += x;
    this.matrix.b += y;
    this.matrix.c += x;
    this.matrix.d += y;
    this.matrix.tx += x;
    this.matrix.ty += y;
    this.matrix.set(this.matrix.a+x,this.matrix.b+y,this.matrix.c+x,this.matrix.d+y,this.matrix.tx+x, this.matrix.ty+y)
  }
}

// Ship.prototype = {
//   centerx : function(){
//     return this.center.a - shipsize;
//   },

//   centery: function() {
//     return this.center.b - shipsize;
//   }
// }