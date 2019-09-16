
import * as React from 'react';
import Link from 'next/link';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

import { Guitar } from '../interfaces/models/guitar';

type HouseholdGridListProps = {
  data: Guitar[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    img: {
      height: 250,
      display: 'block',
      margin: '0 auto'
    }
  }),
);

const HouseholdGridList: React.FunctionComponent<HouseholdGridListProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={3} className={classes.gridList}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div" />
        </GridListTile>
        {guitars.map(guitar => (
          <GridListTile key={guitar.name}>
            <Link href={`/detail?id=${guitar.id}`}>
              <a>
                <img className={classes.img} src={guitar.picture} alt={guitar.name} />
                <GridListTileBar
                  title={guitar.name}
                  subtitle={
                    <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                  }
                  actionIcon={
                    <IconButton aria-label={`info about ${guitar.name}`} className={classes.icon} />
                  }
                />
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default HouseholdGridList;