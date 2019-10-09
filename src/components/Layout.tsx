import * as React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FeaturedPlayListRoundedIcon from '@material-ui/icons/FeaturedPlayListRounded';
import FeaturedVideoRoundedIcon from '@material-ui/icons/FeaturedVideoRounded';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
  children: JSX.Element | JSX.Element[] | undefined,
  title?: string,
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootPage: {
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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
      margin: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(2)
    }
  })
);

export default function Layout(props: Props) {
  const classes = useStyles();
  const { children, title, pathname } = props;

  const [state, setState] = React.useState(
    { 
      drawerOpen: false 
    });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, drawerOpen: open });
  };

  function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component='a' { ...props } />;
  };

  const drawer = () => {
    return (
      <div className={classes.list}
           role='presentation'
           onClick={toggleDrawer(true)}
           onKeyDown={toggleDrawer(true)}
      >
        <List>
          {[
            'Home',
            'Guitars', 
            'Projects', 
            'About'
          ].map((text, index) => (
            <ListItemLink key={index} href={`/${text === 'Home' ? '' : text.toLowerCase()}`}>
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
          ))}
        </List>

        <Divider />
      </div>
    );
  };

  return (
    <div className={classes.rootPage}>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Link href='/'>
              <Typography variant='h6' className={classes.title}>
                GuitarHousehold
              </Typography>
            </Link>
            <Typography variant='subtitle1'>
              {pathname}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={state.drawerOpen} onClose={toggleDrawer(false)}>
          {drawer()}
        </Drawer>
      </div>

      {children}

      <footer>
        <div className={classes.footer}>
          <Divider className={classes.divider} />
          <Typography variant='body2' gutterBottom>
            I'm here to stay (Footer)
          </Typography>
        </div>
      </footer>
    </div>
  );
}
