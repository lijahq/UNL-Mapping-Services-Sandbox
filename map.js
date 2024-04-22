class Map {
  constructor(selectedCountiesList, unselectedCountiesList) {
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
      counties: selectedCountiesList,
      outline: "#000000",
      outline_size: "2",
      zoom: false,
    };
    this.unselectedCounties = {
      id: "g_11603811",
      name: "Unselected",
      color: "#e2d2a5",
      pattern: "solid",
      counties: unselectedCountiesList,
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

  applyMapModel(displayMap) {
    displayMap.applyModel({
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

var nebraskaCountiesReverse = {
  Adams: 1,
  Antelope: 3,
  Arthur: 5,
  Banner: 7,
  Blaine: 9,
  Boone: 11,
  "Box Butte": 13,
  Boyd: 15,
  Brown: 17,
  Buffalo: 19,
  Burt: 21,
  Butler: 23,
  Cass: 25,
  Cedar: 27,
  Chase: 29,
  Cherry: 31,
  Cheyenne: 33,
  Clay: 35,
  Colfax: 37,
  Cuming: 39,
  Custer: 41,
  Dakota: 43,
  Dawes: 45,
  Dawson: 47,
  Deuel: 49,
  Dixon: 51,
  Dodge: 53,
  Douglas: 55,
  Dundy: 57,
  Fillmore: 59,
  Franklin: 61,
  Frontier: 63,
  Furnas: 65,
  Gage: 67,
  Garden: 69,
  Garfield: 71,
  Gosper: 73,
  Grant: 75,
  Greeley: 77,
  Hall: 79,
  Hamilton: 81,
  Harlan: 83,
  Hayes: 85,
  Hitchcock: 87,
  Holt: 89,
  Hooker: 91,
  Howard: 93,
  Jefferson: 95,
  Johnson: 97,
  Kearney: 99,
  Keith: 101,
  "Keya Paha": 103,
  Kimball: 105,
  Knox: 107,
  Lancaster: 109,
  Lincoln: 111,
  Logan: 113,
  Loup: 115,
  McPherson: 117,
  Madison: 119,
  Merrick: 121,
  Morrill: 123,
  Nance: 125,
  Nemaha: 127,
  Nuckolls: 129,
  Otoe: 131,
  Pawnee: 133,
  Perkins: 135,
  Phelps: 137,
  Pierce: 139,
  Platte: 141,
  Polk: 143,
  "Red Willow": 145,
  Richardson: 147,
  Rock: 149,
  Saline: 151,
  Sarpy: 153,
  Saunders: 155,
  "Scotts Bluff": 157,
  Seward: 159,
  Sheridan: 161,
  Sherman: 163,
  Sioux: 165,
  Stanton: 167,
  Thayer: 169,
  Thomas: 171,
  Thurston: 173,
  Valley: 175,
  Washington: 177,
  Wayne: 179,
  Webster: 181,
  Wheeler: 183,
  York: 185,
};

function selectOptionByText(selectElement, optionText) {
  console.log(optionText);
  var searchText = optionText.toUpperCase(); // Convert text to uppercase for case-insensitive comparison
  for (var i = 0; i < selectElement.options.length; i++) {
    var optionInnerText = selectElement.options[i].innerText.toUpperCase();
    // console.log(optionInnerText);
    // console.log(searchText);
    if (optionInnerText === searchText) {
      selectElement.options[i].selected = !selectElement.options[i].selected; // Toggle the selected state
      break;
    }
  }
}

function trimSpaces(str) {
  // Remove leading and trailing spaces using regular expressions
  return str.replace(/^\s+|\s+$/g, "");
}

function getFipsCode(county) {
  return nebraskaCountiesReverse[county];
}

// initialize map with the configured options. 'main' function.
document.addEventListener("DOMContentLoaded", function (event) {
  var selectList = document.getElementById("edit-county-target-id");
  var options = selectList.getElementsByTagName("option");

  let unselectedCountiesList = [];
  let selectedCountiesList = [];

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var optionText = option.innerText;
    if (option.selected) {
      // If the option is selected, add its FIPS code to the selectedCountiesList
      console.log(optionText + " (Selected)");
      selectedCountiesList.push(getFipsCode(optionText));
    } else {
      // If the option is not selected, add its FIPS code to the unselectedCountiesList
      console.log(optionText);
      unselectedCountiesList.push(getFipsCode(optionText));
    }
  }

  console.log("Selected Counties:", selectedCountiesList);
  console.log("Unselected Counties:", unselectedCountiesList);

  let displayMap = new neMap.init("#map");
  let map = new Map(selectedCountiesList, unselectedCountiesList);
  map.applyMapModel(displayMap);

  displayMap.events.click = function (obj, id, county) {
    console.log(obj);
    console.log(id);
    if (
      map.selectedCounties.counties.includes(id) ||
      map.unselectedCounties.counties.includes(id)
    ) {
      selectOptionByText(selectList, trimSpaces(county));

      map.update_county(id);
      map.applyMapModel(displayMap);
    }
  };
});
