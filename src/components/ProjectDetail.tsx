
import * as React from 'react';
import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';

import { Project } from '../interfaces/models/project';
import * as GuitarUtils from '../data/guitarservice/utils';

type ProjectDetailProps = {
  item: Project
}

const ProjectDetail: React.FunctionComponent<ProjectDetailProps> = ({
  item: guitar,
}) => (
  <div>
    <h1>{guitar.name}</h1>
    <p>json: {JSON.stringify(guitar)}</p>
    {guitar.description
      ? <p>Description: {guitar.description}</p>
      : null}
    {guitar.series
      ? <p>Series: {guitar.series}</p>
      : null}
    <p>Body Style: {guitar.bodyStyle}</p>
    <p>Color: {guitar.color}</p>
    <p>s/n: {guitar.serialNumber} (location: {guitar.serialNumberLocation})</p>
    <p>Purchased {guitar.purchaseDate} from {guitar.purchaseStore}</p>
    <p>Project Started {guitar.projectStart}</p>
    <p>Project Completed {guitar.projectComplete}</p>
    <p>Body: {guitar.body}</p>
    <p>Neck: {guitar.neck}</p>
    {guitar.pickguard
      ? <p>Pickguard: {guitar.pickguard}</p>
      : null}
    <p>Strings: {guitar.strings}</p>
    {guitar.scale
      ? <p>Neck Scale: {guitar.scale}</p>
      : null}
    <p>Tuning: {guitar.tuning ? guitar.tuning : 'Standard'}</p>
    {guitar.pickups && GuitarUtils.hasPickups(guitar)
      ? <div><p>Pickups:</p>
        <ul>{guitar.pickups.map(i => <li key={i.id}><PickupDetail item={i} /></li>)}</ul></div>
      : null}
    {GuitarUtils.hasCase(guitar)
      ? <div><p>Case:</p>
        <ul>{guitar.case ? <li key={guitar.case.id}><CaseDetail item={guitar.case} /></li> : null}</ul></div>
      : null}
    {guitar.modifications && GuitarUtils.hasModifications(guitar)
      ? <div><p>Modifications:</p>
        <ul>{guitar.modifications.map(i => <li key={i.length}>{i}</li>)}</ul></div>
      : null}
    {guitar.productUrl
      ? <p>Product Link: <a href={guitar.productUrl}>{guitar.productUrl}</a></p>
      : null}
    {guitar.picture
      ? <img src={guitar.picture} alt={guitar.name} />
      : null}
  </div>
);

export default ProjectDetail;
