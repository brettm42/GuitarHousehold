import Layout from '../components/Layout';
import List from '../components/List';
import Typography from '@material-ui/core/Typography';

import { NextPage } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
}

const Guitars: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="Guitar List | GuitarHousehold">
    <Typography variant='h4' gutterBottom>
      Guitar List
    </Typography>
    <Typography variant='body2' gutterBottom>
      You are currently on: {pathname}
    </Typography>

    <List items={items} />
  </Layout>
);

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();

  return { items, pathname };
};

export default Guitars;
