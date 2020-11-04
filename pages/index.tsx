import { Fragment, useRef } from 'react';
import styled from 'styled-components';
import { Container, Grid, Box, Paper, TextField, Button as MuiButton, ButtonProps } from '@material-ui/core';
import { spacing, SpacingProps } from '@material-ui/system';

const Button = styled(MuiButton)<SpacingProps & ButtonProps>`
  ${spacing}
`;

const Hr = styled('hr')<SpacingProps>`
  ${spacing}
`;

const Home = () => {
  const newRoomInputRef = useRef(null),
    joinRoomInputRef = useRef(null);

  const createRoom = async () => {
    // TODO create room and navigate to the room url
    console.log('create room', newRoomInputRef.current.value);
  };

  const joinRoom = async () => {
    // TODO create room and navigate to the room url
    console.log('join room', joinRoomInputRef.current.value);
  };

  return (
    <Fragment>
      <Container maxWidth="xs">
        <Box paddingTop={8}>
          <Paper>
            <Box p={2}>
              <TextField variant="outlined" fullWidth label="Room name" inputRef={newRoomInputRef}></TextField>
              <Button onClick={createRoom} mt={2} type="submit" variant="contained" color="primary">
                Create new room
              </Button>
              <Hr my={4} />
              <TextField variant="outlined" fullWidth label="Room id" inputRef={joinRoomInputRef}></TextField>
              <Button onClick={joinRoom} mt={2} type="submit" variant="contained" color="secondary">
                Join room
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Home;
