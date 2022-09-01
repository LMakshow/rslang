import '../../../global.scss';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { addHeader } from '../../header/header';
import { addFooter } from '../../footer/footer';
import {
  addStatistics,
  dailyChartData,
  dailyChartOptions,
  wordsLearnedPieData,
  wordsLearnedPieOptions,
} from './statistics-page';

Chart.register(ChartDataLabels);
Chart.defaults.font.family = "'Arimo', 'Arial', sans-serif";
Chart.defaults.font.size = 16;

addHeader();
addStatistics();
addFooter();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const wordsLearnedPie = new Chart(
  document.querySelector('.app-stat__diagram-canvas') as HTMLCanvasElement,
  {
    type: 'pie',
    data: wordsLearnedPieData,
    options: wordsLearnedPieOptions,
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DailyChart = new Chart(
  document.querySelector('.daily-stat__chart-canvas') as HTMLCanvasElement,
  {
    type: 'bar',
    data: dailyChartData,
    options: dailyChartOptions,
  },
);
