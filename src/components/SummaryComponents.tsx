import * as React from 'react';

import List from '../components/List';

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryComponentProps = {
  data: Guitar[]
}

const MostCommonComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Most Common...</h3>
    <ul>
      <li>Make: {GuitarUtils.mostCommonMake(guitars)}</li>
      <li>Body: {GuitarUtils.mostCommonBody(guitars)}</li>
      <li>Color: {GuitarUtils.mostCommonColor(guitars)}</li>
      <li>Tuning: {GuitarUtils.mostCommonTuning(guitars)}</li>
      <li>Scale Length: {GuitarUtils.mostCommonScale(guitars)}</li>
      <li>Pickup: {GuitarUtils.mostCommonPickupType(guitars)}</li>
      <li>Number of Pickups: {GuitarUtils.mostCommonPickupNumber(guitars)}</li>
      <li>Case Style: {GuitarUtils.mostCommonCaseStyle(guitars)}</li>
      <li>Store: {GuitarUtils.mostCommonStore(guitars)}</li>
    </ul>
  </div>
);

const MissingCasesComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Guitars Missing Cases:</h3>
    <List items={guitars.filter((i: Guitar) => !GuitarUtils.hasCase(i))} />
  </div>
);

const OutliersComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Outliers:</h3>
    <ul>
      <li>Oldest: {GuitarUtils.oldestGuitar(guitars)}</li>
      <li>Newest: {GuitarUtils.newestGuitar(guitars)}</li>
      <li>Most Pickups: {GuitarUtils.mostPickups(guitars)}</li>
      <li>Most Modifications: {GuitarUtils.mostModifications(guitars)}</li>
      <li>Longest Scale: n/a</li>
      <li>Shortest Scale: n/a</li>
      <li>Longest Project: {GuitarUtils.longestProject(guitars)}</li>
      <li>Shortest Project: {GuitarUtils.shortestProject(guitars)}</li>
    </ul>
  </div>
);

const ValuesComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Values:</h3>
    <ul>
      <li>Cheapest: {GuitarUtils.cheapest(guitars)} (with case {GuitarUtils.cheapestWithCase(guitars)})</li>
      <li>Most Expensive: {GuitarUtils.mostExpensive(guitars)} (with case {GuitarUtils.mostExpensiveWithCase(guitars)})</li>
      <li>Average Cost: {GuitarUtils.averageCost(guitars)} (average plus case {GuitarUtils.averageCostWithCase(guitars)})</li>
      <li>Lowest Case vs. Cost: </li>
      <li>Highest Case vs. Cost: </li>
      <li>Household: {GuitarUtils.totalCost(guitars)} (with cases {GuitarUtils.totalCostWithCases(guitars)})</li>
    </ul>
  </div>
);

export { MissingCasesComponent, ValuesComponent, OutliersComponent, MostCommonComponent };
