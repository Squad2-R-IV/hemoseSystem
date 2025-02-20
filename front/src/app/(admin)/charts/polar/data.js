export const basicPolarChartOpts = {
  series: [14, 23, 21, 17, 15, 10],
  chart: {
    height: 380,
    type: 'polarArea',
  },
  stroke: {
    colors: ['#fff'],
  },
  fill: {
    opacity: 0.8,
  },
  labels: ['Voto A', 'Voto B', 'Voto C', 'Voto D', 'Voto E', 'Voto F'],
  legend: {
    position: 'bottom',
  },
  colors: ['#5b69bc', '#35b8e0', '#10c469', '#fa5c7c', '#f9c851', '#39afd1'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

export const MonochromePolarChartOpts = {
  series: [42, 47, 52, 58, 65],
  chart: {
    height: 380,
    type: 'polarArea',
  },
  labels: ['Rosa A', 'Rosa B', 'Rosa C', 'Rosa D', 'Rosa E'],
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: 'bottom',
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
      spokes: {
        strokeWidth: 0,
      },
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      shadeTo: 'light',
      color: '#5b69bc',
      shadeIntensity: 0.6,
    },
  },
};
