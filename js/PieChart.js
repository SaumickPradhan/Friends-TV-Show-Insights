class PieChart {
    constructor(parentElement, width, height, margin) {
      this.parentElement = parentElement;
      this.width = width;
      this.height = height;
      this.margin = margin;
  
      this.initVis();
    }
  
    initVis() {
      const vis = this;
  
      vis.radius = Math.min(vis.width, vis.height) / 2;
  
      // Color scale for emotions
      vis.colorScale = d3.scaleOrdinal()
        .domain(["Joyful", "Scared", "Mad", "Peaceful", "Powerful", "Neutral", "Sad"])
        .range(d3.schemeCategory10);
  
      vis.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(vis.radius);
  
      vis.pie = d3.pie()
        .sort(null)
        .value((d) => d.count);
  
      vis.svg = d3.select(vis.parentElement)
        .append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .append("g")
        .attr("transform", `translate(${vis.width / 2},${vis.height / 2})`);
  
      vis.tooltip = d3.select(vis.parentElement)
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden");
  
      vis.svg.append("g")
        .attr("class", "pie-chart-group");
  
      vis.svg.append("text")
        .attr("class", "pie-title")
        .attr("text-anchor", "middle")
        .attr("y", -vis.height / 2 - 10)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Emotions Distribution");
  
      vis.svg.append("text")
        .attr("class", "emotion-label")
        .attr("text-anchor", "middle")
        .attr("y", vis.height / 2 + 20)
        .style("font-size", "12px")
        .text("");
    }
  
    updateVis(data) {
      const vis = this;
      console.log(data);
  
      const pieChartGroup = vis.svg.select(".pie-chart-group");
  
      const arcs = pieChartGroup.selectAll(".arc")
        .data(vis.pie(data), (d) => d.data.emotion);
  
      arcs.exit().remove();
  
      const arcEnter = arcs.enter()
        .append("g")
        .attr("class", "arc");
  
      arcEnter.append("path")
        .attr("d", vis.arc)
        .attr("fill", (d) => vis.colorScale(d.data.emotion))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function (event, d) {
          vis.tooltip
            .style("visibility", "visible")
            .html(`<div><strong>${d.data.emotion}</strong>: ${d.data.count}</div>`)
            .style("top", `${event.pageY}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          vis.tooltip.style("visibility", "hidden");
        });
  
      arcs.merge(arcEnter)
        .select("path")
        .attr("d", vis.arc);
  
      // Update the emotion label
      const total = d3.sum(data, (d) => d.count);
      const label = total > 0 ? `Total: ${total}` : "No Data";
      vis.svg.select(".emotion-label").text(label);
    }
  }
  