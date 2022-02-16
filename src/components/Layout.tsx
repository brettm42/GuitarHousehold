import * as React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';

import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import FeaturedPlayListRoundedIcon from '@mui/icons-material/FeaturedPlayListRounded';
import FeaturedVideoRoundedIcon from '@mui/icons-material/FeaturedVideoRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import MenuIcon from '@mui/icons-material/Menu';
import StorageIcon from '@mui/icons-material/Storage';
import ViewListIcon from '@mui/icons-material/ViewList';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { FooterMessage } from '../infrastructure/constants';

type LayoutProps = {
  children: React.ReactElement | React.ReactElement[] | undefined;
  title?: string;
  pathname: string;
  isMobile: boolean;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
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
  };
});

export default function Layout(props: LayoutProps): React.ReactElement {
  const { classes } = useStyles();
  const { children, title, pathname, isMobile } = props;

  const [state, setState] = React.useState({ drawerOpen: false });

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

  function ListItemLink(props: ListItemProps<'a', { button?: true; }>) {;
    return <ListItem button component='a' {...props} />;
  };

  function ScrollToTopComponent(props: LayoutProps) {
    const { children } = props;
    const { classes } = useStyles();

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
          <Link key={0} href={'/'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemLink>
          </Link>

          <Link key={1} href={'/data'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary={'Data'} />
            </ListItemLink>
          </Link>

          <Divider />

          {['Guitars', 'Projects', 'Instruments']
            .map((text, idx) => (
              <Link key={idx + 2} href={`/${text.toLocaleLowerCase()}`} passHref>
                <ListItemLink>
                  <ListItemIcon>
                    {idx === 0
                      ? <FeaturedPlayListRoundedIcon />
                      : idx === 1
                        ? <FeaturedVideoRoundedIcon />
                        : idx === 2
                          ? <InboxRoundedIcon />
                          : idx === 3
                            ? <FeaturedPlayListRoundedIcon />
                            : idx === 4
                              ? <ViewListIcon />
                              : <MailRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemLink>
              </Link>
            ))}

          <Divider />

          <Link key={97} href={'/archive'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <FeaturedPlayListIcon />
              </ListItemIcon>
              <ListItemText primary={'Archive'} />
            </ListItemLink>
          </Link>
          <Link key={98} href={'/wishlist'} passHref>
            <ListItemLink>
              <ListItemIcon>
                <FeaturedPlayListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Wishlist'} />
            </ListItemLink>
          </Link>

          <Divider />

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
            <div className={(isMobile ? 'mobile ' : '') + classes.title}>
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
