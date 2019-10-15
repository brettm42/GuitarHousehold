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

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
  children: React.ReactElement | React.ReactElement[] | undefined,
  title?: string,
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    appBar: {
      flexGrow: 1
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
    rootNav: {
      width: '100%',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(-2),
      marginBottom: theme.spacing(2),
      '& svg': {
        margin: theme.spacing(2)
      },
      '& hr': {
        margin: theme.spacing(0, 1)
      },
      textTransform: 'capitalize'
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
        <div onClick={handleClick} role='presentation' className={classes.scrollToTop}>
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
            .map((text, index) => (
              <Link href={`/${text === 'Home' ? '' : text.toLowerCase()}`}>
                <ListItemLink key={index}>
                  <ListItemIcon>
                    {index === 0 
                      ? <InboxIcon /> 
                      : index === 1
                        ? <FeaturedPlayListRoundedIcon />
                        : index === 2
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
      </Head>

      <div id='back-to-top-anchor' className={classes.appBar}>
        <AppBar position='absolute'>
          <Toolbar>
            <IconButton className={classes.menuButton} 
                        edge='start' 
                        color='inherit' 
                        aria-label='menu' 
                        onClick={toggleDrawer(true)}>
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
          
          <Typography variant='body2' gutterBottom>
            I'm here to stay (Footer)
          </Typography>
          
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
