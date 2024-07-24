import { Chart, registerables, TooltipItem, ChartData, BarElement } from 'chart.js';

// Registre os componentes necessários
Chart.register(...registerables, BarElement);

class CustomBarElement extends BarElement {
  draw() {
    const ctx = (this as any).chart.ctx; // Acessar o contexto do gráfico de forma correta
    const vm = this as any; // Criar um atalho para this

    const x = vm.x;
    const y = vm.y;
    const base = vm.base;
    const width = vm.width;
    const height = vm.height;
    const borderSkipped = vm.options.borderSkipped;
    const borderWidth = vm.options.borderWidth;
    const backgroundColor = vm.options.backgroundColor;
    const borderColor = vm.options.borderColor;

    let left = x as number;
    let right = x as number;
    let top = y as number;
    let bottom = base as number;
    let signX, signY, radius;
    const cornerRadius = 6;

    const horizontal = (this as any).horizontal; // Verificar a orientação de forma correta

    if (!horizontal) {
      left = (x as number) - (width as number) / 2;
      right = (x as number) + (width as number) / 2;
      top = y as number;
      bottom = base as number;
      signX = 1;
      signY = bottom > top ? 1 : -1;
    } else {
      left = base as number;
      right = x as number;
      top = (y as number) - (height as number) / 2;
      bottom = (y as number) + (height as number) / 2;
      signX = right > left ? 1 : -1;
      signY = 1;
    }

    if (borderWidth) {
      const barSize = Math.min(Math.abs((left as number) - (right as number)), Math.abs((top as number) - (bottom as number)));
      const adjustedBorderWidth = Math.min(borderWidth as number, barSize);
      const halfStroke = adjustedBorderWidth / 2;

      const borderLeft = (left as number) + ((borderSkipped as string) !== 'left' ? halfStroke * signX : 0);
      const borderRight = (right as number) + ((borderSkipped as string) !== 'right' ? -halfStroke * signX : 0);
      const borderTop = (top as number) + ((borderSkipped as string) !== 'top' ? halfStroke * signY : 0);
      const borderBottom = (bottom as number) + ((borderSkipped as string) !== 'bottom' ? -halfStroke * signY : 0);

      if (borderLeft !== borderRight) {
        top = borderTop;
        bottom = borderBottom;
      }
      if (borderTop !== borderBottom) {
        left = borderLeft;
        right = borderRight;
      }
    }

    ctx.beginPath();
    ctx.fillStyle = backgroundColor as string;
    ctx.strokeStyle = borderColor as string;
    ctx.lineWidth = borderWidth as number;

    const corners = [
      [left, bottom],
      [left, top],
      [right, top],
      [right, bottom]
    ];

    const borders = ['bottom', 'left', 'top', 'right'];
    let startCorner = borders.indexOf(borderSkipped as string);
    if (startCorner === -1) {
      startCorner = 0;
    }

    function cornerAt(index: number) {
      return corners[(startCorner + index) % 4];
    }

    let corner = cornerAt(0);
    ctx.moveTo(corner[0], corner[1]);

    for (let i = 1; i < 4; i++) {
      corner = cornerAt(i);
      const nextCornerId = (i + 1) % 4;

      const width = corners[2][0] - corners[1][0];
      const height = corners[0][1] - corners[1][1];
      const x = corners[1][0];
      const y = corners[1][1];
      radius = cornerRadius;

      if (radius > height / 2) {
        radius = height / 2;
      }
      if (radius > width / 2) {
        radius = width / 2;
      }

      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    }

    ctx.fill();
    if (borderWidth) {
      ctx.stroke();
    }
  }
}

// Registre o novo elemento personalizado
Chart.register(CustomBarElement);

var mode = 'light'; // (themeMode) ? themeMode : 'light';
var fonts = {
  base: 'Open Sans'
};

// Colors
var colors = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    'default': '#172b4d',
    'primary': '#5e72e4',
    'secondary': '#f4f5f7',
    'info': '#11cdef',
    'success': '#2dce89',
    'danger': '#f5365c',
    'warning': '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent'
};

export function chartOptions() {
  // Options
  var options = {
    defaults: {
      global: {
        responsive: true,
        maintainAspectRatio: false,
        defaultColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600],
        defaultFontColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600],
        defaultFontFamily: fonts.base,
        defaultFontSize: 13,
        layout: {
          padding: 0
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 16
          }
        },
        elements: {
          point: {
            radius: 0,
            backgroundColor: colors.theme['primary']
          },
          line: {
            tension: 0.4,
            borderWidth: 4,
            borderColor: colors.theme['primary'],
            backgroundColor: colors.transparent,
            borderCapStyle: 'rounded'
          },
          rectangle: {
            backgroundColor: colors.theme['warning']
          },
          arc: {
            backgroundColor: colors.theme['primary'],
            borderColor: (mode == 'dark') ? colors.gray[800] : colors.white,
            borderWidth: 4
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false
        }
      },
      doughnut: {
        cutoutPercentage: 83,
        legendCallback: function(chart: Chart) {
          var data = chart.data as ChartData;
          var content = '';

          if (data.labels && data.datasets && data.datasets[0].backgroundColor) {
            (data.labels as string[]).forEach(function(label: string, index: number) {
              const backgroundColor = data.datasets[0].backgroundColor;
              let bgColor = typeof backgroundColor === 'string' ? backgroundColor : (backgroundColor as string[])[index];

              content += '<span class="chart-legend-item">';
              content += '<i class="chart-legend-indicator" style="background-color: ' + bgColor + '"></i>';
              content += label;
              content += '</span>';
            });
          }

          return content;
        }
      }
    }
  };

  return options;
}

export const parseOptions = (parent: Record<string, any>, options: Record<string, any>) => {
  for (var item in options) {
    if (typeof options[item] !== 'object') {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
};

export const chartExample1 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value: number) {
              if (!(value % 10)) {
                return '$' + value + 'k';
              }
              return null;
            }
          }
        }
      ]
    }
  },
  data: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Performance',
        data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
      }
    ]
  }
};

export const chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value: number) {
              if (!(value % 10)) {
                return value;
              }
              return null;
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item: TooltipItem<'bar'>, data: ChartData) {
          var label = data.datasets[item.datasetIndex].label || '';
          var yLabel = item.label;
          var content = '';
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        }
      }
    }
  },
  data: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [25, 20, 30, 22, 17, 29],
        maxBarThickness: 10
      }
    ]
  }
};
