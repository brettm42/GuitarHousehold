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
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InboxRoundedIcon from '@material-ui/icons/InboxRounded';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import MenuIcon from '@material-ui/icons/Menu';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { FooterMessage } from '../infrastructure/constants';

type LayoutProps = {
  children: React.ReactElement | React.ReactElement[] | undefined;
  title?: string;
  pathname: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    appBar: {
      flexGrow: 1
    },
    appBarElement: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
    },
    toolbarHeight: {
      paddingTop: 64
    },
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

export default function Layout(props: LayoutProps): React.ReactElement {
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

  function ListItemLink(props: ListItemProps<'a', { button?: true; }>) {
    return <ListItem button component='a' {...props} />;
  };

  function ScrollToTopComponent(props: LayoutProps) {
    const { children } = props;
    const classes = useStyles();

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = ((event.target as HTMLDivElement).ownerDocument ?? document).querySelector(
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
          {['Home', 'Guitars', 'Projects', 'Instruments', 'Archive']
            .map((text, idx) => (
              <Link key={idx} href={`/${text === 'Home' ? '' : text.toLocaleLowerCase()}`} passHref>
                <ListItemLink>
                  <ListItemIcon>
                    {idx === 0
                      ? <HomeRoundedIcon />
                      : idx === 1
                        ? <FeaturedPlayListRoundedIcon />
                        : idx === 2
                          ? <FeaturedVideoRoundedIcon />
                          : idx === 3
                            ? <InboxRoundedIcon />
                            : idx === 4
                              ? <FeaturedPlayListRoundedIcon />
                              : <MailRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemLink>
              </Link>
            ))}
        </List>

        <Divider />

        <List>
          <Link key={98} href={'/wishlist'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <FeaturedPlayListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Wishlist'} />
            </ListItemLink>
          </Link>
          <Link key={99} href={'/about'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <MailRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItemLink>
          </Link>
        </List>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/guitar-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/guitar-16x16.png" sizes="16x16" />
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='theme-color' content='black' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      </Head>

      <div id='back-to-top-anchor' className={classes.appBar}>
        <AppBar position='absolute' className={classes.appBarElement}>
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

      <div className={classes.toolbarHeight}>
        {children}
      </div>

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
