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
Promise.all([
    d3.json("data/Friends_season.json"),
    d3.json("data/stop_words_english.json")
]).then(function(data) {
    var dataset = data[0];
    var stopwords = data[1].stopwords;

    if (!Array.isArray(stopwords)) {
        console.error("Stopwords JSON is not an array.");
        return;
    }

    // Function to update word cloud and bar chart based on selected character
    function updateCharacter(character) {
        var characterQuotes = dataset["1.0"].filter(function(d) {
            return d.author === character;
        });

        var characterText = characterQuotes.map(function(d) {
            return d.quote;
        }).join(" ");

        var characterWords = characterText.split(/\s+/);

        var fillerWords = stopwords;

        characterWords = characterWords.map(function(word) {
            // Remove commas, brackets, and full stops from each word
            return word.replace(/[,.()\[\]]/g, '');
        }).filter(function(word) {
            return !fillerWords.includes(word.toLowerCase());
        });

        var characterWordFreq = {};

        characterWords.forEach(function(word) {
            characterWordFreq[word] = (characterWordFreq[word] || 0) + 1;
        });

        var characterWordCloudData = Object.keys(characterWordFreq).map(function(word) {
            return { text: word, size: characterWordFreq[word] };
        });

        characterWordCloudData.sort(function(a, b) {
            return b.size - a.size;
        });

        characterWordCloudData = characterWordCloudData.slice(0, 50);

        // var colorScale = d3.scaleLinear()
        // .domain([0, d3.max(characterWordCloudData, function(d) { return d.size; })])
        // .range(["red", "yellow"]);
        var colors = ["red", "blue", "#FFE900", "black"];
        var colorIndex = 0; // Initialize color index

        // Function to get the next color
        function getNextColor() {
            var color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length; // Increment color index and loop back to 0 if it exceeds the array length
            return color;
        }

        var colorScale = d3.scaleLinear()
            .domain([0, d3.max(characterWordCloudData, function(d) { return d.size; })])
            .range(["red", "blue", "#FFE900","black"])
            .interpolate(d3.interpolateHcl); // Use HCL interpolation for smoother transitions

// Append SVG for the word cloud

        var layout = d3.layout.cloud()
            .size([800, 400])
            .words(characterWordCloudData)
            .padding(5)
            .rotate(function() { return Math.floor(Math.random() * 2) * 90; })
            .font("Arial")
            .fontSize(function(d) { return Math.sqrt(d.size) * 10; });

        layout.start();

        d3.select("#word-cloud svg").remove(); // Remove previous word cloud

        // d3.select("#word-cloud").append("svg")
        //     .attr("width", 800)
        //     .attr("height", 400)
        //     .append("g")
        //     .attr("transform", "translate(400,200)")
        //     .selectAll("text")
        //     .data(characterWordCloudData)
        //     .enter().append("text")
        //     .style("font-size", function(d) { return d.size + "px"; })
        //     .style("fill", function(d) { return colorScale(d.size); })
        //     .attr("text-anchor", "middle")
        //     .attr("transform", function(d) {
        //         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        //     })
        //     .text(function(d) { return d.text; });
            d3.select("#word-cloud").append("svg")
        .attr("width", 800)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(400,200)")
        .selectAll("text")
        .data(characterWordCloudData)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d) { return getNextColor(); }) // Call getNextColor to alternate colors
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

        // Update horizontal bar chart
        var characterWordFreqArray = Object.keys(characterWordFreq).map(function(word) {
            return { text: word, frequency: characterWordFreq[word] };
        });

        characterWordFreqArray.sort(function(a, b) {
            return b.frequency - a.frequency;
        });

        characterWordFreqArray = characterWordFreqArray.slice(0, 10); // Limit to top 10 words

        var width = 800; // Define width within the function
        var height = 400; 
        var margin = { top: 20, right: 30, bottom: 30, left: 100 }; // Define margin within the function


        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(characterWordFreqArray, function(d) { return d.frequency; })]);

        var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(characterWordFreqArray.map(function(d) { return d.text; }));

        d3.select("#horizontal-bar-chart svg").remove(); // Remove previous bar chart

        var svg = d3.select("#horizontal-bar-chart")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500)
            
            

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.selectAll(".bar")
            .data(characterWordFreqArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", function(d) { return y(d.text); })
            .attr("width", function(d) { return x(d.frequency); })
            .attr("height", y.bandwidth())
            .attr("fill", function(d) { return getNextColor(); }); // Call getNextColor to alternate colors

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
            g.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height + 30) // Adjust position as needed
            .style("text-anchor", "middle")
            .text("Frequency");
        
        // Y Axis Label
        g.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Words");
        
        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
    }

    // Initial update with "Joey" as the selected character
    updateCharacter("Joey");

    // Event listener for character selection dropdown
    d3.select("#character-select").on("change", function() {
        var selectedCharacter = d3.select(this).property("value");
        updateCharacter(selectedCharacter);
    });

});




var characterSelect = document.getElementById('character-select');

// Listen for change event on select element
characterSelect.addEventListener('change', function() {
    // Get the selected character
    var selectedCharacter = characterSelect.value;
    
    // Update the label text
    document.getElementById('word-cloud-title').innerText = 'Word Cloud for ' + selectedCharacter;
    document.getElementById('word-cloud-title1').innerText = 'Frequently used words by ' + selectedCharacter;

    
    // Call the function to update the word cloud and bar chart based on the selected character
    updateCharacter(selectedCharacter);
});

Promise.all([
    d3.json("data/Friends_season.json"),
    d3.json("data/stop_words_english.json")
]).then(function(data) {
    var dataset = data[0];
    var stopwords = data[1].stopwords;

    if (!Array.isArray(stopwords)) {
        console.error("Stopwords JSON is not an array.");
        return;
    }

    // Function to update word cloud and bar chart based on selected character
    function updateCharacter(character) {
        var characterQuotes = dataset["1.0"].filter(function(d) {
            return d.author === character;
        });

        var characterText = characterQuotes.map(function(d) {
            return d.quote;
        }).join(" ");

        var characterWords = characterText.split(/\s+/);

        var fillerWords = stopwords;

        characterWords = characterWords.map(function(word) {
            // Remove commas, brackets, and full stops from each word
            return word.replace(/[,.()\[\]]/g, '');
        }).filter(function(word) {
            return !fillerWords.includes(word.toLowerCase());
        });

        var characterWordFreq = {};

        characterWords.forEach(function(word) {
            characterWordFreq[word] = (characterWordFreq[word] || 0) + 1;
        });

        var characterWordCloudData = Object.keys(characterWordFreq).map(function(word) {
            return { text: word, size: characterWordFreq[word] };
        });

        characterWordCloudData.sort(function(a, b) {
            return b.size - a.size;
        });

        characterWordCloudData = characterWordCloudData.slice(0, 50);

        // var colorScale = d3.scaleLinear()
        // .domain([0, d3.max(characterWordCloudData, function(d) { return d.size; })])
        // .range(["red", "yellow"]);
        var colors = ["red", "blue", "#FFE900", "black"];
        var colorIndex = 0; // Initialize color index

        // Function to get the next color
        function getNextColor() {
            var color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length; // Increment color index and loop back to 0 if it exceeds the array length
            return color;
        }

        var colorScale = d3.scaleLinear()
            .domain([0, d3.max(characterWordCloudData, function(d) { return d.size; })])
            .range(["red", "blue", "#FFE900","black"])
            .interpolate(d3.interpolateHcl); // Use HCL interpolation for smoother transitions

// Append SVG for the word cloud

        var layout = d3.layout.cloud()
            .size([800, 400])
            .words(characterWordCloudData)
            .padding(5)
            .rotate(function() { return Math.floor(Math.random() * 2) * 90; })
            .font("Arial")
            .fontSize(function(d) { return Math.sqrt(d.size) * 10; });

        layout.start();

        d3.select("#word-cloud1 svg").remove(); // Remove previous word cloud

        // d3.select("#word-cloud").append("svg")
        //     .attr("width", 800)
        //     .attr("height", 400)
        //     .append("g")
        //     .attr("transform", "translate(400,200)")
        //     .selectAll("text")
        //     .data(characterWordCloudData)
        //     .enter().append("text")
        //     .style("font-size", function(d) { return d.size + "px"; })
        //     .style("fill", function(d) { return colorScale(d.size); })
        //     .attr("text-anchor", "middle")
        //     .attr("transform", function(d) {
        //         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        //     })
        //     .text(function(d) { return d.text; });
            d3.select("#word-cloud1").append("svg")
        .attr("width", 800)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(400,200)")
        .selectAll("text")
        .data(characterWordCloudData)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d) { return getNextColor(); }) // Call getNextColor to alternate colors
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

        // Update horizontal bar chart
        var characterWordFreqArray = Object.keys(characterWordFreq).map(function(word) {
            return { text: word, frequency: characterWordFreq[word] };
        });

        characterWordFreqArray.sort(function(a, b) {
            return b.frequency - a.frequency;
        });

        characterWordFreqArray = characterWordFreqArray.slice(0, 10); // Limit to top 10 words

        var width = 800; // Define width within the function
        var height = 400; 
        var margin = { top: 20, right: 30, bottom: 30, left: 100 }; // Define margin within the function


        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(characterWordFreqArray, function(d) { return d.frequency; })]);

        var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(characterWordFreqArray.map(function(d) { return d.text; }));

        d3.select("#horizontal-bar-chart1 svg").remove(); // Remove previous bar chart

        var svg = d3.select("#horizontal-bar-chart1")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500)
            
            

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.selectAll(".bar")
            .data(characterWordFreqArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", function(d) { return y(d.text); })
            .attr("width", function(d) { return x(d.frequency); })
            .attr("height", y.bandwidth())
            .attr("fill", function(d) { return getNextColor(); }); // Call getNextColor to alternate colors

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
            g.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height + 30) // Adjust position as needed
            .style("text-anchor", "middle")
            .text("Frequency");
        
        // Y Axis Label
        g.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Words");
        
        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
    }

        var characterSelect = document.getElementById('character-select1');

// Listen for change event on select element
characterSelect.addEventListener('change', function() {
    // Get the selected character
    var selectedCharacter = characterSelect.value;
    
    // Update the label text
    document.getElementById('word-cloud-title2').innerText = 'Word Cloud for ' + selectedCharacter;
    document.getElementById('word-cloud-title3').innerText = 'Frequently used words by ' + selectedCharacter;

    
    // Call the function to update the word cloud and bar chart based on the selected character
    updateCharacter(selectedCharacter);

});
    
    

    // Initial update with "Monica" as the selected character
    updateCharacter("Monica");

    // Event listener for character selection dropdown
    d3.select("#character-select1").on("change", function() {
        var selectedCharacter = d3.select(this).property("value");
        updateCharacter(selectedCharacter);
    });
    var characterSelect = document.getElementById('character-select1');

// Listen for change event on select element
characterSelect.addEventListener('change', function() {
    // Get the selected character
    var selectedCharacter = characterSelect.value;
    
    // Update the label text
    document.getElementById('word-cloud-title2').innerText = 'Word Cloud for ' + selectedCharacter;
    document.getElementById('word-cloud-title3').innerText = 'Frequently used words by ' + selectedCharacter;

    
    // Call the function to update the word cloud and bar chart based on the selected character
    updateCharacter(selectedCharacter);
});
});

