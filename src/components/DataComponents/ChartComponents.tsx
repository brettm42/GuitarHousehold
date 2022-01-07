import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarDataUtils from '../../data/guitarservice/guitardatautils';

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
      padding: theme.spacing(1, 0, 0, 1)
    },
    detailChildren: {
      padding: theme.spacing(0, 1)
    },
    detailDivider: {
      minWidth: '50%',
      padding: theme.spacing(0, 1, 2, 2)
    },
    purchaseStore: {},
    purchaseYear: {},
    guitarColor: {},
    guitarMake: {}
  };
});

const ChartContainerComponent: React.FunctionComponent<ChartComponentProps> = ({ title, style, children }) => {
  const { classes } = useStyles();

  return (
    <div className={style}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {title}
      </Typography>
      <Grid container>
        {children}
      </Grid>
    </div>
  );
};

const PurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = 'Guitar Purchase by Store';
  const data = GuitarDataUtils.guitarPurchasePerStore(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: 14
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
        suggestedMin: 0,
        max: isMobile ? 8 : 10
      },
      y: {
        suggestedMin: 0,
        max: isMobile ? 8 : 10
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
  const chartTitle = 'Every Purchase by Store';
  const data = GuitarDataUtils.guitarComponentPurchasePerStore(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: 14
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
        suggestedMin: 0,
        max: isMobile ? 8 : 10
      },
      y: {
        suggestedMin: 0,
        max: isMobile ? 8 : 10
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
  const chartTitle = 'Guitar Purchase by Year';
  const data1 = GuitarDataUtils.guitarPurchasePerYear(guitars);
  const data2 = GuitarDataUtils.guitarTotalPerYear(guitars);

  const chartData: ChartData<'bar'> = {
    labels: Object.keys(data1),
    datasets: [
      {
        type: 'bar',
        label: 'Year',
        data: Object.values(data1),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 1
      },
      {
        label: 'Total',
        data: Object.values(data2),
        borderWidth: 1
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: 14
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
        suggestedMin: 1950,
        max: 2070
      },
      y0: {
        position: 'right',
        beginAtZero: true,
        max: isMobile ? 70 : 150
      },
      y1: {
        position: 'left',
        beginAtZero: true,
        max: isMobile ? 70 : 150
      }
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseYear}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const GuitarMakeChart: React.FunctionComponent<ChartComponentsProps> = ({ data: guitars, isMobile }) => {
  const { classes } = useStyles();
  const chartTitle = 'Guitar Makes';
  const data = GuitarDataUtils.guitarMakeData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: 14
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
        suggestedMin: 0,
        suggestedMax: isMobile ? 8 : 10
      },
      y: {
        suggestedMin: 0,
        suggestedMax: isMobile ? 8 : 10
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
  const chartTitle = 'Guitar Colors';
  const data = GuitarDataUtils.guitarColorData(guitars, 1);

  const chartData: ChartData<'bar'> = {
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: defaultChartFontColor,
          font: {
            size: 14
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
        suggestedMin: 0,
        suggestedMax: isMobile ? 8 : 10
      },
      y: {
        suggestedMin: 0,
        suggestedMax: isMobile ? 8 : 10
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
  PurchaseStoreChart,
  PurchaseYearChart
};
