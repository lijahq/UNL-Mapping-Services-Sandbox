class Map {
  constructor() {
    this.displayMap = new neMap.init("#map");

    this.mapTitle = "test";
    this.legendTitle = "";
    this.zoomTo = [];
    this.baseColor = "#c7c8ca";
    this.showCountyNames = false;
    this.showCountyFips = false;
    this.showLegend = false;
    this.legendType = "standard";
    this.selectedCounties = {
      id: "g_01601011",
      name: "Selected",
      color: "#d00000",
      pattern: "solid",
      counties: [111, 115, 139, 171, 31, 41, 75, 77, 91],
      outline: "#000000",
      outline_size: "2",
      zoom: false,
    };
    this.unselectedCounties = {
      id: "g_11603811",
      name: "Unselected",
      color: "#e2d2a5",
      pattern: "solid",
      counties: [1, 129, 137, 19, 61, 79, 83, 99],
      outline: "#000000",
      outline_size: "2",
      zoom: false,
    };
    this.labels = [];
    this.pins = [];
    this.legendRange = [null, null];
    this.countyData = [
      { countyName: "CHERRY ", fipsCode: 31031, countyData: "" },
    ];
    this.countyDataGradients = null;
    this.showCountyData = true;
  }

  isCountySelected(county_id) {
    return this.selectedCounties.counties.includes(county_id);
  }

  update_county(county_id) {
    console.log(this.isCountySelected(county_id));
    if (this.isCountySelected(county_id)) {
      this.selectedCounties.counties = this.selectedCounties.counties.filter(
        (c) => c !== county_id
      );
      this.unselectedCounties.counties.push(county_id);
    } else {
      this.unselectedCounties.counties =
        this.unselectedCounties.counties.filter((c) => c !== county_id);
      this.selectedCounties.counties.push(county_id);
    }
  }

  applyMapModel() {
    this.displayMap.applyModel({
      mapTitle: this.mapTitle,
      legendTitle: this.legendTitle,
      zoomTo: this.zoomTo,
      baseColor: this.baseColor,
      showCountyNames: this.showCountyNames,
      showCountyFips: this.showCountyFips,
      showLegend: this.showLegend,
      legendType: this.legendType,
      countyGroups: [this.selectedCounties, this.unselectedCounties],
      labels: this.labels,
      pins: this.pins,
      legendRange: this.legendRange,
      countyData: this.countyData,
      countyDataGradients: this.countyDataGradients,
      showCountyData: this.showCountyData,
    });
  }
}

// initialize map with the configured options. 'main' function.
document.addEventListener("DOMContentLoaded", function (event) {
  let map = new Map();
  map.applyMapModel();

  map.displayMap.events.click = function (obj, id, county) {
    console.log(obj);
    console.log(id);
    console.log(county);

    map.update_county(id);
    map.applyMapModel();
  };
});
