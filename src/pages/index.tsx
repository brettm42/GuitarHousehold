import * as React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import Summary from '../components/Summary';
import HouseholdGridList from '../components/HouseholdGridList';

import { NextPage } from 'next';
import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findAllGuitars, findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  guitars: Guitar[],
  projects: Project[]
}



const IndexPage: NextPage<Props> = ({ guitars, projects }) => {
const data = [...guitars, ...projects];

  return (
    <Layout title="GuitarHousehold | Home">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      <h1>GuitarHousehold 👋</h1>

      <div>
        <Summary data={data} />
      </div>

      <div>
        <HouseholdGridList data={data} />
      </div>

      <div>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
      <style jsx global>{`
        .json {
          background: lightgrey
        }
    `}</style>
    </Layout>
  );
}

IndexPage.getInitialProps = async () => {
  const guitars: Guitar[] = await findAllGuitars();
  const projects: Project[] = await findAllProjects();

  return { guitars, projects };
}

export default IndexPage;
