

document.addEventListener('DOMContentLoaded', function(event) {
  var madeMap = new neMap.init('#map');
  madeMap.applyModel({
      "mapTitle": null,
      "legendTitle": "",
      "zoomTo": [],
      "baseColor": "#f5f1e7",
      "showCountyNames": false,
      "showCountyFips": false,
      "showLegend": false,
      "legendType": "standard",
      "countyGroups": [],
      "labels": [],
      "pins": [],
      "legendRange": [null, null],
      "countyData": [],
      "countyDataGradients": null,
      "showCountyData": true
  });

  madeMap.events.click = function(obj, id, county){
      console.log(obj);
      console.log(id);
      console.log(county);
  };
  

});