var width = 960,
    height = 500;
var items = ["680", "470", "107", "73", "66", "10", "9", "9", "8", "2"];

var count = -1;

//var nodes = d3.range(11).map(function(d) { return {radius: d.index + Math.random() * 50 + 20}; }),
var nodes = d3.range(10).map(function() { count++; return {radius:  parseInt(items[count])/8 + 30}; }),
    root = nodes[0],
    color = d3.scale.category10();

var para = document.createElement("p");

root.radius = 0;
root.fixed = true;

var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : -1500; })
    .nodes(nodes)
    .size([width, height]);

force.start();

var svg = d3.select("#collision").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("circle")
    .data(nodes.slice(1))
  .enter().append("circle")
    .attr("r", function(d) { return items[d.index - 1]/8 + 30; })
    .style("fill", function(d, i) { return color(i % 10); });

svg.selectAll("text")
    .data(nodes.slice(1))
  .enter().append("text")
    .attr("r", function(d) { return items[d.index - 1]/8 + 30; })
    .style("fill", function(d, i) { return color(i % 3); });


force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  svg.selectAll("text")
      .attr("x", function(d) {
        if(items[d.index - 1].length < 2)
        {
         return d.x - 5;
        }
        else if(items[d.index - 1].length < 3)
        {
          return d.x - 10;
        }
        else
        {
          return d.x - 15;
        }
        console.log(d.index.length)
       })
      .attr("y", function(d) { return d.y + 5; })
      .style("fill", "FFF")
      .style("font-family", "sans-serif")
      .style("font-size", "30px");
});

svg.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

svg.on("mouseenter", function() {
  svg.selectAll("circle").transition().delay(100).duration(2000).attr("r", function(d){return items[d.index - 1]/10 + 20;});
  svg.selectAll("text").each(function(d){d3.select(this).transition().delay(100).duration(2000).tween( 'text', tweenText(parseInt(items[d.index - 1])))});
});

function tweenText( newValue ) {
  return function() {
    var currentValue = +this.textContent;

    var i = d3.interpolateRound( currentValue, newValue );

    return function(t) {
      this.textContent = i(t);
    };
  }
}


svg.on("mouseleave", function() {
  svg.selectAll("circle").transition().delay(100).duration(2000).attr("r", 20).ease("elastic");
  //svg.selectAll("text").transition().delay(100).duration(2000).text(0);
  svg.selectAll("text").each(function(d){d3.select(this).transition().delay(100).duration(1000).tween( 'text', tweenText(parseInt(0)))});
});

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}
