let font, grammar, json;
let lines = ["click to", "generate", "a post-digital poem"];

function setup() {
  createCanvas(650, 200);
  textAlign(CENTER);
  loadFont("Resagokr.otf", (f) => textFont(f, 30));

  grammar = RiTa.grammar(poem); // from grammar.js
}

function draw() {
  background(230, 240, 255);
  text(lines[0], width / 2, 75);
  text(lines[1], width / 2, 110);
  text(lines[2], width / 2, 145);
}

function mouseReleased() {
  let result = grammar.expand();

  // split on the % char output from the grammar
  lines = result.split("%");
}
