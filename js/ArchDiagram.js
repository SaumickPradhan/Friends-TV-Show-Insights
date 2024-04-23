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
            .style("top", `${d3.pointer(event)[1] + vis.config.margin.top}px`)
            .style("left", `${d3.pointer(event)[0] + vis.config.margin.left}px`);
    
          // Show detail section near the mouse pointer
          vis.detailSection
            .style("visibility", "visible")
            .html(`<div class="detail-title">Details for ${d}</div><div class="detail-content">Any additional details here for ${d}</div>`)
            .style("top", `${d3.pointer(event)[1] + vis.config.margin.top + 20}px`)
            .style("left", `${d3.pointer(event)[0] + vis.config.margin.left + 20}px`);
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
    

  // updateVis(selectedSeason, selectedEpisode) {
  //   const vis = this;
  
  //   // Filter the data based on selected season and episode
  //   const filteredData = jsonData.filter(
  //     (d) => d.season === selectedSeason && d.episode === selectedEpisode
  //   );
  
  //   // Get characters present in the selected episode
  //   const charactersInEpisode = Array.from(
  //     new Set(filteredData.map((d) => d.speaker))
  //   );
  
  //   // Generate links between characters who appear in the same scene
  //   const links = [];
  //   charactersInEpisode.forEach((charA, i) => {
  //     charactersInEpisode.slice(i + 1).forEach((charB) => {
  //       // Check if characters appear together in any scene
  //       const scenesTogether = filteredData.filter(
  //         (d) => d.speaker === charA || d.speaker === charB
  //       );
  //       const uniqueScenes = Array.from(new Set(scenesTogether.map((d) => d.scene)));
  //       if (uniqueScenes.length > 0) {
  //         links.push({
  //           characterA: charA,
  //           characterB: charB,
  //           scenes: uniqueScenes,
  //         });
  //       }
  //     });
  //   });
  
  //   // Create the scale for placing nodes
  //   vis.xScale.domain(charactersInEpisode);
  
  //   // Function to calculate stroke width based on the number of scenes
  //   function getStrokeWidth(scenes) {
  //     if (scenes <= 1) return 1;
  //     if (scenes <= 2) return 2;
  //     if (scenes <= 3) return 3;
  //     if (scenes <= 4) return 4;
  //     if (scenes <= 5) return 5;
  //     return 6;
  //   }
  
  //   // Draw the nodes
  //   vis.svg
  //     .selectAll(".node")
  //     .data(charactersInEpisode)
  //     .join("text")
  //     .attr("class", "node")
  //     .attr("x", (d) => vis.xScale(d))
  //     .attr("y", vis.height / 2 + 25)
  //     .style("text-anchor", "middle")
  //     .text((d) => d)
  //     .on("mouseover", function (event, d) {
  //       d3.select(this).attr("cursor", "default");
  //       vis.svg
  //         .selectAll(".link")
  //         .style("opacity", 0.1)
  //         .filter((link) => link.characterA === d || link.characterB === d)
  //         .style("opacity", 1);
  
  //       const connections = links.filter(
  //         (link) => link.characterA === d || link.characterB === d
  //       );
  
  //       let tooltipHtml = `<div class="tooltip-title">Connections for ${d}</div>`;
  //       connections.forEach((link) => {
  //         const otherCharacter = link.characterA === d ? link.characterB : link.characterA;
  //         tooltipHtml += `<div>${otherCharacter}: ${link.scenes.length} scenes</div>`;
  //       });
  //       vis.tooltip
  //         .style("visibility", "visible")
  //         .html(tooltipHtml)
  //         .style("top", `${event.pageY - 10}px`)
  //         .style("left", `${event.pageX + 10}px`);
  
  //       // Show detail section near the mouse pointer
  //       vis.detailSection
  //         .style("visibility", "visible")
  //         .html(`<div class="detail-title">Details for ${d}</div><div class="detail-content">Any additional details here for ${d}</div>`)
  //         .style("top", `${event.pageY + 20}px`)
  //         .style("left", `${event.pageX + 20}px`);
  //     })
  //     .on("mouseout", function () {
  //       vis.svg.selectAll(".link").style("opacity", 0.7);
  //       vis.tooltip.style("visibility", "hidden");
  //       vis.detailSection.style("visibility", "hidden");
  //     });
  
  //   // Draw the links
  //   vis.svg
  //     .selectAll(".link")
  //     .data(links)
  //     .join("path")
  //     .attr("class", "link")
  //     .attr("d", (d) => {
  //       const sourceX = vis.xScale(d.characterA);
  //       const targetX = vis.xScale(d.characterB);
  //       const midX = (sourceX + targetX) / 2;
  //       const midY = vis.height / 2 - 50 - Math.sqrt(d.scenes.length) * 5;
  //       return vis.line([
  //         { x: sourceX, y: vis.height / 2 },
  //         { x: midX, y: midY },
  //         { x: targetX, y: vis.height / 2 },
  //       ]);
  //     })
  //     .attr("fill", "none")
  //     .attr("stroke", "#555")
  //     .attr("stroke-width", (d) => getStrokeWidth(d.scenes.length))
  //     .style("opacity", 0.7);
  // }
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

  // Event listener for season changes
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
  });

  // Event listener for episode changes
  const episodeSelect = d3.select("#episode-select");
  episodeSelect.on("change", function() {
    const selectedSeason = +seasonSelect.property("value");
    const selectedEpisode = +this.value;
    arcDiagram.updateVis(selectedSeason, selectedEpisode);
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
});

