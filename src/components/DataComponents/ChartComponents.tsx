import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Bar } from 'react-chartjs-2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
    purchaseYear: {}
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
  const data = GuitarDataUtils.guitarPurchasePerStore(guitars);

  const chartData = () => ({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ]
  });

  const chartOptions = {
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
          fontColor: '#323130',
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
      <Bar type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const AllPurchaseStoreChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Every Purchase by Store';
  const data = GuitarDataUtils.guitarComponentPurchasePerStore(guitars);

  const chartData = () => ({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ]
  });

  const chartOptions = {
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
          fontColor: '#323130',
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
      <Bar type='bar' data={chartData} options={chartOptions} />
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
        data: Object.values(data1),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Total',
        data: Object.values(data2),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      }
    ]
  });

  const chartOptions = {
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
          fontColor: '#323130',
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
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: isMobile ? 50 : 100
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseYear}>
      <Bar type='bar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

export {
  AllPurchaseStoreChart,
  PurchaseStoreChart,
  PurchaseYearChart
};
