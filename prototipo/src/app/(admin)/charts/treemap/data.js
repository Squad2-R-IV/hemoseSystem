export const basicTreemapChartOpts = {
  series: [
    {
      data: [
        {
          x: 'Nova Délhi',
          y: 218,
        },
        {
          x: 'Calcutá',
          y: 149,
        },
        {
          x: 'Mumbai',
          y: 184,
        },
        {
          x: 'Ahmedabad',
          y: 55,
        },
        {
          x: 'Bangaluru',
          y: 84,
        },
        {
          x: 'Pune',
          y: 31,
        },
        {
          x: 'Chennai',
          y: 70,
        },
        {
          x: 'Jaipur',
          y: 30,
        },
        {
          x: 'Surat',
          y: 44,
        },
        {
          x: 'Hyderabad',
          y: 68,
        },
        {
          x: 'Lucknow',
          y: 28,
        },
        {
          x: 'Indore',
          y: 19,
        },
        {
          x: 'Kanpur',
          y: 29,
        },
      ],
    },
  ],
  colors: ['#39afd1'],
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: 'treemap',
  },
  title: {
    text: 'Treemap Básico',
    align: 'center',
  },
};

export const multipleTreemapChartOpts = {
  series: [
    {
      name: 'Desktops',
      data: [
        {
          x: 'ABC',
          y: 10,
        },
        {
          x: 'DEF',
          y: 60,
        },
        {
          x: 'XYZ',
          y: 41,
        },
      ],
    },
    {
      name: 'Mobile',
      data: [
        {
          x: 'ABCD',
          y: 10,
        },
        {
          x: 'DEFG',
          y: 20,
        },
        {
          x: 'WXYZ',
          y: 51,
        },
        {
          x: 'PQR',
          y: 30,
        },
        {
          x: 'MNO',
          y: 20,
        },
        {
          x: 'CDE',
          y: 30,
        },
      ],
    },
  ],
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: 'treemap',
  },
  colors: ['#fa5c7c', '#35b8e0'],
  title: {
    text: 'Treemap Multi-dimensional',
    align: 'center',
  },
};

export const distributedTreemapChartOpts = {
  series: [
    {
      data: [
        {
          x: 'Nova Délhi',
          y: 218,
        },
        {
          x: 'Calcutá',
          y: 149,
        },
        {
          x: 'Mumbai',
          y: 184,
        },
        {
          x: 'Ahmedabad',
          y: 55,
        },
        {
          x: 'Bangaluru',
          y: 84,
        },
        {
          x: 'Pune',
          y: 31,
        },
        {
          x: 'Chennai',
          y: 70,
        },
        {
          x: 'Jaipur',
          y: 30,
        },
        {
          x: 'Surat',
          y: 44,
        },
        {
          x: 'Hyderabad',
          y: 68,
        },
        {
          x: 'Lucknow',
          y: 28,
        },
        {
          x: 'Indore',
          y: 19,
        },
        {
          x: 'Kanpur',
          y: 29,
        },
      ],
    },
  ],
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: 'treemap',
  },
  title: {
    text: 'Treemap Distribuído (cor diferente para cada célula)',
    align: 'center',
  },
  colors: [
    '#5b69bc',
    '#10c469',
    '#fa5c7c',
    '#35b8e0',
    '#39afd1',
    '#ffc35a',
    '#eef2f7',
    '#313a46',
  ],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
    },
  },
};

export const colorTreemapChartOpts = {
  series: [
    {
      data: [
        {
          x: 'INTC',
          y: 1.2,
        },
        {
          x: 'GS',
          y: 0.4,
        },
        {
          x: 'CVX',
          y: -1.4,
        },
        {
          x: 'GE',
          y: 2.7,
        },
        {
          x: 'CAT',
          y: -0.3,
        },
        {
          x: 'RTX',
          y: 5.1,
        },
        {
          x: 'CSCO',
          y: -2.3,
        },
        {
          x: 'JNJ',
          y: 2.1,
        },
        {
          x: 'PG',
          y: 0.3,
        },
        {
          x: 'TRV',
          y: 0.12,
        },
        {
          x: 'MMM',
          y: -2.31,
        },
        {
          x: 'NKE',
          y: 3.98,
        },
        {
          x: 'IYT',
          y: 1.67,
        },
      ],
    },
  ],
  legend: {
    show: false,
  },
  chart: {
    height: 350,
    type: 'treemap',
  },
  title: {
    text: 'Treemap com Escala de Cores',
    align: 'center',
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
    },
    offsetY: -4,
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          {
            from: -6,
            to: 0,
            color: '#5b69bc',
          },
          {
            from: 0.001,
            to: 6,
            color: '#39afd1',
          },
        ],
      },
    },
  },
};
