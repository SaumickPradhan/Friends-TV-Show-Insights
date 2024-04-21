// main.js

// Function to read CSV and parse data
function readCSV() {
    return new Promise((resolve, reject) => {
        $.get('newfriends_quotes_updated.csv', (data) => {
            const parsedData = Papa.parse(data, { header: true });
            console.log("CSV data:", parsedData.data);
            resolve(parsedData.data);
        });
    });
}

// Function to create a dropdown for selecting season
function createSeasonDropdown(data) {
    const seasons = [...new Set(data.map((row) => row.season))];
    const dropdown = document.getElementById('seasonDropdown');
    seasons.forEach((season) => {
        const option = document.createElement('option');
        option.text = `Season ${season}`;
        option.value = season;
        dropdown.add(option);
    });
}

// Function to get data for a selected season
function getSeasonData(data, season) {
    return data.filter((row) => row.season == season);
}

// Function to count episodes for each character
function countEpisodes(data) {
    const episodesCount = {};
    data.forEach((row) => {
        const character = row.author;
        if (!episodesCount[character]) {
            episodesCount[character] = 1;
        } else {
            episodesCount[character]++;
        }
    });
    return episodesCount;
}

// Function to count lines for each character
function countLines(data) {
    const linesCount = {};
    data.forEach((row) => {
        const character = row.author;
        const lines = row.quote ? row.quote.split(' ').length : 0;
        if (!linesCount[character]) {
            linesCount[character] = lines;
        } else {
            linesCount[character] += lines;
        }
    });
    return linesCount;
}

// Function to get overall characters data
function getOverallCharactersData(data) {
    const episodesCount = countEpisodes(data);
    const linesCount = countLines(data);

    const characters = Object.keys(episodesCount);
    const charactersData = characters.map((character) => ({
        Character: character,
        Episodes: episodesCount[character],
        Lines: linesCount[character] ? linesCount[character] : 0,
    }));

    charactersData.sort((a, b) => b.Episodes - a.Episodes);
    console.log("Overall characters data:", charactersData);
    return charactersData;
}

// Function to plot overall characters bar chart
function plotOverallCharacters(data) {
    const characters = data.map((row) => row.Character);
    const episodes = data.map((row) => row.Episodes);

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
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.Character))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.Episodes))
        .attr("height", (d) => height - y(d.Episodes))
        .style("fill", "steelblue");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Number of Episodes Characters Appear In (Overall)");
}

// Function to plot selected season characters bar chart
function plotSelectedSeason(data, season) {
    const seasonData = getSeasonData(data, season);
    const charactersData = getOverallCharactersData(seasonData);
    const characters = charactersData.map((row) => row.Character);
    const episodes = charactersData.map((row) => row.Episodes);

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#selectedSeasonChart")
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
        .data(charactersData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.Character))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.Episodes))
        .attr("height", (d) => height - y(d.Episodes))
        .style("fill", "steelblue");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(`Number of Episodes Characters Appear In (Season ${season})`);
}

// Function to plot number of episodes characters appear in
function plotEpisodes(data) {
    const episodesCount = countEpisodes(data);
    const characters = Object.keys(episodesCount);
    const episodes = Object.values(episodesCount);

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
        .text("Number of Episodes Characters Appear In (Overall)");
}

// Function to plot lines spoken by characters
function plotLines(data) {
    const linesCount = countLines(data);
    const characters = Object.keys(linesCount);
    const lines = Object.values(linesCount);

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
        .text("Lines Spoken by Characters (Overall)");
}


// Function to create an overview of the show
function showOverview(data) {
    const seasons = [...new Set(data.map((row) => row.season))];
    const characters = [...new Set(data.map((row) => row.author))];

    const overviewHTML = `
        <p>This TV show ran for ${seasons.length} seasons and aired on [Platform Name].</p>
        <p>It has a total of ${data.length} episodes.</p>
        <p>Main characters include: ${characters.join(', ')}.</p>
        <p>Genre: [Genre]</p>
    `;
    document.getElementById('showOverview').innerHTML = overviewHTML;
}

// Main function
async function main() {
    const data = await readCSV();
    console.log("Data loaded:", data);
    createSeasonDropdown(data);
    showOverview(data);
    plotOverallCharacters(getOverallCharactersData(data));
    plotEpisodes(data);
    plotLines(data);

    // Event listener for season dropdown
    $('#seasonDropdown').change(function () {
        const season = $(this).val();
        plotSelectedSeason(data, season);
    });
}

// Run main function when the page loads
$(document).ready(main);
