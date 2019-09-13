
import * as React from 'react';
import List from '../components/List';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryProps = {
  guitars: Guitar[]
  projects: Project[]
}

const Summary: React.FunctionComponent<SummaryProps> = ({
  guitars: guitars,
  projects: projects,
}) => (
  <div>
    <div>
      <h3>{guitars.length + projects.length} Guitars ({projects.length} are projects)</h3>
    </div>

    <div>
      <h3>Most popular:</h3>
      <ul>
        <li>Make: {GuitarUtils.mostCommonMake([...guitars, ...projects])}</li>
        <li>Body: {GuitarUtils.mostCommonBody([...guitars, ...projects])}</li>
        <li>Color: {GuitarUtils.mostCommonColor([...guitars, ...projects])}</li>
        <li>Tuning: {GuitarUtils.mostCommonTuning([...guitars, ...projects])}</li>
        <li>Scale length: {GuitarUtils.mostCommonScale([...guitars, ...projects])}</li>
        <li>Pickup: {GuitarUtils.mostCommonPickupType([...guitars, ...projects])}</li>
        <li>Number of Pickups: {GuitarUtils.mostCommonPickupNumber([...guitars, ...projects])}</li>
      </ul>
    </div>

    <div>
      <h3>Guitars missing cases:</h3>
      <List items={[...guitars, ...projects].filter((i: Guitar) => !GuitarUtils.hasCase(i))} />
    </div>
  </div>
);

export default Summary;
