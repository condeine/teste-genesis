import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, Grid, Modal, Typography } from '@mui/material';
import { uid } from 'uid';
import { useCallback, useState } from 'react';
import ModalViewBook from './ModalViewBook';

const Box = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export interface BookType {
    id: string
    img: string
    title: string
    description: string
    author: string
}


interface ListBooksProps {
    books: BookType[]
    onDelete: (book: BookType) => void
}

export default function ListBooks({books, onDelete}: ListBooksProps) {
const [viewBook, setViewBook] = useState<BookType | null>(null)

const closeViewBook = useCallback(() => {
    setViewBook(null)
  },[])


  return (
    <Box>
        <ModalViewBook
            open={!!viewBook} 
            book={viewBook}
            onClose={closeViewBook}
        />
        <List>
            {
                books.map(book => { 
                    return(
            <ListItem 
                key={uid()}
                secondaryAction={
                    <IconButton onClick={() => onDelete(book)} edge="end">
                       <DeleteIcon />
                    </IconButton>
                }
                >
                <Grid container spacing={4}>
                    <Grid item>
                    <ButtonBase sx={{ width: 128, height: 200 }} onClick={() => setViewBook(book)}>
                        <Img alt="cover-book" src={book.img} />
                    </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="body2">
                            Description 
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {book.description.substring(0, 150)} ...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Author {book.author}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </ListItem>
            
                        )
                    })
                } 
        </List>
    </Box>
  );
}