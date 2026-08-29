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
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarDataUtils from '../../data/guitarservice/guitardatautils';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import { getStringText } from '../../data/stringservice/stringservice';
import { formatCurrencyToString } from '../../infrastructure/datautils';
import { useAccount } from '../../contexts/AccountContext';
import { averagePriceForKeywordsAsync } from '../../data/reverbservice/reverbservice';

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
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

const GuitarPriceChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
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

const StringAgeChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
  const rawData = GuitarDataUtils.guitarStringAgeData(guitars);
  const labels = rawData.map((i) => i[0]);
  const values = rawData.map((i) => i[1]);
  const details = rawData.map((i) => i[2]);

  // Color code: >12 months = Red, 6-12 months = Amber, <6 months = Emerald
  const bgColors = values.map((m) =>
    m > 12
      ? 'rgba(239, 68, 68, 0.4)'
      : m > 6
        ? 'rgba(245, 158, 11, 0.4)'
        : 'rgba(16, 185, 129, 0.4)'
  );

  const borderColors = values.map((m) =>
    m > 12
      ? 'rgba(239, 68, 68, 1)'
      : m > 6
        ? 'rgba(245, 158, 11, 1)'
        : 'rgba(16, 185, 129, 1)'
  );

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: bgColors,
        borderColor: borderColors,
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex;
            const months = values[idx];
            const extra = details[idx];
            return ` ${months} months old • ${extra}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'String Age (Months)',
          font: { size: 11, weight: 'bold' },
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title="String Age & Maintenance Health">
      <div className="w-full h-72">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const BodyStyleChart: React.FC<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const data = GuitarDataUtils.guitarBodyStyleData(guitars, 0);

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
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
        ticks: { stepSize: 1 },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title="Body Styles & Instrument Types">
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const ScaleLengthChart: React.FC<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const data = GuitarDataUtils.guitarScaleData(guitars, 0);

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
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1,
        ticks: { stepSize: 1 },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title="Scale Length Breakdown">
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const ManufactureDecadeChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
  const data = GuitarDataUtils.guitarManufactureDecadeData(guitars);

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i[0]),
    datasets: [
      {
        data: data.map((i) => i[1]),
        backgroundColor: 'rgba(247, 162, 120, 0.4)',
        borderColor: 'rgba(247, 162, 120, 1)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <ChartContainerComponent title="Manufacture Era & Vintage Decades">
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const ProjectDurationChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
  const data = GuitarDataUtils.guitarProjectDurationData(guitars);

  if (data.length === 0) {
    return null;
  }

  const chartData: ChartData<'bar'> = {
    labels: data.map((i) => i.name),
    datasets: [
      {
        data: data.map((i) => i.days),
        backgroundColor: data.map((i) =>
          i.isComplete ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'
        ),
        borderColor: data.map((i) =>
          i.isComplete ? 'rgba(16, 185, 129, 1)' : 'rgba(245, 158, 11, 1)'
        ),
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex;
            return ` ${data[idx].details}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Duration (Days)',
          font: { size: 11, weight: 'bold' },
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title="Project Build Durations & Turnaround">
      <div className="w-full h-64">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </ChartContainerComponent>
  );
};

const ValueAppreciationChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
  const { activeAccount, accountData } = useAccount();
  const [reverbEstimates, setReverbEstimates] = React.useState<Record<string, number>>({});

  const reverbToken =
    activeAccount?.tokens?.reverb ||
    accountData?.account?.tokens?.reverb ||
    activeAccount?.assets?.tokens?.reverb ||
    accountData?.assets?.tokens?.reverb;

  const eligibleGuitars = React.useMemo(() => {
    return guitars
      .filter((g) => {
        const cost = GuitarUtils.getGuitarCost(g);
        return cost > 0;
      })
      .slice(0, 8);
  }, [guitars]);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchEstimates() {
      const estimates: Record<string, number> = {};
      for (const g of eligibleGuitars) {
        try {
          const avgStr = await averagePriceForKeywordsAsync(
            g.name,
            reverbToken,
            activeAccount?.id
          );
          const val = parseFloat(avgStr);
          if (!isNaN(val)) {
            estimates[g.name] = val;
          }
        } catch {
          // ignore
        }
      }
      if (isMounted) {
        setReverbEstimates(estimates);
      }
    }
    fetchEstimates();
    return () => {
      isMounted = false;
    };
  }, [eligibleGuitars, reverbToken, activeAccount?.id]);

  const labels = eligibleGuitars.map((g) => g.name);
  const purchasePrices = eligibleGuitars.map((g) => GuitarUtils.getGuitarCost(g));
  const estimatedValues = eligibleGuitars.map((g) => reverbEstimates[g.name] || 0);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Purchase Price',
        data: purchasePrices,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Reverb Est. Value',
        data: estimatedValues,
        backgroundColor: 'rgba(254, 107, 139, 0.5)',
        borderColor: 'rgba(254, 107, 139, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed.x || 0;
            return ` ${context.dataset.label}: ${formatCurrencyToString(val)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price ($ USD)',
          font: { size: 11, weight: 'bold' },
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <ChartContainerComponent title="Purchase Price vs. Reverb Market Value">
      <div className="w-full h-80">
        <Chart type="bar" data={chartData} options={chartOptions} />
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

const PurchaseYearChart: React.FC<ChartComponentsProps> = ({ data: guitars }) => {
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

const GuitarMakeChart: React.FC<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
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

const GuitarColorChart: React.FC<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
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
  BodyStyleChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  ManufactureDecadeChart,
  ProjectDurationChart,
  PurchaseStoreChart,
  PurchaseYearChart,
  ScaleLengthChart,
  StringAgeChart,
  ValueAppreciationChart,
};
