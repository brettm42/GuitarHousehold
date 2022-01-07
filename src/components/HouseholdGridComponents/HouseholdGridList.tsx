import * as React from 'react';
import * as Constants from '../../infrastructure/constants';

import Link from 'next/link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { Guitar } from '../../interfaces/models/guitar';

type HouseholdGridListProps = {
  data: Guitar[];
  isMobile: boolean;
};

const imgHeight = 340;
const mobileImgHeight = 240;
const mobileImgBackgroundHeight = 200;

const useStyles = makeStyles()((theme: Theme) => {
  return {
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
  };
});

const HouseholdGridList: React.FunctionComponent<HouseholdGridListProps> = ({
  data: guitars, isMobile
}) => {
  const { classes } = useStyles();

  const desktopGridList = (
    <div className={classes.root}>
      <ImageList rowHeight={imgHeight} cols={3} className={classes.gridList}>
        {guitars.map(guitar => (
          <ImageListItem key={guitar.id} className={classes.gridListTile}>
            <Link href={`/detail/${guitar.id}`}>
              <a>
                <div className={classes.imgBackground} aria-label={guitar.name}>
                  {guitar.picture
                    ? <img className={classes.img} src={guitar.picture} alt={guitar.name} />
                    : <div className={classes.imgPlaceholder}>
                        <Typography variant='h4'>
                          {Constants.ImagePlaceholder}
                        </Typography>
                      </div>}
                  <ImageListItemBar
                    title={guitar.name}
                    subtitle={
                      <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                    }
                  />
                </div>
              </a>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );

  const mobileGridList = (
    <div className={classes.root}>
      <ImageList rowHeight={mobileImgBackgroundHeight} cols={2} className={classes.gridList}>
        {guitars.map(guitar => (
          <ImageListItem key={guitar.id} className={classes.gridListTileMobile}>
            <Link href={`/detail/${guitar.id}`}>
              <a>
                <div className={classes.mobileImgBackground} aria-label={guitar.name}>
                  {guitar.picture
                    ? <img className={classes.mobileImg} src={guitar.picture} alt={guitar.name} />
                    : <div className={classes.mobileImgPlaceholder}>
                        <Typography className={classes.mobileImgPlaceholderText} variant='h4'>
                          {Constants.ImagePlaceholder}
                        </Typography>
                      </div>}
                  <ImageListItemBar
                    title={guitar.name}
                    subtitle={
                      <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                    }
                  />
                </div>
              </a>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );

  return isMobile ? mobileGridList : desktopGridList;
};

export default HouseholdGridList;
