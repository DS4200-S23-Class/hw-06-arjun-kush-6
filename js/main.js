// Define the dimensions and margins for the scatterplots and bar chart
const VIS_HEIGHT = 400;
const VIS_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};
const FRAME_HEIGHT = VIS_HEIGHT + MARGINS.top + MARGINS.bottom;
const FRAME_WIDTH = VIS_HEIGHT + MARGINS.top + MARGINS.bottom;


const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");

// Load the iris dataset
d3.csv("data/iris.csv").then(function(data) {
  
  // Finding MAX X and Y values
  const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
  const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

  const X_SCALE = d3.scaleLinear()
                    .domain([0, MAX_X+1])
                    .range([MARGINS.left, VIS_WIDTH]);

  const Y_SCALE = d3.scaleLinear()
                    .domain([0, MAX_Y+1])
                    .range([VIS_HEIGHT, MARGINS.bottom]);

  // adding x-axis
  FRAME1.append("g") 
          .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
          .call(d3.axisBottom(X_SCALE)) 
          .attr("class", "axes-font");

  FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
          .call(d3.axisLeft(Y_SCALE)) 
          .attr("class", "axes-font");

  FRAME1.append("text")
        .attr("x", FRAME_WIDTH / 2)
        .attr("y", MARGINS.top / 2)
        .text("Petal_Length vs Sepal_Length");

  FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return X_SCALE(d.Sepal_Length); })
        .attr("cy", function(d) { return Y_SCALE(d.Petal_Length); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";})


      });