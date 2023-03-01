// Define the dimensions and margins for the scatterplots and bar chart
const VIS_HEIGHT = 400;
const VIS_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};
const FRAME_HEIGHT = VIS_HEIGHT + MARGINS.top + MARGINS.bottom;
const FRAME_WIDTH = VIS_HEIGHT + MARGINS.top + MARGINS.bottom;

// Load the iris dataset
d3.csv("data/iris.csv").then(function(data) {

  // ----------- PLOT 1 : Petal_Length vs Sepal_Length -----------
  const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");
  
  // Finding MAX X and Y values for scatter plot 1
  const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
  const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

  // Scaling x and y axis
  const X_SCALE1 = d3.scaleLinear()
                    .domain([0, MAX_X1+1])
                    .range([MARGINS.left, VIS_WIDTH]);

  const Y_SCALE1 = d3.scaleLinear()
                    .domain([0, MAX_Y1+1])
                    .range([VIS_HEIGHT, MARGINS.bottom]);

  // adding x-axis
  FRAME1.append("g") 
          .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
          .call(d3.axisBottom(X_SCALE1)) 
          .attr("class", "axes-font");

  // adding y-axis
  FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
          .call(d3.axisLeft(Y_SCALE1)) 
          .attr("class", "axes-font");

  //plotting points for scatter plot 1
  FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return X_SCALE1(d.Sepal_Length); })
        .attr("cy", function(d) { return Y_SCALE1(d.Petal_Length); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";});

  
  // ----------- PLOT 2 : Petal_Width vs Sepal_Width -----------
  const FRAME2 = d3.select("#vis2") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");

  // Finding MAX X and Y values for scatter plot 2
  const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
  const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

  // Scaling x and y axis
  const X_SCALE2 = d3.scaleLinear()
                    .domain([0, MAX_X2+1])
                    .range([MARGINS.left, VIS_WIDTH]);

  const Y_SCALE2 = d3.scaleLinear()
                    .domain([0, MAX_Y2+1])
                    .range([VIS_HEIGHT, MARGINS.bottom]);

  // adding x-axis
  FRAME2.append("g") 
          .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
          .call(d3.axisBottom(X_SCALE2)) 
          .attr("class", "axes-font");

  // adding y-axis
  FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
          .call(d3.axisLeft(Y_SCALE2)) 
          .attr("class", "axes-font");

  //plotting points for scatter plot 2
  FRAME2.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return X_SCALE2(d.Sepal_Width); })
        .attr("cy", function(d) { return Y_SCALE2(d.Petal_Width); })
        .attr("class", d => {
                      if (d.Species === "setosa") return "setosa";
                      else if (d.Species === "versicolor") return "versicolor";
                      else if (d.Species === "virginica") return "virginica";})

  
  // ----------- PLOT 3 : Counts of Species -----------
  const FRAME3 = d3.select("#vis3") 
                  .append("svg") 
                  .attr("height", FRAME_HEIGHT)   
                  .attr("width", FRAME_WIDTH)
                  .attr("class", "frame");

  // Hardcoding data for bar chart 
  const BAR_DATA = [{Species: "virginica", Count: 50},
                    {Species: "versicolor", Count: 50},
                    {Species: "setosa", Count: 50}];
    
  // Set the ranges and scales for the x-axis and y-axis
  const X_SCALE3 = d3.scaleBand()
                      .range([MARGINS.left, VIS_WIDTH])
                      .padding(0.3);
  const Y_SCALE3 = d3.scaleLinear()
                      .range([VIS_HEIGHT, MARGINS.bottom]);

  // Map the data to the x and y domains
  X_SCALE3.domain(BAR_DATA.map(function(d) { return d.Species; }));
  Y_SCALE3.domain([0, d3.max(BAR_DATA, function(d) { return +d.Count; })+1]);

  // Add x-axis
  FRAME3.append("g") 
          .attr("transform", "translate(" + 0 + "," + VIS_HEIGHT + ")") 
          .call(d3.axisBottom(X_SCALE3)) 
          .attr("class", "axes-font"); 

  // Add y-axis
  FRAME3.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + "," + 0 + ")") 
          .call(d3.axisLeft(Y_SCALE3)) 
          .attr("class", "axes-font");

  // Add the bars to the chart
  FRAME3.selectAll("bar")
          .data(BAR_DATA)
          .enter().append("rect")
          .attr("x", function(d) { return X_SCALE3(d.Species); })
          .attr("y", function(d) { return Y_SCALE3(d.Count); })
          .attr("width", X_SCALE3.bandwidth())
          .attr("height", function(d) { return VIS_HEIGHT - Y_SCALE3(d.Count); })
          .attr("class", d => {
                        if (d.Species === "setosa") return "setosa";
                        else if (d.Species === "versicolor") return "versicolor";
                        else if (d.Species === "virginica") return "virginica";});



  // -------- Adding Brushing and Linking Functionality ---------
  const brush = d3.brush()
                  .extent([[0, 0], [FRAME_WIDTH, FRAME_HEIGHT]]);

  // Call the brushed function
  brush.on("start brush", brushed);

  // Add the brush to the plot
  FRAME2.call(brush).on("start brush", brushed);

  // Define the brushed function
  function brushed(event) {
    // Get the selection from the brush
    const selection = event.selection;

    // If the selection is null, clear the brush
    if (!selection) {
      FRAME2.selectAll("circle").classed("selected", false);
    } 
    else {
      // Get the selected data points
      const selectedData = data.filter(
        (d) =>
          X_SCALE2(d.Sepal_Width) >= selection[0][0] &&
          X_SCALE2(d.Sepal_Width) <= selection[1][0] &&
          Y_SCALE2(d.Petal_Width) >= selection[0][1] &&
          Y_SCALE2(d.Petal_Width) <= selection[1][1]
      );

      // Highlight the selected data points and corresponding points on other plots
      FRAME2.selectAll("circle").classed("selected", (d) => selectedData.includes(d));

      // Highlight the corresponding points on the plot
      FRAME1.selectAll("circle")
      .classed("selected", function(d) {
        return (selectedData.indexOf(d) !== -1)});

      // Highlight the corresponding species on bar chart
      FRAME3.selectAll("rect")
      .classed("selected", function(d) {
        return (selectedData.filter(function(e) {
          return (e.Species === d.Species);
        }).length !== 0);});
    }
  }
});
