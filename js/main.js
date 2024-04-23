// // Load the JSON data from file
// d3.json("data/wordcloud_data.json").then(function(wordCloudData) {
//     // Create a color scale
//     var colorScale = d3.scaleLinear()
//         .domain([d3.min(wordCloudData, d => d.size), d3.max(wordCloudData, d => d.size)])
//         .range(["black", "white"]); // Define your color range here

//     // Create word cloud using word frequency data and color scale
//     var layout = d3.layout.cloud()
//         .size([800, 400]) // Specify the size of the word cloud
//         .words(wordCloudData) // Pass the data to the layout
//         .padding(5) // Padding between words
//         .rotate(function() { return ~~(Math.random() * 2) * 90; }) // Rotate words randomly
//         .font("Arial") // Font for the words
//         .fontSize(function(d) { return d.size; }); // Set font size based on word frequency

//     layout.start();

//     // Append an SVG element for the word cloud
//     d3.select("#word-cloud").append("svg")
//         .attr("width", 800)
//         .attr("height", 400)
//         .append("g")
//         .attr("transform", "translate(400,200)") // Center the word cloud
//         .selectAll("text")
//         .data(wordCloudData)
//         .enter().append("text")
//         .style("font-size", function(d) { return d.size + "px"; }) // Set font size
//         .style("fill", function(d) { return colorScale(d.size); }) // Set fill color
//         .attr("text-anchor", "middle")
//         .attr("transform", function(d) {
//             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//         })
//         .text(function(d) { return d.text; }); // Set the text of each word
// });
