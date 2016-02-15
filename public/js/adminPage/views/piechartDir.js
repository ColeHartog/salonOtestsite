angular.module('salonOApp')
.directive('pieChartDir', function(){
    return {
        
        template: '',
        restrict: 'E',
        controller: 'adminCtrl',
        scope: {
            newClients: '=',
            rebookedClients: '='
        },
        link: function(scope, element){
            
            var width = element[0].parentElement.clientWidth,
    height = element[0].parentElement.clientWidth,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 100);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });
            
            var data = [
                {
                    population: scope.rebookedClients.length,
                    age: 'Rebooked ' + scope.rebookedClients.length.toString()
                },
                {
                    population: (_.difference(_.pluck(scope.newClients,'_id'), _.pluck(scope.rebookedClients,'_id'))).length,
                    age: 'Not Rebooked ' + ((_.difference(_.pluck(scope.newClients,'_id'), _.pluck(scope.rebookedClients,'_id'))).length).toString()
                }
            ];
            console.log(scope.newClients, scope.rebookedClients);
            
            var svg = d3.select(element[0]).append('svg')
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.age); });

            g.append("text")
                .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function(d) { return d.data.age; });
            
            function type(d) {
              d.population = +d.population;
              return d;
            }
            
        },
    }
})