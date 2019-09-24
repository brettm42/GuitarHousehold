import * as React from 'react';

import Link from 'next/link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { Guitar } from '../interfaces/models/guitar';

type HouseholdGridListProps = {
  data: Guitar[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      paddingLeft: 15
    },
    gridList: {
      width: 'flex'
    },
    img: {
      height: 300,
      display: 'block',
      margin: '0 auto'
    },
    background: {
      background: 'lightgrey'
    }
  })
);

const HouseholdGridList: React.FunctionComponent<HouseholdGridListProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={5} className={classes.gridList}>
        {guitars.map(guitar => (
          <GridListTile key={guitar.name}>
            <Link href={`/detail?id=${guitar.id}`}>
              <a>
                <div className={classes.background} aria-label={guitar.name}>
                  <img className={classes.img} src={guitar.picture} alt={guitar.name} />
                  <GridListTileBar
                    title={guitar.name}
                    subtitle={<span>{`${guitar.make} ${guitar.bodyStyle}`}</span>}
                  />
                </div>
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default HouseholdGridList;