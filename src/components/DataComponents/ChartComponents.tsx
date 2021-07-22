import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const ChartContainerComponent: React.FunctionComponent<ChartComponentProps> = ({
  title: title,
  style: style,
  children
}) => {
  const classes = useStyles();

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

const PurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Guitar Purchase by Store';
  const data = GuitarDataUtils.guitarPurchasePerStore(guitars, 1);

  const chartData = () => ({
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: defaultChartFontColor,
          fontSize: 14
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseStore}>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const AllPurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Every Purchase by Store';
  const data = GuitarDataUtils.guitarComponentPurchasePerStore(guitars, 1);

  const chartData = () => ({
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: defaultChartFontColor,
          fontSize: 14
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseStore}>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const PurchaseYearChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Guitar Purchase by Year';
  const data1 = GuitarDataUtils.guitarPurchasePerYear(guitars);
  const data2 = GuitarDataUtils.guitarTotalPerYear(guitars);

  const chartData = () => ({
    labels: Object.keys(data1),
    datasets: [
      {
        type: 'bar',
        label: 'Year',
        data: Object.values(data1),
        yAxisId: 'yAxis0',
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Total',
        data: Object.values(data2),
        yAxisId: 'yAxis1',
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        borderWidth: 1
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: defaultChartFontColor,
          fontSize: 14
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 1950,
            suggestedMax: 2070
          }
        }
      ],
      yAxes: [
        {
          id: 'yAxis0',
          position: 'right',
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: isMobile ? 70 : 150
          }
        },
        {
          id: 'yAxis1',
          position: 'left',
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: isMobile ? 70 : 150
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseYear}>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const GuitarMakeChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Guitar Makes';
  const data = GuitarDataUtils.guitarMakeData(guitars, 1);

  const chartData = () => ({
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: defaultChartFontColor,
          fontSize: 14
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.guitarMake}>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const GuitarColorChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Guitar Colors';
  const data = GuitarDataUtils.guitarColorData(guitars, 1);

  const chartData = () => ({
    labels: data.map(i => i[0]),
    datasets: [
      {
        data: data.map(i => i[1]),
        fill: true,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 1
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: defaultChartFontColor,
          fontSize: 14
        }
      },
      title: {
        display: false,
        text: chartTitle
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 8 : 10
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.guitarColor}>
      <Bar data={chartData} options={chartOptions} />
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
