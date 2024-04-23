// Load the CSV data
d3.csv("data/Realemotions_friends.csv").then(data => {
    // Convert numeric columns to numbers
    data.forEach(d => {
      d.season = +d.season;
      d.episode = +d.episode;
      d.scene = +d.scene;
      d.utterance = +d.utterance;
    });
    
    console.log(data);
    // Get unique seasons and episodes
    const seasons = Array.from(new Set(data.map(d => d.season)));
  
    // Populate season select
    const seasonSelect = d3.select("#season-select");
    seasonSelect.selectAll("option")
      .data(seasons)
      .enter().append("option")
      .attr("value", d => d)
      .text(d => `Season ${d}`);
  
    // Function to update episode dropdown based on selected season
    function updateEpisodeDropdown(selectedSeason) {
      const episodes = Array.from(new Set(data.filter(d => d.season === selectedSeason).map(d => d.episode)));
  
      const episodeSelect = d3.select("#episode-select");
      episodeSelect.selectAll("option").remove(); // Clear previous options
      episodeSelect.selectAll("option")
        .data(episodes)
        .enter().append("option")
        .attr("value", d => d)
        .text(d => `Episode ${d}`);
  
      // Default to the first episode in the season
      const defaultEpisode = episodes[0];
      episodeSelect.property("value", defaultEpisode);
  
      // Call updateVis with selected season and default episode
      arcDiagram.updateVis(selectedSeason, defaultEpisode);
    }
  
    // Create an instance of ArcDiagram
    const arcDiagram = new ArcDiagram();
  
    // Event listener for season changes
    seasonSelect.on("change", function() {
      const selectedSeason = +this.value;
      updateEpisodeDropdown(selectedSeason);
    });
  
    // Initial episode dropdown for the first season
    updateEpisodeDropdown(seasons[0]);
  });
  