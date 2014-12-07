var bardata = [];

for (var i = 0; i <= 50; i++) {
    bardata.push(Math.random()*30);
}

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height]);

var xScale = d3.scale.ordinal()
    .domain(d3.range(0,bardata.length))
    .rangeBands([0, width]);

var colors = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range(['#FFB832', '#C61C6F']);


var colors = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range(['#FFB832', '#C61C6F']);

var tempColor;

var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', colors)
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('y', height)
        .attr('x', function (d, i) {
            return xScale(i);
        })
        .on('mouseover', function (d) {
            tempColor = this.style.fill
            d3.select(this)
                .transition()
                .style('opacity', 0.5)
                .style('fill', 'yellow')
        })
        .on('mouseout', function (d) {
            d3.select(this)
            .transition().duration(800)
            .style('opacity', 1)
            .style('fill', tempColor)
        });


myChart.transition()
    .attr('height', function (d) {
        return yScale(d);
    })
    .attr('y', function (d) {
        return height - yScale(d);
    })
    .delay(function (d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease('elastic')