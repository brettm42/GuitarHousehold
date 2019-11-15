import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataTable from '../components/TableComponents/DataTable';
import DataDetailTable from '../components/TableComponents/DataDetailTable';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';

type Props = {
  items: Guitar[]
  pathname: string
  isMobile: boolean
  title: string
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

const GuitarList: NextPage<Props> = ({ items, pathname, isMobile, title }) => {
  const classes = useStyles();

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
              {`Nothing to see here... looks like no ${title.toLocaleLowerCase()} results were found`}
            </Typography>
          </div>}
    </Layout>
  );
};

export default GuitarList;