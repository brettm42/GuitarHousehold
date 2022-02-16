import DataDetailTable from '../components/TableComponents/DataDetailTable';
import DataTable from '../components/TableComponents/DataTable';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';

import { NextPage } from 'next';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { buildPageTitle } from '../components/viewutils';
import { Guitar } from '../interfaces/models/guitar';

type GuitarListProps = {
  items: Guitar[];
  pathname: string;
  isMobile: boolean;
  title: string;
  columns: string;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    title: {
      padding: theme.spacing(4, 2, 0, 2)
    },
    emptyList: {
      padding: theme.spacing(4)
    }
  };
});

const GuitarList: NextPage<GuitarListProps> = ({ items, pathname, isMobile, title, columns }) => {
  const { classes } = useStyles();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
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
              {`Nothing to see here, looks like no ${title.toLocaleLowerCase()} results were found`}
            </Typography>
          </div>}
    </Layout>
  );
};

export default GuitarList;
