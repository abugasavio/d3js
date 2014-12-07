var bardata = [];

d3.tsv('data.tsv', function (data) {
    console.log(data);

    for (key in data){
        bardata.push(data[key].value)
    }

    var margin = { top: 30, right: 30, bottom: 40, left: 40}

    var height = 400 -margin.top - margin.bottom,
        width = 600 - margin.left - margin.right,
        barWidth = 50,
        barOffset = 5;

    var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height])

    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeRoundBands([0, width], .1)

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#FFFFFF')
        .style('opacity', 0);

    var colors = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range(['#FFB832', '#C61C6F']);


    var colors = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range(['#FFB832', '#C61C6F']);

    var tempColor;

    var myChart = d3.select('#chart').append('svg')
        .style('background', '#E7E0CB')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left +', '+ margin.top +')')
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
                tooltip.transition()
                    .style('opacity', .9)
                tooltip.html(d)
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top', (d3.event.pageY) + 'px')
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

    //SVG-axes
    var vGuideScale = d3.scale.linear(0)
        .domain([0, d3.max(bardata)])
        .range([height, 0])

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10)

    var vGuide = d3.select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate(' + margin.left +',' + margin.top +')')
        vGuide.selectAll('path')
            .style({fill: 'none', stroke: '#000'})
        vGuide.selectAll('line')
            .style({stroke: '#000'});

    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickValues(xScale.domain().filter(function(d, i) {
            return !(i % (bardata.length/5));
        }))

    var hGuide = d3.select('svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate(' + margin.left +',' + (height +margin.top) +')')
        hGuide.selectAll('path')
            .style({fill: 'none', stroke: '#000'})
        hGuide.selectAll('line')
            .style({stroke: '#000'})

});

