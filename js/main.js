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

  FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return X_SCALE(d.Sepal_Length); })
        .attr("cy", function(d) { return Y_SCALE(d.Petal_Length); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";});



      });

const FRAME2 = d3.select("#vis2") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");

// Load the iris dataset
d3.csv("data/iris.csv").then(function(data) {
  
  // Finding MAX X and Y values
  const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
  const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

  const X_SCALE = d3.scaleLinear()
                    .domain([0, MAX_X+1])
                    .range([MARGINS.left, VIS_WIDTH]);

  const Y_SCALE = d3.scaleLinear()
                    .domain([0, MAX_Y+1])
                    .range([VIS_HEIGHT, MARGINS.bottom]);

  // adding x-axis
  FRAME2.append("g") 
          .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
          .call(d3.axisBottom(X_SCALE)) 
          .attr("class", "axes-font");

  FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
          .call(d3.axisLeft(Y_SCALE)) 
          .attr("class", "axes-font");

  FRAME2.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return X_SCALE(d.Sepal_Width); })
        .attr("cy", function(d) { return Y_SCALE(d.Petal_Width); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";})

  const brush = d3.brush().extent([
  [0, 0],
  [FRAME_WIDTH, FRAME_HEIGHT],]);

  // Call the brushed function
  brush.on("start brush", brushed);

  // Add the brush to the plot
  FRAME2.call(brush).on("start brush", brushed);

  // Define the brushed function
  function brushed(event) {
    // Get the selection from the brush
    const selection = event.selection;
    console.log(selection)

    // If the selection is null, clear the brush
    if (!selection) {
      FRAME2.selectAll("point").classed("selected", false);
    } else {
      // Get the selected data points
      const selectedData = data.filter(
        (d) =>
          X_SCALE(d.Sepal_Width) >= selection[0][0] &&
          X_SCALE(d.Sepal_Width) <= selection[1][0] &&
          Y_SCALE(d.Petal_Width) >= selection[0][1] &&
          Y_SCALE(d.Petal_Width) <= selection[1][1]
      );

      console.log(selectedData)

      //Add the selected class to the selected data points
      FRAME2.selectAll("circle").classed("selected", (d) => {return selectedData.includes(d)});
      FRAME1.selectAll("circle").classed("selected", (d) => {return selectedData.includes(d)});
      //FRAME2.selectAll("point").attr("class","selected")

    }
  }








      });


function draw_barchart(){
  const FRAME3 = d3.select("#vis3") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");

  const BAR_DATA = [{Species: "virginica", Count: 50},
                    {Species: "versicolor", Count: 50},
                    {Species: "setosa", Count: 50}];

  const MAX_X = d3.max(BAR_DATA, (d) => { return parseInt(d.Species); });
  const MAX_Y = d3.max(BAR_DATA, (d) => { return parseInt(d.Count); });

  
  // Set the ranges and scales for the x-axis and y-axis
  const X_Scale = d3.scaleBand()
                    .range([MARGINS.left, VIS_WIDTH])
                    .padding(0.3);
  const Y_Scale = d3.scaleLinear()
                    .range([VIS_HEIGHT, MARGINS.bottom]);

  // Map the data to the x and y domains
  X_Scale.domain(BAR_DATA.map(function(d) { return d.Species; }));
  Y_Scale.domain([0, d3.max(BAR_DATA, function(d) { return +d.Count; })+1]);

  // Add x-axis
  FRAME3.append("g") 
        .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
        .call(d3.axisBottom(X_Scale)) 
        .attr("class", "axes-font"); 

  // Add y-axis
  FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
        .call(d3.axisLeft(Y_Scale)) 
        .attr("class", "axes-font");

  // Add the bars to the chart
  FRAME3.selectAll("bar")
        .data(BAR_DATA)
        .enter().append("rect")
        .attr("x", function(d) { return X_Scale(d.Species); })
        .attr("y", function(d) { return Y_Scale(d.Count); })
        .attr("width", X_Scale.bandwidth())
        .attr("height", function(d) { return VIS_HEIGHT - Y_Scale(d.Count); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";});


};

draw_barchart();




