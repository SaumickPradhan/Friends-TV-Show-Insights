

// Load the JSON data
d3.json("data/JsonRealemotions_friends.json").then(jsonData => {
  class ArcDiagram {
    constructor() {
      this.config = {
        parentElement: "#arcdiagram",
        width: 1200,
        height: 200,
        margin: { top: 40, right: 20, bottom: 0, left: 20 },
        
      };
      this.pieChartWidth = 200;
      this.pieChartHeight = 200;
      this.pieChartMargin = { top: 20, right: 20, bottom: 20, left: 20 };
  
      // Create a new instance of PieChart
      this.pieChart = new PieChart(
        "#pie-chart-container",
        this.pieChartWidth,
        this.pieChartHeight,
        this.pieChartMargin
      );

      this.initVis();
    }
    initVis() {
      const vis = this;
    
      vis.config = {
        parentElement: "#arcdiagram",
        width: 1200,
        height: 200,
        margin: { top: 40, right: 20, bottom: 0, left: 20 },
      };
    
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
    
        vis.svg
    .append("text")
    .attr("class", "arc-diagram-title")
    .attr("x", vis.width / 2)
    .attr("y", vis.config.margin.top+100)
    .attr("text-anchor", "middle")
    .text("Inter Character Interaction per Episode");

      vis.xScale = d3.scalePoint().range([0, vis.width]).padding(1);
    
      vis.line = d3
        .line()
        .curve(d3.curveNatural)
        .x((d) => d.x)
        .y((d) => d.y);
    
      vis.tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden");
    
      vis.detailSection = d3
        .select("body")
        .append("div")
        .attr("class", "detail-section")
        .style("visibility", "hidden");
        
    

    
      // Call updateVis initially
      vis.updateVis(1, 1); // Default to Season 1, Episode 1
    }
   
    updateVis(selectedSeason, selectedEpisode) {
      const vis = this;
    
      // Filter the data based on selected season and episode
      const filteredData = jsonData.filter(
        (d) => d.season === selectedSeason && d.episode === selectedEpisode
      );
    
      // Get characters present in the selected episode
      const charactersInEpisode = Array.from(
        new Set(filteredData.map((d) => d.speaker))
      );
    
      // Generate links between characters who appear in the same scene
      const links = [];
      charactersInEpisode.forEach((charA, i) => {
        charactersInEpisode.slice(i + 1).forEach((charB) => {
          // Check if characters appear together in any scene
          const scenesTogether = filteredData.filter(
            (d) => d.speaker === charA || d.speaker === charB
          );
          const uniqueScenes = Array.from(new Set(scenesTogether.map((d) => d.scene)));
          if (uniqueScenes.length > 0) {
            links.push({
              characterA: charA,
              characterB: charB,
              scenes: uniqueScenes,
            });
          }
        });
      });
    
      // Create the scale for placing nodes
      vis.xScale.domain(charactersInEpisode);
    
      // Function to calculate stroke width based on the number of scenes
      function getStrokeWidth(scenes) {
        if (scenes <= 1) return 1;
        if (scenes <= 2) return 2;
        if (scenes <= 3) return 3;
        if (scenes <= 4) return 4;
        if (scenes <= 5) return 5;
        return 6;
      }
    
      // Draw the nodes
      vis.svg
        .selectAll(".node")
        .data(charactersInEpisode)
        .join("text")
        .attr("class", "node")
        .attr("x", (d) => vis.xScale(d))
        .attr("y", vis.height / 2 + 25)
        .style("text-anchor", "middle")
        .text((d) => d)

      

        // .on("mouseover", function (event, d) {
        //   d3.select(this).attr("cursor", "default");
        //   vis.svg
        //     .selectAll(".link")
        //     .style("opacity", 0.1)
        //     .filter((link) => link.characterA === d || link.characterB === d)
        //     .style("opacity", 1);
    
        //   const connections = links.filter(
        //     (link) => link.characterA === d || link.characterB === d
        //   );
    
        //   let tooltipHtml = `<div class="tooltip-title">Connections for ${d}</div>`;
        //   connections.forEach((link) => {
        //     const otherCharacter = link.characterA === d ? link.characterB : link.characterA;
        //     tooltipHtml += `<div>${otherCharacter}: ${link.scenes.length} scenes</div>`;
        //   });
        //   vis.tooltip
        //     .style("visibility", "visible")
        //     .html(tooltipHtml)
        //     .style("top", `${d3.pointer(event)[1] + vis.config.margin.top}px`)
        //     .style("left", `${d3.pointer(event)[0] + vis.config.margin.left}px`);
    
        //   // Show detail section near the mouse pointer
        //   vis.detailSection
        //     .style("visibility", "visible")
        //     .html(`<div class="detail-title">Details for ${d}</div><div class="detail-content">Any additional details here for ${d}</div>`)
        //     .style("top", `${d3.pointer(event)[1] + vis.config.margin.top + 20}px`)
        //     .style("left", `${d3.pointer(event)[0] + vis.config.margin.left + 20}px`);
        // })
        .on("mouseover", function (event, d) {
          d3.select(this).attr("cursor", "default");
          vis.svg
              .selectAll(".link")
              .style("opacity", 0.1)
              .filter((link) => link.characterA === d || link.characterB === d)
              .style("opacity", 1);
      
          const connections = links.filter(
              (link) => link.characterA === d || link.characterB === d
          );
      
          let tooltipHtml = `<div class="tooltip-title">Connections for ${d}</div>`;
          connections.forEach((link) => {
              const otherCharacter = link.characterA === d ? link.characterB : link.characterA;
              tooltipHtml += `<div>${otherCharacter}: ${link.scenes.length} scenes</div>`;
          });
          
          vis.tooltip
              .style("visibility", "visible")
              .html(tooltipHtml)
              .style("top", `${event.pageY - 10}px`)
              .style("left", `${event.pageX + 10}px`);
      
          // Show detail section near the mouse pointer
          vis.detailSection
              .style("visibility", "visible")
              .html(`<div class="detail-title">Details for ${d}</div><div class="detail-content">Any additional details here for ${d}</div>`)
              .style("top", `${event.pageY + 20}px`)
              .style("left", `${event.pageX + 20}px`);
      })
        .on("mouseout", function () {
          vis.svg.selectAll(".link").style("opacity", 0.7);
          vis.tooltip.style("visibility", "hidden");
          vis.detailSection.style("visibility", "hidden");
        });
    
      // Draw the links
      vis.svg
        .selectAll(".link")
        .data(links)
        .join("path")
        .attr("class", "link")
        .attr("d", (d) => {
          const sourceX = vis.xScale(d.characterA);
          const targetX = vis.xScale(d.characterB);
          const midX = (sourceX + targetX) / 2;
          const midY = vis.height / 2 - 50 - Math.sqrt(d.scenes.length) * 5;
          return vis.line([
            { x: sourceX, y: vis.height / 2 },
            { x: midX, y: midY },
            { x: targetX, y: vis.height / 2 },
          ]);
        })
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-width", (d) => getStrokeWidth(d.scenes.length))
        .style("opacity", 0.7);

        

        
    }
    

  }  

  // Create an instance of ArcDiagram
  const arcDiagram = new ArcDiagram();

  // Populate season dropdown
  const seasonSelect = d3.select("#season-select");
  const seasons = Array.from(new Set(jsonData.map(d => d.season))); // Extract unique seasons
  seasonSelect.selectAll("option")
    .data(seasons)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => `Season ${d}`);

    seasonSelect.on("change", function() {
      const selectedSeason = +this.value;
      const episodeSelect = d3.select("#episode-select");
      episodeSelect.selectAll("option").remove(); // Clear previous options
      const episodes = Array.from(new Set(jsonData.filter(d => d.season === selectedSeason).map(d => d.episode)));
      episodeSelect.selectAll("option")
        .data(episodes)
        .enter().append("option")
        .attr("value", d => d)
        .text(d => `Episode ${d}`);
      const defaultEpisode = episodes[0];
      episodeSelect.property("value", defaultEpisode);
      arcDiagram.updateVis(selectedSeason, defaultEpisode);
      updateBarChart(selectedSeason, defaultEpisode); // Update bar chart
      updateCharacterLinesChart(selectedSeason, defaultEpisode);



    });
    
    // Event listener for episode changes
    const episodeSelect = d3.select("#episode-select");
    episodeSelect.on("change", function() {
      const selectedSeason = +seasonSelect.property("value");
      const selectedEpisode = +this.value;
      arcDiagram.updateVis(selectedSeason, selectedEpisode);
      updateBarChart(selectedSeason, selectedEpisode); // Update bar chart
      updateCharacterLinesChart(selectedSeason, selectedEpisode);

    });
    
    // Initial episode dropdown for the first season
    const initialSeason = seasons[0]; // Use the first season as default
    const initialEpisodes = Array.from(new Set(jsonData.filter(d => d.season === initialSeason).map(d => d.episode)));
    episodeSelect.selectAll("option")
      .data(initialEpisodes)
      .enter().append("option")
      .attr("value", d => d)
      .text(d => `Episode ${d}`);
    const initialEpisode = initialEpisodes[0];
    episodeSelect.property("value", initialEpisode);
    arcDiagram.updateVis(initialSeason, initialEpisode);

// Function to create the bar chart
function createBarChart(data) {
  const emotions = ["Joyful", "Scared", "Mad", "Peaceful", "Powerful", "Neutral", "Sad"];
  
  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const x = d3.scaleBand()
    .domain(emotions)
    .range([0, width])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .nice()
    .range([height, 0]);
  
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

    svg.append("text")
  .attr("class", "bar-chart-title")
  .attr("x", width / 2)
  .attr("y", -margin.top / 2 +10)
  .attr("text-anchor", "middle")
  .text("Emotions between Characters");
  
  // X-axis label
  svg.append("text")
    .attr("class", "x-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .style("text-anchor", "middle")
    .text("Top Emotions between Characters");
  
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);
  
  // Y-axis label
  svg.append("text")
    .attr("class", "y-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .style("text-anchor", "middle")
    .text("Count per Selected Episode");
  
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar1")
    .attr("x", d => x(d.emotion))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.count))
    .attr("fill", "#69b3a2");
}

// Function to update the bar chart
function updateBarChart(selectedSeason, selectedEpisode) {
  const filteredData = jsonData.filter(
    d => d.season === selectedSeason && d.episode === selectedEpisode
  );
  
  const emotionCounts = filteredData.reduce((acc, curr) => {
    if (acc[curr.emotion]) {
      acc[curr.emotion]++;
    } else {
      acc[curr.emotion] = 1;
    }
    return acc;
  }, {});
  
  const emotionData = Object.keys(emotionCounts).map(emotion => ({
    emotion: emotion,
    count: emotionCounts[emotion]
  }));
  
  // Remove existing bar chart if it exists
  d3.select("#bar-chart svg").remove();
  
  createBarChart(emotionData);
}

// Call updateBarChart initially
updateBarChart(1, 1); // Default to Season 1, Episode 1

// // Event listeners for season and episode changes
// seasonSelect.on("change", function() {
//   const selectedSeason = +this.value;
//   const selectedEpisode = +episodeSelect.property("value");
//   updateBarChart(selectedSeason, selectedEpisode);
//   arcDiagram.updateVis(initialSeason, initialEpisode);

// });

// episodeSelect.on("change", function() {
//   const selectedSeason = +seasonSelect.property("value");
//   const selectedEpisode = +this.value;
//   updateBarChart(selectedSeason, selectedEpisode);
//   arcDiagram.updateVis(initialSeason, initialEpisode);

// });


// Function to create the bar chart for character lines
function createCharacterLinesChart(characterData) {
  const margin = { top: 30, right: 30, bottom: 75, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const svg = d3.select("#character-lines-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const x = d3.scaleBand()
    .domain(characterData.map(d => d.character))
    .range([0, width])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(characterData, d => d.lines)])
    .nice()
    .range([height, 0]);
  
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

    svg.append("text")
    .attr("class", "character-lines-chart-title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Populatrity of Characters");
  
  // X-axis label
  svg.append("text")
    .attr("class", "x-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom +1)
    .style("text-anchor", "middle")
    .text("Characters");
  
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);
  
  // Y-axis label
  svg.append("text")
    .attr("class", "y-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .style("text-anchor", "middle")
    .text("Popularity of Character in selected episode");
  
  svg.selectAll(".bar")
    .data(characterData)
    .enter().append("rect")
    .attr("class", "bar2")
    .attr("x", d => x(d.character))
    .attr("y", d => y(d.lines))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.lines))
    .attr("fill", "#69b3a2");
    
}

// Function to update the character lines bar chart
function updateCharacterLinesChart(selectedSeason, selectedEpisode) {
  const filteredData = jsonData.filter(
    d => d.season === selectedSeason && d.episode === selectedEpisode
  );

  const characters = ["Rachel Green", "Ross Geller", "Monica Geller", "Chandler Bing", "Joey Tribbiani", "Phoebe Buffay"];

  const characterLines = characters.map(character => {
    const lines = filteredData.filter(d => d.speaker === character).length;
    return { character: character, lines: lines };
  });

  // Remove existing character lines chart if it exists
  d3.select("#character-lines-chart svg").remove();

  createCharacterLinesChart(characterLines);
}

// Call updateCharacterLinesChart initially
updateCharacterLinesChart(1, 1); // Default to Season 1, Episode 1

// Event listeners for season and episode changes
// seasonSelect.on("change", function() {
//   const selectedSeason = +this.value;
  // const selectedEpisode = +episodeSelect.property("value");
  // updateCharacterLinesChart(selectedSeason, selectedEpisode);
// });

// episodeSelect.on("change", function() {
//   const selectedSeason = +seasonSelect.property("value");
//   const selectedEpisode = +this.value;
//   updateCharacterLinesChart(selectedSeason, selectedEpisode);
// });

});
