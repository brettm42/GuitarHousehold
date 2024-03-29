import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
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
  Title 
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarDataUtils from '../../data/guitarservice/guitardatautils';
import { getStringText } from '../../data/stringservice/stringservice';
import { formatCurrencyToString } from '../../infrastructure/datautils';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title);

type ChartComponentsProps = {
  data: Guitar[];
  isMobile: boolean;
};

type ChartComponentProps = {
  title: string;
  style: string;
}

const defaultChartBackgroundColor = 
  [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

const defaultChartBorderColor = 
  [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

const defaultChartFontColor = '#323130';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    detail: {
      minWidth: '50%',
      padding: theme.spacing(0, 1, 1, 2)
    },
    detailTitle: {
      textAlign: 'left',
      padding: theme.spacing(1, 0, 2, 0)
    },
    detailChildren: {
      padding: theme.spacing(0, 1)
    },
    detailDivider: {
      minWidth: '50%',
      padding: theme.spacing(0, 1, 2, 2)
    },
    purchaseStore: {
      padding: theme.spacing(1, 2)
    },
    purchaseYear: {
      padding: theme.spacing(1, 2)
    },
    guitarColor: {
      padding: theme.spacing(1, 2)
    },
    guitarMake: {
      padding: theme.spacing(1, 2)
    },
    guitarPrice: {
      padding: theme.spacing(1, 2)
    }
  };
});

const ChartContainerComponent: React.FunctionComponent<ChartComponentProps> = ({ title, style, children }) => {
  const { classes } = useStyles();

  return (
    <div className={style}>
      <Typography className={classes.detailTitle} variant='subtitle2'>
        {title}
      </Typography>
      <Grid container>
        {children}
      </Grid>
    </div>
  );
};

const GuitarPriceChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = getStringText('GuitarPriceChartTitle');
  const data1 = GuitarDataUtils.guitarPriceData(guitars);

  const chartData: ChartData<'line'> = {
    labels: Object.keys(data1),
    datasets: [
      {
        data: Object.values(data1),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        tension: 0.4
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: true
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 16 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';

            if (label) {
                label += ': ';
            }
            if (context.parsed.y !== null) {
                label += formatCurrencyToString(context.parsed.y);
            }

            return label;
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.guitarPrice}>
      <Chart type='line' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const PurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = getStringText('GuitarPurchaseStoreChartTitle');
  const data = GuitarDataUtils.guitarPurchasePerStore(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: { 
          topRight: 5, 
          bottomRight: 5
        },
        borderSkipped: false
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseStore}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const AllPurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = getStringText('GuitarAllPurchaseStoreChartTitle');
  const data = GuitarDataUtils.guitarComponentPurchasePerStore(guitars, 2);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: { 
          topRight: 5, 
          bottomRight: 5
        },
        borderSkipped: false
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseStore}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const PurchaseYearChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
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
        borderRadius: { 
          topLeft: 5, 
          topRight: 5
        },
        borderSkipped: false,
        stack: 'combined',
        yAxisID: 'y'
      },
      {
        type: 'line' as const,
        label: getStringText('GuitarPurchaseYearChartLabel1'),
        data: Object.values(data2),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        stack: 'combined',
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      y: {
        type: 'linear',
        stacked: true
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseYear}>
      <Chart type='line' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const GuitarMakeChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = getStringText('GuitarMakesChartTitle');
  const data = GuitarDataUtils.guitarMakeData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: { 
          topRight: 5, 
          bottomRight: 5
        },
        borderSkipped: false
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.guitarMake}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const GuitarColorChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = getStringText('GuitarColorChartTitle');
  const data = GuitarDataUtils.guitarColorData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 2,
        borderRadius: { 
          topRight: 5, 
          bottomRight: 5
        },
        borderSkipped: false
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      x: {
        suggestedMin: isMobile ? 2 : 1
      },
      y: {
        suggestedMin: isMobile ? 2 : 1,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.guitarColor}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

export {
  AllPurchaseStoreChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  PurchaseStoreChart,
  PurchaseYearChart
};
