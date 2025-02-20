// tipo exportado SparkChartType = {
//   total: string
//   porcentagem: number
//   linhaGrafico: qualquer
//   barraGrafico: qualquer
//   variante: string
// }

const randomizarArray = function (arg) {
  const array = arg.slice();
  let indiceAtual = array.length,
    valorTemporario,
    indiceAleatorio;
  while (0 !== indiceAtual) {
    indiceAleatorio = Math.floor(Math.random() * indiceAtual);
    indiceAtual -= 1;
    valorTemporario = array[indiceAtual];
    array[indiceAtual] = array[indiceAleatorio];
    array[indiceAleatorio] = valorTemporario;
  }
  return array;
};

// dados para os sparklines que aparecem abaixo da área do cabeçalho
const dadosSparkline = [
  47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
  27, 54, 43, 19, 46,
];
export const optsGraficoSpark1 = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Vendas Paces ',
      data: randomizarArray(dadosSparkline),
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ['#5b69bc'],
  title: {
    text: '$424,652',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Vendas',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
};
export const optsGraficoSpark2 = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Despesas Paces ',
      data: randomizarArray(dadosSparkline),
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ['#ffbc00'],
  title: {
    text: '$235,312',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Despesas',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
};
export const optsGraficoSpark3 = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Lucros Líquidos ',
      data: randomizarArray(dadosSparkline),
    },
  ],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  yaxis: {
    min: 0,
  },
  colors: ['#10c469'],
  title: {
    text: '$135,965',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Lucros',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
};

export const optsGrafico1 = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  colors: ['#5b69bc'],
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {},
    marker: {
      show: false,
    },
  },
};
export const optsGrafico5 = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#5b69bc'],
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico2 = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#10c469'],
  series: [
    {
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico6 = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#10c469'],
  series: [
    {
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico3 = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#f9c851'],
  series: [
    {
      data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico7 = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#f9c851'],
  series: [
    {
      data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico4 = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#fa5c7c'],
  series: [
    {
      data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
export const optsGrafico8 = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#fa5c7c'],
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return '';
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
