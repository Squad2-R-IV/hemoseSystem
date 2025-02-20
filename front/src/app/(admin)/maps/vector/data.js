export const worldMapOpts = {
  map: 'world',
  // selector: '#world-map-markers',
  zoomOnScroll: false,
  zoomButtons: true,
  markersSelectable: true,
  markers: [{
    name: "Greenland",
    coords: [72, -42]
  }, {
    name: "Canada",
    coords: [56.1304, -106.3468]
  }, {
    name: "Brazil",
    coords: [-14.2350, -51.9253]
  }, {
    name: "Egypt",
    coords: [26.8206, 30.8025]
  }, {
    name: "Russia",
    coords: [61, 105]
  }, {
    name: "China",
    coords: [35.8617, 104.1954]
  }, {
    name: "United States",
    coords: [37.0902, -95.7129]
  }, {
    name: "Norway",
    coords: [60.472024, 8.468946]
  }, {
    name: "Ukraine",
    coords: [48.379433, 31.16558]
  }],
  markerStyle: {
    initial: {
      fill: "#3e60d5"
    },
    selected: {
      fill: "#3e60d56e"
    }
  },
  regionStyle: {
    initial: {
      fill: '#9ca3af69',
      fillOpacity: 1
    }
  },
  labels: {
    markers: {
      render: ({
        marker
      }) => marker?.name
    }
  }
};
export const worldLineMapOpts = {
  // map: "world_merc",
  // selector: "#world-map-markers-line",
  zoomOnScroll: false,
  zoomButtons: false,
  markers: [{
    name: "Greenland",
    coords: [72, -42]
  }, {
    name: "Canada",
    coords: [56.1304, -106.3468]
  }, {
    name: "Brazil",
    coords: [-14.2350, -51.9253]
  }, {
    name: "Egypt",
    coords: [26.8206, 30.8025]
  }, {
    name: "Russia",
    coords: [61, 105]
  }, {
    name: "China",
    coords: [35.8617, 104.1954]
  }, {
    name: "United States",
    coords: [37.0902, -95.7129]
  }, {
    name: "Norway",
    coords: [60.472024, 8.468946]
  }, {
    name: "Ukraine",
    coords: [48.379433, 31.16558]
  }],
  lines: [{
    from: "Canada",
    to: "Egypt"
  }, {
    from: "Russia",
    to: "Egypt"
  }, {
    from: "Greenland",
    to: "Egypt"
  }, {
    from: "Brazil",
    to: "Egypt"
  }, {
    from: "United States",
    to: "Egypt"
  }, {
    from: "China",
    to: "Egypt"
  }, {
    from: "Norway",
    to: "Egypt"
  }, {
    from: "Ukraine",
    to: "Egypt"
  }],
  regionStyle: {
    initial: {
      stroke: "#9ca3af",
      strokeWidth: 0.25,
      fill: '#9ca3af69',
      fillOpacity: 1
    }
  },
  markerStyle: {
    initial: {
      fill: "#9ca3af"
    },
    selected: {
      fill: "#9ca3af"
    }
  },
  lineStyle: {
    animation: true,
    strokeDasharray: "6 3 6"
  }
};
export const CanadaVectorMapOpts = {
  map: 'canada',
  // selector: '#canada-vector-map',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#3e60d5'
    }
  }
};
export const RussiaVectorMapOpts = {
  map: 'russia',
  // selector: '#russia-vector-map',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#5d7186'
    }
  }
};
export const UsaVectorMapOpts = {
  // map: 'us_aea_en',
  // selector: "#usa-vector-map",
  regionStyle: {
    initial: {
      fill: '#3e60d5'
    }
  }
};
export const IraqVectorMapOpts = {
  map: 'iraq',
  // selector: '#iraq-vector-map',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#3e60d5'
    }
  }
};
export const SpainVectorMapOpts = {
  map: 'spain',
  // selector: '#spain-vector-map',
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#ffc35a'
    }
  }
};