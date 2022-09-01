import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Loader from '../../../controllers/loader';

Chart.register(ChartDataLabels);
Chart.defaults.font.family = "'Arimo', 'Arial', sans-serif";
Chart.defaults.font.size = 16;

const userStat = await Loader.getStatistics();

const wordsLearnedPieData = {
  labels: [
    'Изученные слова',
    'Неизученные слова',
  ],
  datasets: [{
    label: 'Изученные слова',
    data: [userStat.learnedWords, 3600 - userStat.learnedWords],
    backgroundColor: [
      '#F26120',
      '#05D7E2',
    ],
    hoverOffset: 4,
  }],
};

const wordsLearnedPieOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        font: {
          family: 'Balsamiq Sans',
        },
      },
    },
    datalabels: {
      color: '#000',
      font: {
        size: 20,
        family: 'Balsamiq Sans',
      },
    },
  },
};

const dailyChartLabels = Object.keys(userStat.optional.completeStat).map((e) => {
  const date = new Date(Number(e));
  return date.toLocaleDateString('ru', { day: 'numeric', month: 'short' });
});

const dailyChartValuesNewWords = Object.values(userStat.optional.completeStat)
  .map((e) => e.newWords);
const dailyChartValuesTotalLearned = Object.values(userStat.optional.completeStat)
  .map((e) => e.totalLearnedWords);

const dailyChartData = {
  labels: dailyChartLabels,
  datasets: [
    {
      type: 'line' as 'bar',
      label: 'Всего изучено слов',
      data: dailyChartValuesTotalLearned,
      borderColor: '#04A6B7',
      backgroundColor: '#05D7E2',
      pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 8,
      yAxisID: 'y',
      datalabels: {
        backgroundColor: '#05D7E2',
        color: '#004249',
        borderRadius: 4,
        padding: 6,
        font: {
          size: 16,
          family: 'Balsamiq Sans',
        },
        align: 'end' as 'end',
        anchor: 'end' as 'end',
      },
    },
    {
      label: 'Новых слов за день',
      data: dailyChartValuesNewWords,
      borderColor: '#F26120',
      backgroundColor: '#FFCE22',
      yAxisID: 'y1',
      datalabels: {
        color: '#F22020',
        font: {
          size: 24,
          family: 'Balsamiq Sans',
        },
        align: 'end' as 'end',
        anchor: 'start' as 'start',
      },
    },
  ],
};

const dailyChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        padding: 24,
        font: {
          size: 20,
          family: 'Balsamiq Sans',
        },
      },
    },
    tooltip: {
      position: 'nearest' as 'nearest',
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as 'index',
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  layout: {
    padding: {
      top: 32,
      right: 16,
      bottom: 16,
      left: 8,
    },
  },
  scales: {
    x: { },
    y: {
      beginAtZero: true,
      type: 'linear' as 'linear',
      display: true,
      position: 'left' as 'left',
    },
    y1: {
      beginAtZero: true,
      type: 'linear' as 'linear',
      display: true,
      position: 'right' as 'right',

      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wordsLearnedPie = new Chart(
  document.querySelector('.stats__words-learned-pie') as HTMLCanvasElement,
  {
    type: 'pie',
    data: wordsLearnedPieData,
    options: wordsLearnedPieOptions,
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DailyChart = new Chart(
  document.querySelector('.stats__daily-chart') as HTMLCanvasElement,
  {
    type: 'bar',
    data: dailyChartData,
    options: dailyChartOptions,
  },
);
