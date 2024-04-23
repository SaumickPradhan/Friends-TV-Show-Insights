// Read the CSV data
d3.csv("data/newfriends_quotes_updated.csv").then(function(data) {
    // Process your data
    const nodes = [];
    const links = [];
    const interactionCounts = new Map();

    data.forEach(function(d) {
        // Skip rows with undefined or empty values
        if (!d.author || !d.quote) return;

        // Create source node (author)
        let sourceNode = nodes.find(node => node.id === d.author);
        if (!sourceNode) {
            sourceNode = { id: d.author };
            nodes.push(sourceNode);
        }

        // Create target node (quote)
        let targetNode = nodes.find(node => node.id === d.quote);
        if (!targetNode) {
            targetNode = { id: d.quote };
            nodes.push(targetNode);
        }

        // Check if the interaction between source and target exists
        const interactionKey = `${d.author}-${d.quote}`;
        if (interactionCounts.has(interactionKey)) {
            interactionCounts.set(interactionKey, interactionCounts.get(interactionKey) + 1);
        } else {
            interactionCounts.set(interactionKey, 1);
        }
    });

    // Create links based on the interaction counts
    interactionCounts.forEach((count, key) => {
        const [sourceId, targetId] = key.split("-");
        const sourceNode = nodes.find(node => node.id === sourceId);
        const targetNode = nodes.find(node => node.id === targetId);
        if (sourceNode && targetNode) {
            links.push({ source: sourceNode, target: targetNode, count: count });
        }
    });

    // Create SVG
    const width = 800;
    const height = 600;
    
    const svg = d3.select("#network-graph")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);
    
    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
                         .force("charge", d3.forceManyBody().strength(-100))
                         .force("link", d3.forceLink(links).distance(100))
                         .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("line")
                    .attr("class", "link")
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", d => d.count / 10); // Adjust opacity based on interaction count

    // Create nodes
    const node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .attr("fill", "steelblue")
                    .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

    // Add node labels
    const label = svg.selectAll(".label")
                     .data(nodes)
                     .enter().append("text")
                     .attr("class", "label")
                     .attr("font-size", 10)
                     .attr("dx", 12)
                     .attr("dy", ".35em")
                     .text(d => d.id);

    // Tick function for simulation
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label.attr("x", d => d.x)
             .attr("y", d => d.y);
    });

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
