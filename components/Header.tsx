import { Avatar, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useAuth from '@hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexGrow: 1,
  },
}));

const Header = () => {
  const {
    user: { user_metadata: meta },
    logout,
  } = useAuth();

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.menuContainer}>
          <Avatar src={meta.avatar_url} />
          <Typography variant="h6">{meta.full_name}</Typography>
        </div>
        <Button color="inherit" onClick={() => confirm('Do you want to log out?') && logout()}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
