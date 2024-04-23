// // Fetch and parse heatmapData.json
// fetch('data/heatmapData.json')
//   .then(response => response.json())
//   .then(jsonData => {
//     //const heatmapData = [];

//     // Iterate over seasons
//     for (const index in jsonData) {
//       const seasonData = jsonData[seasonNum];

//       // Iterate over episodes in the season
//       for (const episodeNum in seasonData) {
//         const episode = seasonData[episodeNum];

//         // Get the episode title and number of lines spoken (count of quotes)
//         const episodeTitle = episode["title"];
//         const linesSpoken = jsonData[""]//Object.values(episode["scenes"]).reduce((acc, scene) => acc + scene.length, 0);

//         // Create an object for this episode and push to heatmapData
//         heatmapData.push({
//           seasonNum: parseInt(seasonNum),
//           episodeNum: parseInt(episodeNum),
//           episodeName: episodeTitle,
//           linesSpoken: linesSpoken,
//         });
//       }
//     }

//     //console.log(heatmapData);
//     console.log(jsonData);

//     const heatMap = new HeatMap(heatmapData);
//   })
//   .catch(error => console.error('Error fetching heatmapData.json:', error));

const heatmapData = [];
// Fetch and parse heatmapData.json
fetch('data/heatmapData.json')
  .then(response => response.json())
  .then(jsonData => {
   

    // Iterate over each object in the JSON array
    jsonData.forEach(episode => {
      const seasonNum = episode.seasonNum;
      const episodeNum = episode.episodeNum;
      const episodeName = episode.episodeName;
      const linesSpoken = episode.linesSpoken;

      // Create an object for this episode and push to heatmapData
      heatmapData.push({
        seasonNum: seasonNum,
        episodeNum: episodeNum,
        episodeName: episodeName,
        linesSpoken: linesSpoken,
      });
    });

    console.log(heatmapData);

    const heatMap = new HeatMap(heatmapData);
  })
  .catch(error => console.error('Error fetching heatmapData.json:', error));



class HeatMap {
  constructor() {
    this.config = {
      parentElement: "#heatmap",
      width: 1000,
      height: 400,
      margin: { top: 20, right: 20, bottom: 50, left: 50 },
    };

    this.initVis();
  }

  initVis() {
    const vis = this;

    vis.width =
      vis.config.width - vis.config.margin.left - vis.config.margin.right;
    vis.height =
      vis.config.height - vis.config.margin.top - vis.config.margin.bottom;

    vis.svg = d3
      .select(vis.config.parentElement)
      .append("svg")
      .attr("width", vis.config.width)
      .attr("height", vis.config.height)
      .append("g")
      .attr(
        "transform",
        `translate(${vis.config.margin.left},${vis.config.margin.top})`
      );

    vis.xScale = d3.scaleBand().range([0, vis.width]).padding(0.05);
    vis.yScale = d3.scaleBand().range([vis.height, 0]).padding(0.05);

    vis.xAxis = d3.axisBottom(vis.xScale).tickFormat((d) => `E${d}`);
    vis.yAxis = d3.axisLeft(vis.yScale).tickFormat((d) => `S${d}`);

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${vis.height})`);

    vis.yAxisGroup = vis.svg.append("g");

    vis.xAxisGroup.call(vis.xAxis);
    vis.yAxisGroup.call(vis.yAxis);

    vis.svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", vis.width / 2 + vis.config.margin.left)
      .attr("y", vis.height + vis.config.margin.bottom - 10)
      .text("Episode");

    vis.svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -vis.config.margin.left + 15)
      .attr("x", -vis.height / 2 + vis.config.margin.top)
      .text("Season");

    vis.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden");

    vis.updateVis();
  }

  updateVis() {
    const vis = this;
    vis.data = heatmapData;
  
    // Get unique episode and season numbers
    const episodeNumbers = [...new Set(vis.data.map(d => d.episodeNum))];
    const seasonNumbers = [...new Set(vis.data.map(d => d.seasonNum))];
  
    // Update domain of scales based on the unique episode and season numbers
    vis.xScale.domain(episodeNumbers);
    vis.yScale.domain(seasonNumbers);
  
    const rects = vis.svg
      .selectAll("rect")
      .data(vis.data, (d) => `${d.seasonNum}-${d.episodeNum}`);
  
    rects
      .join("rect")
      .attr("x", (d) => vis.xScale(d.episodeNum))
      .attr("y", (d) => vis.yScale(d.seasonNum))
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("width", vis.xScale.bandwidth())
      .attr("height", vis.yScale.bandwidth())
      .attr("fill", (d) => getColorForCharacterLines(d.linesSpoken))
      .on("mouseover", function (event, d) {
        d3.select(this)
            .attr("stroke-width", "2")
            .attr("stroke", "black");
        vis.tooltip
            .style("visibility", "visible")
            .html(`
                <div class="tooltip-title">S${d.seasonNum}E${d.episodeNum}: ${d.episodeName}</div>
                <div>${getTooltipContent(d.linesSpoken)}</div>
            `);
    })
      .on("mousemove", function (event) {
        vis.tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke-width", "0")
          .attr("stroke", "none");
        vis.tooltip.style("visibility", "hidden");
      });
  
    // Call the axes again to update them
    vis.xAxisGroup.call(vis.xAxis);
    vis.yAxisGroup.call(vis.yAxis);
  }
  
}

function getColorForCharacterLines(lines) {
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(heatmapData, d => d.linesSpoken)])
    .range(["#e0ecf4", "#08306b"]);

  return colorScale(lines);
}

function getTooltipContent(lines) {
  return `Lines Spoken: ${lines}`;
}

// const heatmapData = [
//   {
//     seasonNum: 1,
//     episodeNum: 1,
//     episodeName: "The Pilot",
//     linesSpoken: 150,
//   },
//   {
//     seasonNum: 1,
//     episodeNum: 2,
//     episodeName: "The One with the Sonogram at the End",
//     linesSpoken: 200,
//   },
//   // Add more episodes here
// ];


// Initialize an empty array to store the final data
// const heatmapData = [];

// // Iterate over seasons
// for (const seasonNum in jsonData) {
//   const seasonData = jsonData[seasonNum];
  
//   // Iterate over episodes in the season
//   for (const episodeNum in seasonData) {
//     const episode = seasonData[episodeNum];
    
//     // Get the episode title and number of lines spoken (count of quotes)
//     const episodeTitle = episode["title"];
//     const linesSpoken = Object.values(episode["scenes"]).reduce((acc, scene) => acc + scene.length, 0);
    
//     // Create an object for this episode and push to heatmapData
//     heatmapData.push({
//       seasonNum: parseInt(seasonNum.split(" ")[1]),
//       episodeNum: parseInt(episodeNum.split(" ")[1]),
//       episodeName: episodeTitle,
//       linesSpoken: linesSpoken,
//     });
//   }
// }

// console.log(heatmapData);

// const heatMap = new HeatMap();
