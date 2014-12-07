var bardata = [20, 30, 80, 15, 12,20, 20, 30, 70, 15, 12,20,20, 30, 10, 15, 12,20];

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

d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', colors)
        .attr('width', xScale.rangeBand())
        .attr('height', function (d) {
            return yScale(d);
        })
        .attr('x', function (d, i) {
            return xScale(i);
        })
        .attr('y', function (d, i) {
            return height - yScale(d);
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

/*var myStyles = [
    {width: 150,
     name: 'Migel Wakanyi',
     color: '#268BD2'
    },
    {width: 100,
     name: 'Xavier',
     color: '#FF6600'
    },
    {width: 220,
     name: 'Josephus',
     color: '#0099ff'
    },
    {width: 200,
     name: 'Xerxe',
     color: '#ff6600'
    },
    {width: 200,
     name: 'Andego',
     color: '#0099ff'
    }];


d3.selectAll('#chart')
    .data(myStyles).selectAll('div')
    .enter().append('div')
    .classed('item', true)
    .text(function (d) {
        return d.name;
    })
    .style({'color': '#ffffff',
            'background': function (d) {
            return d.color;},
            'width': function (d) {
            return d.width + "px";}
            });


d3.select("#chart")
    .append('svg')
        .attr('width', 600)
        .attr('height', 800)
        .style('background', '#93A1A1')
    .append("rect")
        .attr('x', 200)
        .attr('y', 200)
        .attr('height', 200)
        .attr('width', 200)
        .style('fill', "#ff6600")
    d3.select('svg')
        .append('circle')
            .attr('cx', 300)
            .attr('cy', 200)
            .attr('r', 50)
            .style('fill', '#840043')
*/