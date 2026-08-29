import * as React from 'react';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarDataUtils from '../../data/guitarservice/guitardatautils';
import { getStringText } from '../../data/stringservice/stringservice';
import { formatCurrencyToString } from '../../infrastructure/datautils';

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

type ChartComponentsProps = {
  data: Guitar[];
  isMobile?: boolean;
};

type ChartContainerProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const defaultChartBackgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const defaultChartBorderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];


const ChartContainerComponent: React.FC<ChartContainerProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <h3 className="font-bold text-neutral-900 text-sm mb-3 pb-1 border-b border-black/10">
        {title}
      </h3>
      <div className="w-full flex-1 flex items-center justify-center min-h-[220px]">
        {children}
      </div>
    </div>
  );
};

const GuitarPriceChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
}) => {
  const chartTitle = getStringText('GuitarPriceChartTitle');
  const data1 = GuitarDataUtils.guitarPriceData(guitars);

  const chartData: ChartData<'line'> = {
    labels: Object.keys(data1),
    datasets: [
      {
        data: Object.values(data1),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: true,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrencyToString(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const PurchaseStoreChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
  isMobile,
}) => {
  const chartTitle = getStringText('GuitarPurchaseStoreChartTitle');
  const data = GuitarDataUtils.guitarPurchasePerStore(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i[0]),
    datasets: [
      {
        data: data.map((i) => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const AllPurchaseStoreChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
  isMobile,
}) => {
  const chartTitle = getStringText('GuitarAllPurchaseStoreChartTitle');
  const data = GuitarDataUtils.guitarComponentPurchasePerStore(guitars, 2);

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i[0]),
    datasets: [
      {
        data: data.map((i) => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const PurchaseYearChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
}) => {
  const chartTitle = getStringText('GuitarPurchaseYearChartTitle');
  const data1 = GuitarDataUtils.guitarPurchasePerYear(guitars);
  const data2 = GuitarDataUtils.guitarTotalPerYear(guitars);

  const chartData = {
    labels: Object.keys(data1),
    datasets: [
      {
        type: 'bar' as const,
        label: getStringText('GuitarPurchaseYearChartLabel1'),
        data: Object.values(data1),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: getStringText('GuitarPurchaseYearChartLabel1'),
        data: Object.values(data2),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear',
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const GuitarMakeChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
  isMobile,
}) => {
  const chartTitle = getStringText('GuitarMakesChartTitle');
  const data = GuitarDataUtils.guitarMakeData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i[0]),
    datasets: [
      {
        data: data.map((i) => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const GuitarColorChart: React.FC<ChartComponentsProps> = ({
  data: guitars,
  isMobile,
}) => {
  const chartTitle = getStringText('GuitarColorChartTitle');
  const data = GuitarDataUtils.guitarColorData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i[0]),
    datasets: [
      {
        data: data.map((i) => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title={chartTitle}>
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

export {
  AllPurchaseStoreChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  PurchaseStoreChart,
  PurchaseYearChart,
};
