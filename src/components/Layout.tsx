import * as React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

import FeaturedPlayListRoundedIcon from '@material-ui/icons/FeaturedPlayListRounded';
import FeaturedVideoRoundedIcon from '@material-ui/icons/FeaturedVideoRounded';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { FooterMessage } from '../infrastructure/constants';

type Props = {
  children: React.ReactElement | React.ReactElement[] | undefined
  title?: string
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    appBarDiv: {
      flexGrow: 1
    },
    appBar: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
    pathname: {
      marginRight: 0
    },
    list: {
      width: 250,
    },
    divider: {
      margin: theme.spacing(2)
    },
    footer: {
      padding: theme.spacing(2)
    },
    footerMessage: {
      paddingLeft: theme.spacing(2)
    },
    scrollToTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 10
    }
  })
);

export default function Layout(props: Props): React.ReactElement {
  const classes = useStyles();
  const { children, title, pathname } = props;

  const [state, setState] = React.useState(
    { 
      drawerOpen: false 
    });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (event.type === 'keydown' 
      && ((event as React.KeyboardEvent).key === 'Tab' 
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, drawerOpen: open });
  };

  // const ListItemLink = React.forwardRef((props, ref) => (
  //   <ListItem button component='a' { ...props } innerRef={ref}>
  //     <ListItemIcon>
  //         {props.idx === 0 
  //           ? <InboxIcon /> 
  //           : idx === 1
  //             ? <FeaturedPlayListRoundedIcon />
  //             : idx === 2
  //               ? <FeaturedVideoRoundedIcon />
  //               : <MailIcon />}
  //       </ListItemIcon>
  //       <ListItemText primary={text} />
  //     </ListItem>
  // ));

  function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component='a' { ...props } />;
  };

  function ScrollToTopComponent(props: Props) {
    const { children } = props;
    const classes = useStyles();
  
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div className={classes.scrollToTop} onClick={handleClick} role='presentation'>
          {children}
        </div>
      </Zoom>
    );
  }

  const drawer = () => {
    return (
      <div className={classes.list}
        role='presentation'
        onClick={toggleDrawer(true)}
        onKeyDown={toggleDrawer(true)}
      >
        <List>
          {['Home', 'Guitars', 'Projects', 'About']
            .map((text, idx) => (
              <Link key={idx} href={`/${text === 'Home' ? '' : text.toLowerCase()}`} passHref>
                <ListItemLink>
                  <ListItemIcon>
                    {idx === 0 
                      ? <InboxIcon /> 
                      : idx === 1
                        ? <FeaturedPlayListRoundedIcon />
                        : idx === 2
                          ? <FeaturedVideoRoundedIcon />
                          : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemLink>
              </Link>
          ))}
        </List>
        <Divider />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='theme-color' content='black' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      </Head>

      <div id='back-to-top-anchor' className={classes.appBarDiv}>
        <AppBar position='absolute' className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} 
              edge='start' 
              color='inherit' 
              aria-label='menu' 
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.title}>
              <Link href='/'>
                <ButtonBase focusRipple key='title'>
                  <Typography variant='h6'>
                    GuitarHousehold
                  </Typography>
                </ButtonBase>
              </Link>
            </div>
            <Typography className={classes.pathname} variant='subtitle1'>
              {pathname}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={state.drawerOpen} onClose={toggleDrawer(false)} aria-label='open navigation drawer'>
          {drawer()}
        </Drawer>
      </div>

      <div className={classes.toolbar} />
      {children}

      <footer>
        <div className={classes.footer}>
          <Divider className={classes.divider} />
          
          <div className={classes.footerMessage}>
            <Typography variant='caption' gutterBottom>
              {FooterMessage}
            </Typography>
          </div>
          
          <ScrollToTopComponent {...props}>
            <Fab className={classes.scrollToTop} color='secondary' size='small' aria-label='scroll to top'>
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollToTopComponent>
        </div>
      </footer>
    </div>
  );
}
