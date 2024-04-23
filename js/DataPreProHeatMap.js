const fs = require('fs');

// Read the JSON data from quotes.json
fs.readFile('data/quotes.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading quotes.json:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    
    const heatmapData = [];

    for (const seasonNum in jsonData) {
      const seasonData = jsonData[seasonNum];
      
      for (const episodeNum in seasonData) {
        const episode = seasonData[episodeNum];
        
        const episodeTitle = episode["title"];
        const linesSpoken = Object.values(episode["scenes"]).reduce((acc, scene) => acc + scene.length, 0);
        
        heatmapData.push({
          seasonNum: parseInt(seasonNum),
          episodeNum: parseInt(episodeNum),
          episodeName: episodeTitle,
          linesSpoken: linesSpoken,
        });
      }
    }

    const jsonContent = JSON.stringify(heatmapData, null, 2);

    // Write the heatmapData to heatmapData.json
    fs.writeFile('data/heatmapData.json', jsonContent, 'utf8', (err) => {
      if (err) {
        console.error('An error occurred while writing heatmapData to heatmapData.json:', err);
        return;
      }
      console.log('heatmapData has been saved to heatmapData.json');
    });
  } catch (error) {
    console.error('Error parsing JSON data from quotes.json:', error);
  }
});
