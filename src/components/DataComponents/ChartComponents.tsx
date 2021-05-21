import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Bar, Line } from 'react-chartjs-2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';

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
  const chartTitle = 'Purchase Store';

  const chartData = () => ({
    labels: guitars.map(g => g.purchaseStore),
    datasets: [
      {
        data: guitars.map(g => g.purchaseStore),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#323130',
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: chartTitle
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 50 : 100
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseStore}>
      <Line type='line' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

const PurchaseYearChart: React.FunctionComponent<ChartComponentsProps> = ({
  data: guitars,
  isMobile: isMobile
}) => {
  const classes = useStyles();
  const chartTitle = 'Purchase Store';

  const chartData = () => ({
    labels: guitars.map(g => g.purchaseDate),
    datasets: [
      {
        data: guitars.map(g => g.purchaseDate),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  });

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#323130',
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: chartTitle
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: isMobile ? 50 : 100
          }
        }
      ]
    }
  };

  return (
    <ChartContainerComponent title={chartTitle} style={classes.purchaseYear}>
      <Bar type='horizontalBar' data={chartData} options={chartOptions} />
    </ChartContainerComponent>
  );
};

export {
  PurchaseStoreChart,
  PurchaseYearChart
};
