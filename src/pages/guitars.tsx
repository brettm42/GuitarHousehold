import Link from 'next/link';

import Layout from '../components/Layout';
import List from '../components/List';

import { NextPage } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
}

const Guitars: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="GuitarHousehold | Guitar List">
    <h1>Guitar Household</h1>
    <p>You are currently on: {pathname}</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();

  return { items, pathname };
}

export default Guitars;
