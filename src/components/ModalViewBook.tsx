import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BookType } from './List';
import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: 320,
  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '250px',

  });

interface ModalViewBookProps {
  open: boolean
  onClose: () => void
  book: BookType | null
}


export default function ModalViewBook({open ,book = null ,onClose}: ModalViewBookProps) {
  
  return (
    <div>
      <Modal
        disableScrollLock
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container justifyContent="center" spacing={4}>
              <Grid xs={4} sm={12} item>
                <Img alt={book?.title} src={book?.img} />
              </Grid>
              <Grid item xs={8} sm={12} container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography sx={{typography: {xs:"h5", sm:"h3"}}}>
                    {book?.title}
                  </Typography>
                  <Typography variant="h6">
                    Description 
                  </Typography>
                  <Typography variant="subtitle1">
                    {book?.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Author {book?.author}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}