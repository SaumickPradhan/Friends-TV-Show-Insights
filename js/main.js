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

// Function to count the lines spoken by each character
function countLines(data) {
    const linesCount = {};
    data.forEach((row) => {
        const character = row.author;
        const quote = row.quote || "";
        if (linesCount[character]) {
            linesCount[character] += quote.split(" ").length;
        } else {
            linesCount[character] = quote.split(" ").length;
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

// Function to plot lines spoken by characters
function plotLines(data, season) {
    const topCharactersData = getOverallCharactersData(data);
    const linesCount = countLines(data);
    const characters = Object.keys(linesCount).filter(character => topCharactersData.includes(character));
    const lines = Object.values(linesCount).filter((_, index) => topCharactersData.includes(characters[index]));

    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
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
        .style("fill", "red");

    const tooltip = d3.select("#linesChart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    const mouseover = function(event, d) {
        tooltip.style("opacity", 1);
    };
    const mousemove = function(event, d) {
        tooltip.html(`${d}: ${linesCount[d]}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    };
    const mouseleave = function(event, d) {
        tooltip.style("opacity", 0);
    };

    svg.selectAll(".bar")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(`Lines Spoken by Characters (Top 6) in Season ${season}`);

    // Add the x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .attr("text-anchor", "middle")
        .text("Characters");

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lines Spoken");
}

// Function to plot episodes in which characters appear
function plotEpisodes(data, characterEpisodeData, season) {
    const episodes = characterEpisodeData.map(d => d.episode_number);
    const characters = characterEpisodeData.map(d => d.character);
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#episodesChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
        .domain(episodes)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleBand()
        .domain(characters)
        .range([height, 0])
        .padding(0.1);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".tile")
        .data(characterEpisodeData)
        .enter()
        .append("rect")
        .attr("class", "tile")
        .attr("x", (d) => x(d.episode_number))
        .attr("y", (d) => y(d.character))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", "blue");

    const tooltip = d3.select("#episodesChart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    const mouseover = function(event, d) {
        tooltip.style("opacity", 1);
    };
    const mousemove = function(event, d) {
        tooltip.html(`Episode ${d.episode_number}: ${d.lines} lines`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    };
    const mouseleave = function(event, d) {
        tooltip.style("opacity", 0);
    };

    svg.selectAll(".tile")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(`Episodes Characters Appear In Season ${season}`);

    // Add the x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .attr("text-anchor", "middle")
        .text("Episodes");

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Characters");
}

// Function to plot selected season
function plotSelectedSeason(data, season) {
    const selectedSeasonData = data.filter((d) => d.season === season);
    plotLines(selectedSeasonData, season);
    plotEpisodes(data, getCharacterEpisodeData(data, getOverallCharactersData(data)), season);
}

// Function to get overall characters data
function getOverallCharactersData(data) {
    const linesCount = countLines(data);
    const characters = Object.keys(linesCount);

    // Create a map to store the aggregated data
    const characterMap = new Map();
    characters.forEach((character) => {
        const lines = linesCount[character] || 0;

        // Aggregate the lines data for each character
        characterMap.set(character, lines);
    });

    // Convert the map to an array and select the top 6 characters
    const charactersData = Array.from(characterMap, ([character, lines]) => ({ character, lines }));
    const topCharacters = charactersData
        .sort((a, b) => b.lines - a.lines)
        .slice(0, 6)
        .map(character => character.character);

    return topCharacters;
}

// Function to get the episodes each major character appears in and how much they speak
function getCharacterEpisodeData(data, characters) {
    const characterEpisodeData = [];
    characters.forEach(character => {
        const episodes = data.filter(row => row.author === character);
        episodes.forEach(episode => {
            characterEpisodeData.push({
                character: character,
                episode_number: episode.episode_number,
                lines: episode.quote.split(" ").length
            });
        });
    });
    return characterEpisodeData;
}

// Function to plot overall characters
function plotOverallCharacters(data) {
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
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

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.lines)])
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
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.character))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.lines))
        .attr("height", d => height - y(d.lines))
        .style("fill", "steelblue");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Main Characters: Lines Spoken Throughout the Show");

    // Add the x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .attr("text-anchor", "middle")
        .text("Characters");

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lines Spoken");
}

// Main function
async function main() {
    const data = await readCSV();
    createSeasonDropdown(data);
    showOverview(data);
    const topCharacters = getOverallCharactersData(data);
    plotOverallCharacters(topCharacters.map(character => ({
        character,
        lines: countLines(data)[character] || 0
    })));

    // Add event listener to the season dropdown
    const seasonDropdown = document.getElementById('seasonDropdown');
    seasonDropdown.addEventListener('change', (event) => {
        const selectedSeason = event.target.value;
        document.getElementById('seasonTitle').innerText = selectedSeason;
        document.getElementById('seasonTitleLines').innerText = `Lines Spoken by Characters (Top 6) in Season ${selectedSeason}`;
        document.getElementById('seasonTitleEpisodes').innerText = `Episodes Characters Appear In Season ${selectedSeason}`;
        plotSelectedSeason(data, selectedSeason);
    });
}

main();
