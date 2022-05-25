import * as React from 'react';
import * as Constants from '../../infrastructure/constants';

import Image from 'next/image';
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

const imgHeight = 360;
const imgHeightMobile = 260;
const imgBackgroundHeightMobile = 200;

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      display: 'inline-flex',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(2)
    },
    gridList: {
      display: 'block',
      transform: 'translateZ(0)'
    },
    gridListTile: {
      minWidth: imgHeight,
      minHeight: imgHeight,
      margin: theme.spacing(1)
    },
    gridListTileMobile: {
      minWidth: imgHeightMobile,
      minHeight: imgHeightMobile,
      margin: theme.spacing(1)
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
    imgBackgroundMobile: {
      background: 'lightgrey'
    },
    imgMobile: {
      height: imgHeightMobile,
      display: 'block',
      overflow: 'hidden',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    imgPlaceholderMobile: {
      height: imgHeightMobile,
      display: 'flex',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgPlaceholderTextMobile: {
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
      <ImageList
          className={classes.gridList}
          rowHeight={imgHeight} 
          cols={3} 
          variant='quilted'>
        {guitars.map(guitar => (
          <ImageListItem key={guitar.id} className={classes.gridListTile}>
            <Link href={`/detail/${guitar.id}`}>
              <a>
                <div className={classes.imgBackground} aria-label={guitar.name}>
                  {guitar.picture
                    ? <Image className={classes.img} src={guitar.picture} alt={guitar.name} loading='lazy' layout='fill' objectFit='contain' />
                    : <div className={classes.img}>
                        <Typography variant='h4' className={classes.imgPlaceholder}>
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
      <ImageList
          className={classes.gridList}
          rowHeight={imgBackgroundHeightMobile}
          cols={2}
          variant='quilted'>
        {guitars.map(guitar => (
          <ImageListItem key={guitar.id} className={classes.gridListTileMobile}>
            <Link href={`/detail/${guitar.id}`}>
              <a>
                <div className={classes.imgBackgroundMobile} aria-label={guitar.name}>
                  {guitar.picture
                    ? <Image className={classes.imgMobile} src={guitar.picture} alt={guitar.name} layout='fill' loading='lazy' />
                    : <div className={classes.imgPlaceholderMobile}>
                        <Typography className={classes.imgPlaceholderTextMobile} variant='h4'>
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
