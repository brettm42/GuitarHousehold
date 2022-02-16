import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

type ImageProps = {
  imageSet: ReadonlyArray<string | undefined>;
  isMobile: boolean;
  title?: string;
  altText?: string;
  maxHeight?: number;
};

type SingleImageProps = {
  image: string | undefined;
  isMobile: boolean;
  altText?: string;
};

type ImageTabProps = {
  imageSet: ReadonlyArray<string | undefined>;
  isMobile: boolean;
  altText?: string;
};

type ImagePanelProps = {
  children: React.ReactNode;
  value: any;
  index: any;
  altText?: string;
  onTouchStart: (event: React.TouchEvent<{}>) => void;
  onTouchEnd: (event: React.TouchEvent<{}>) => void;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    img: {
      objectFit: 'cover',
      width: 'fit-content',
      height: 800,
      boxShadow: theme.shadows[2],
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    imgMobile: {
      boxShadow: theme.shadows[2],
      maxWidth: '100%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    labelRoot: {
      flexGrow: 1
    },
  };
});

function ImagePanel(props: ImagePanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={props.value !== props.index}
      id={`image-tabpanel-${props.index}`}
      aria-label={props.altText}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
    >
      {props.value === props.index && (
        <Box p={3}>
          {props.children}
        </Box>
      )}
    </div>
  );
};

export default function ImageComponent(props: ImageProps): React.ReactElement {
  const { classes } = useStyles();

  const imageSet = props.imageSet.filter(i => i || false);

  const SingleImage = (props: SingleImageProps) => {
    if (!props.image) {
      return null;
    }

    return (
      <img
        className={props.isMobile ? classes.imgMobile : classes.img}
        src={props.image}
        alt={props.altText}
      />);
  };

  const ImageTabs = (props: ImageTabProps) => {
    const [value, setValue] = React.useState(0);
    let touchStart = 0;

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    const handleTouchStart = (event: React.TouchEvent<{}>) => {
      touchStart = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: React.TouchEvent<{}>) => {
      const touchThreshold = 90;
      const touchEnd = event.changedTouches[0].clientX;

      if (touchStart > touchEnd + touchThreshold) {
        const newIdx = value - 1;
        if (newIdx < 0) {
          setValue(imageSet.length - 1);
        } else {
          setValue(newIdx);
        }
      } else if (touchStart < touchEnd - touchThreshold) {
        const newIdx = value + 1;
        if (newIdx >= imageSet.length) {
          setValue(0);
        } else {
          setValue(newIdx);
        }
      }
    };

    return (
      <div className={classes.tabRoot}>
        {imageSet.map((image, idx) =>
          <ImagePanel key={idx} value={value} index={idx} altText={`${props.altText}-${idx}`}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <SingleImage image={image} isMobile={props.isMobile} altText={`${props.altText}-${idx}`} />
          </ImagePanel>
        )}
        <Paper className={classes.labelRoot}>
          <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' aria-label='image tab navigation'>
            {imageSet.map((_, idx) =>
              <Tab key={idx} label={`Image ${idx + 1}`} />
            )}
          </Tabs>
        </Paper>
      </div>
    );
  };

  if (imageSet.length < 1) {
    return <span />;
  } else if (imageSet.length === 1) {
    return (
      <SingleImage
        image={imageSet[0]}
        isMobile={props.isMobile}
        altText={`${props.title ? props.title + props.altText : props.altText}`}
      />);
  }

  return (
    <ImageTabs
      imageSet={imageSet}
      isMobile={props.isMobile}
      altText={`${props.title ? props.title + props.altText : props.altText}`}
    />);
}
