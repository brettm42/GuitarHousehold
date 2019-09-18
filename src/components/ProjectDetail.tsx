
import * as React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';

import { Project } from '../interfaces/models/project';
import * as GuitarUtils from '../data/guitarservice/utils';

type ProjectDetailProps = {
  item: Project
}

const maxWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 15,
      minHeight: 220,
      width: maxWidth,
    },
    control: {
      padding: theme.spacing(2),
    },
    img: {
      maxWidth: maxWidth,
      display: 'block',
      margin: '0 auto'
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }),
);

const ProjectDetail: React.FunctionComponent<ProjectDetailProps> = ({
  item: guitar,
}) => {
  const classes = useStyles();

  return (
    <div>
      <h1>{guitar.name}</h1>
      {guitar.description
        ? <p>{guitar.description}</p>
        : null}
      {guitar.series
        ? <p>Series: {guitar.series}</p>
        : null}
      <p>Body Style: {guitar.bodyStyle}</p>
      <p>Color: {guitar.color}</p>
      <p>s/n: {guitar.serialNumber} (location: {guitar.serialNumberLocation})</p>
      <p>Purchased {guitar.purchaseDate} from {guitar.purchaseStore}</p>
      {guitar.purchasePrice
        ? <p>Purchase price: ${guitar.purchasePrice}</p>
        : null}
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
        ? <img className={classes.img} src={guitar.picture} alt={guitar.name} />
        : null}
      <div className="json">
        <pre>{JSON.stringify(guitar, undefined, 2)}</pre>
      </div>
    </div>
)};

export default ProjectDetail;
