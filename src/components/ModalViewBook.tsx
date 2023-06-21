import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BookType } from './List';
import { ButtonBase, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={4}>
              <Grid item>
                <Img alt={book?.title} src={book?.img} />
              </Grid>
              <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h3">
                    {book?.title}
                  </Typography>
                  <Typography variant="h6">
                    Description 
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
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