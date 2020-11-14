import * as React from 'react';

import * as Constants from '../../infrastructure/constants';

import Image from 'next/image';
import Link from 'next/link';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';
import { Typography } from '@material-ui/core';

type HouseholdGridListProps = {
  data: Guitar[];
  isMobile: boolean;
};

const imgHeight = 340;
const mobileImgHeight = 240;
const mobileImgBackgroundHeight = 200;

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
      width: 'flex',
      transform: 'translateZ(0)'
    },
    gridListTile: {
      padding: theme.spacing(2),
      minWidth: imgHeight,
      minHeight: imgHeight
    },
    gridListTileMobile: {
      padding: theme.spacing(2)
    },
    imgBackground: {
      background: 'lightgrey'
    },
    img: {
      height: imgHeight,
      display: 'block',
      overflow: 'hidden',
      margin: '0 auto'
    },
    imgPlaceholder: {
      height: imgHeight,
      display: 'flex',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileImgBackground: {
      background: 'lightgrey'
    },
    mobileImg: {
      height: mobileImgHeight,
      width: 'auto',
      display: 'block',
      overflow: 'hidden',
      marginTop: '-20px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    mobileImgPlaceholder: {
      height: mobileImgHeight,
      display: 'flex',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileImgPlaceholderText: {
      marginBottom: theme.spacing(8)
    }
  })
);

const HouseholdGridList: React.FunctionComponent<HouseholdGridListProps> = ({
  data: guitars, isMobile
}) => {
  const classes = useStyles();

  const desktopGridList = (
    <div className={classes.root}>
      <GridList cellHeight={imgHeight} cols={3} className={classes.gridList}>
        {guitars.map(guitar => (
          <GridListTile key={guitar.id} className={classes.gridListTile}>
            <Link href={`/detail?id=${guitar.id}`}>
              <a>
                <div className={classes.imgBackground} aria-label={guitar.name}>
                  {guitar.picture
                    ? <Image className={classes.img} src={guitar.picture} alt={guitar.name} layout={'fill'} />
                    : <div className={classes.imgPlaceholder}>
                        <Typography variant='h4'>
                          {Constants.ImagePlaceholder}
                        </Typography>
                      </div>}
                  <GridListTileBar
                    title={guitar.name}
                    subtitle={
                      <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                    }
                  />
                </div>
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

  const mobileGridList = (
    <div className={classes.root}>
      <GridList cellHeight={mobileImgBackgroundHeight} cols={2} className={classes.gridList}>
        {guitars.map(guitar => (
          <GridListTile key={guitar.id} className={classes.gridListTileMobile}>
            <Link href={`/detail?id=${guitar.id}`}>
              <a>
                <div className={classes.mobileImgBackground} aria-label={guitar.name}>
                  {guitar.picture
                    ? <Image className={classes.mobileImg} src={guitar.picture} alt={guitar.name} layout={'fill'} />
                    : <div className={classes.mobileImgPlaceholder}>
                        <Typography className={classes.mobileImgPlaceholderText} variant='h4'>
                          {Constants.ImagePlaceholder}
                        </Typography>
                      </div>}
                  <GridListTileBar
                    title={guitar.name}
                    subtitle={
                      <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                    }
                  />
                </div>
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

  return isMobile ? mobileGridList : desktopGridList;
};

export default HouseholdGridList;
