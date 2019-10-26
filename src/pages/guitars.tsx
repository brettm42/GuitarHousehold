import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataTable from '../components/TableComponents/DataTable';
import DataDetailTable from '../components/TableComponents/DataDetailTable';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
  isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2)
    }
  })
);

const Guitars: NextPage<Props> = ({ items, pathname, isMobile }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Guitar List')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          Guitar List
        </Typography>
      </div>

      {isMobile
        ? <DataTable items={items} />
        : <DataDetailTable items={items} />}
    </Layout>
  );
};

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();
  const isMobile = IsMobile();

  return { items, pathname, isMobile };
};

export default Guitars;
