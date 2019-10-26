import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataList from '../components/ListComponents/DataList';

import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2, 0)
    },
    body: {
      padding: theme.spacing(0, 2)
    }
  })
);

const Guitars: NextPage<Props> = ({ items, pathname }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Guitar List')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          Guitar List
        </Typography>
      </div>

      <Typography variant='body2' gutterBottom>
        You are currently on: {pathname}
      </Typography>

      <DataList items={items} />
    </Layout>
  );
};

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();

  return { items, pathname };
};

export default Guitars;
