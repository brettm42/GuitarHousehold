import Typography from '@material-ui/core/Typography';

import DataDetailTable from '../components/TableComponents/DataDetailTable';
import DataTable from '../components/TableComponents/DataTable';
import Layout from '../components/Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';

type GuitarListProps = {
  items: Guitar[];
  pathname: string;
  isMobile: boolean;
  title: string;
  columns: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 2, 0, 2)
    },
    emptyList: {
      padding: theme.spacing(4)
    }
  })
);

const GuitarList: NextPage<GuitarListProps> = ({ items, pathname, isMobile, title, columns }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4'>
          {title}
        </Typography>
      </div>

      {items.length > 0
        ? isMobile
          ? <DataTable items={items} columns={columns} />
          : <DataDetailTable items={items} columns={columns} />
        : <div className={classes.emptyList}>
            <Typography>
              {`Nothing to see here... looks like no ${title.toLocaleLowerCase()} results were found`}
            </Typography>
          </div>}
    </Layout>
  );
};

export default GuitarList;
