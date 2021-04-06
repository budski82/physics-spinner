let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine = Engine.create();
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    wireframes: false
  }
});
let world = engine.world;

Engine.run(engine);
Render.run(render);

 
const width = 50,
  height = 10,
  gap = 100;
 
function animate() {
  let direction;
  for (let i = 0; i < rectangles.length; i++) {
    if (Math.floor(i / 20) % 2) direction = -1;
    else direction = 1;
    Body.rotate(rectangles[i], direction * .05)
  };
 
  for (let i = 0; i < shelves.length; i++) {
    Body.translate(shelves[i], {
      x: 0,
      y: -1
    });
    if (shelves[i].position.y < 0) Body.translate(shelves[i], {
      x: 0,
      y: 600
    });
  }
  window.requestAnimationFrame(animate);
}
 
let canvas = document.getElementById('myCanvas');
canvas.onclick = function() {
  let object;
  if (Math.random() > .5)
    object = Bodies.circle(200, 0, 20)
  else
    object = Bodies.rectangle(200, 0, 30, 30);
  World.add(engine.world, object);
}
 
const rectangles = [];
let shelves = [];
for (let i = 0; i < 4; i++) {
  rectangle = Bodies.rectangle(50, i * 150, width, height, {
    isStatic: true
  });
  shelves.push(rectangle);
}
for (let rows = 2; rows < 4; rows++)
  for (let i = 2; i < 12; i++) {
    let rectangle = Bodies.rectangle(i * width + gap * (rows % 2), rows * gap, width, height, {
      isStatic: true
    });
    let rectangle2 = Bodies.rectangle(i * width + gap * (rows % 2), rows * gap, height, width, {
      isStatic: true
    });
    rectangles.push(rectangle, rectangle2);
  }
 
World.add(world, shelves);
World.add(engine.world, rectangles);
 
World.add(engine.world, [
  Bodies.rectangle(125, 520, 100, 10, {
    isStatic: true,
    angle: -Math.PI * 0.14
  }),
  Bodies.rectangle(20, 300, 10, 600, {
    isStatic: true
  }),
  Bodies.rectangle(65, 100, 100, 10, {
    isStatic: true,
    angle: -Math.PI * 0.14
  }),
]);
 
window.requestAnimationFrame(animate);