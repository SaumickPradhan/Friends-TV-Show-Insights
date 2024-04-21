// Read CSV file
async function readCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse("newfriends_quotes_updated.csv", {
            download: true,
            header: true,
            complete: function (results) {
                resolve(results.data);
            },
            error: function (error, file) {
                reject(error, file);
            }
        });
    });
}

// Function to count the number of episodes each character appears in
function countEpisodes(data) {
    const episodesCount = {};
    data.forEach((row) => {
        const character = row.author;
        if (episodesCount[character]) {
            episodesCount[character]++;
        } else {
            episodesCount[character] = 1;
        }
    });
    return episodesCount;
}

// Function to count the lines spoken by each character
function countLines(data) {
    const linesCount = {};
    data.forEach((row) => {
        const character = row.author;
        if (linesCount[character]) {
            linesCount[character]++;
        } else {
            linesCount[character] = 1;
        }
    });
    return linesCount;
}

// Function to create the dropdown for selecting a season
function createSeasonDropdown(data) {
    const seasons = [...new Set(data.map((item) => item.season))];
    const dropdown = document.getElementById('seasonDropdown');
    dropdown.innerHTML = '';
    seasons.forEach((season) => {
        const option = document.createElement('option');
        option.text = `Season ${season}`;
        option.value = season;
        dropdown.add(option);
    });
}

// Function to show overview
function showOverview(data) {
    const seasons = [...new Set(data.map((item) => item.season))];
    const overviewHTML = `
        <p>The TV show aired on NBC Network.</p>
        <p>It has a total of ${seasons.length} seasons and ${data.length} episodes.</p>
        <p>Main characters include: ${getOverallCharactersData(data).join(', ')}.</p>
        <p>Genre: Comedy</p>
    `;
    document.getElementById('showOverview').innerHTML = overviewHTML;
}

// Function to plot number of episodes characters appear in
function plotEpisodes(data) {
    const topCharactersData = getOverallCharactersData(data);
    const episodesCount = countEpisodes(data);
    const characters = Object.keys(episodesCount).filter(character => topCharactersData.includes(character));
    const episodes = Object.values(episodesCount).filter((_, index) => topCharactersData.includes(characters[index]));

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#episodesChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
        .domain(characters)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(episodes)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(characters)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d))
        .attr("width", x.bandwidth())
        .attr("y", (d, i) => y(episodes[i]))
        .attr("height", (d, i) => height - y(episodes[i]))
        .style("fill", "steelblue");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Number of Episodes Characters Appear In (Top 6)");
}

// Function to plot lines spoken by characters
function plotLines(data) {
    const topCharactersData = getOverallCharactersData(data);
    const linesCount = countLines(data);
    const characters = Object.keys(linesCount).filter(character => topCharactersData.includes(character));
    const lines = Object.values(linesCount).filter((_, index) => topCharactersData.includes(characters[index]));

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#linesChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
        .domain(characters)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(lines)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(characters)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d))
        .attr("width", x.bandwidth())
        .attr("y", (d, i) => y(lines[i]))
        .attr("height", (d, i) => height - y(lines[i]))
        .style("fill", "steelblue");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Lines Spoken by Characters (Top 6)");
}




// Function to plot selected season
function plotSelectedSeason(data, season) {
    const selectedSeasonData = data.filter((d) => d.season === season);
    plotEpisodes(selectedSeasonData);
    plotLines(selectedSeasonData);
}

// Function to get overall characters data
function getOverallCharactersData(data) {
    const episodesCount = countEpisodes(data);
    const linesCount = countLines(data);
    const characters = Object.keys(episodesCount);

    // Create a map to store the aggregated data
    const characterMap = new Map();
    characters.forEach((character) => {
        const episodes = episodesCount[character] || 0;
        const lines = linesCount[character] || 0;

        // Aggregate the episodes and lines data for each character
        if (characterMap.has(character)) {
            const existing = characterMap.get(character);
            characterMap.set(character, {
                episodes: existing.episodes + episodes,
                lines: existing.lines + lines
            });
        } else {
            characterMap.set(character, {
                episodes: episodes,
                lines: lines
            });
        }
    });

    // Convert the map to an array and select the top 6 characters
    const charactersData = Array.from(characterMap, ([character, { episodes, lines }]) => ({ character, episodes, lines }));
    const topCharacters = charactersData
        .sort((a, b) => b.lines - a.lines)
        .slice(0, 6)
        .map(character => character.character);

    return topCharacters;
}

// Function to plot overall characters
function plotOverallCharacters(data) {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#overallCharactersChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
        .domain(data.map(d => d.character))
        .range([0, width])
        .padding(0.1);

    const y0 = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.episodes, d.lines))])
        .range([height, 0]);

    const y1 = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.episodes, d.lines))])
        .range([height, 0]);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y0));

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + width + " ,0)")
        .call(d3.axisRight(y1));

    svg.selectAll(".bar.episodes")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar episodes")
        .attr("x", d => x(d.character))
        .attr("width", x.bandwidth() / 2)
        .attr("y", d => y0(d.episodes))
        .attr("height", d => height - y0(d.episodes))
        .style("fill", "steelblue");

    svg.selectAll(".bar.lines")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar lines")
        .attr("x", d => x(d.character) + x.bandwidth() / 2)
        .attr("width", x.bandwidth() / 2)
        .attr("y", d => y1(d.lines))
        .attr("height", d => height - y1(d.lines))
        .style("fill", "orange");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Main Characters: Episodes and Lines Spoken");
}

// Main function
async function main() {
    const data = await readCSV();
    createSeasonDropdown(data);
    showOverview(data);
    const topCharacters = getOverallCharactersData(data);
    plotOverallCharacters(topCharacters.map(character => ({
        character,
        episodes: countEpisodes(data)[character] || 0,
        lines: countLines(data)[character] || 0
    })));

    // Add event listener to the season dropdown
    const seasonDropdown = document.getElementById('seasonDropdown');
    seasonDropdown.addEventListener('change', (event) => {
        const selectedSeason = event.target.value;
        plotSelectedSeason(data, selectedSeason);
    });
}

main();
