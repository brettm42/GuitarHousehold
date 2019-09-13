import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Summary from '../components/Summary';
import { NextPage } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findAllGuitars, findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  guitars: Guitar[]
  projects: Project[]
}

const IndexPage: NextPage<Props> = ({ guitars, projects }) => {
  return (
    <Layout title="GuitarHousehold | Home">
      <h1>GuitarHousehold 👋</h1>
      
      <div>
        <Summary guitars={guitars} projects={projects} />
      </div>

      <div>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </Layout>
  );
}

IndexPage.getInitialProps = async () => {
  const guitars: Guitar[] = await findAllGuitars();
  const projects: Project[] = await findAllProjects();

  return { guitars, projects };
}

export default IndexPage;
