import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataTable from '../components/TableComponents/DataTable';
import DataDetailTable from '../components/TableComponents/DataDetailTable';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllArchived } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
  isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2)
    },
    emptyList: {
      padding: theme.spacing(4)
    }
  })
);

const Archive: NextPage<Props> = ({ items, pathname, isMobile }) => {
  const classes = useStyles();
  const title = 'Archive';

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          {title}
        </Typography>
      </div>

      {items.length > 0
        ? isMobile
          ? <DataTable items={items} />
          : <DataDetailTable items={items} />
        : <div className={classes.emptyList}>
            <Typography>
              {'Nothing to see here...'}
            </Typography>
          </div>}
    </Layout>
  );
};

Archive.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllArchived();
  const isMobile = IsMobile();

  return { items, pathname, isMobile };
};

export default Archive;
