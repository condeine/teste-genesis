import React, { useCallback, useState } from 'react';
import ListBooks, { BookType } from './components/List';
import { Alert, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ModalAddBook, { IFormInput } from './components/ModalAddBook';
import { uid } from 'uid';
import BooksDataMocks from './mocks/books.json'
import CloseIcon from '@mui/icons-material/Close';




function App() {
  const [booksData, setBooksData] = useState<BookType[]>(BooksDataMocks.data)
  const [openAddModalBook, setOpenAddModalBook] = useState(false)
  const [openToast, setOpenToast] = useState(false)


  const handleOpenAddModalBook = useCallback(() => {
    setOpenAddModalBook(prevState => !prevState)
  },[])

  const handleOpenToast = useCallback(() => {
    setOpenToast(prevState => !prevState)
  },[])

  
  const deleteBook = useCallback((book:BookType) => {
    const booksDataClone = [...booksData]
    const bookFind = booksDataClone.findIndex(bookItem => bookItem.id === book.id)
    if(bookFind !== undefined) {
      booksDataClone.splice(bookFind, 1)
      setBooksData(booksDataClone)
    }
  
  },[booksData])

  const addBook = useCallback((book:IFormInput) => {
    const bookFind = booksData.findIndex(bookItem => bookItem.title === book.title)
    console.log(bookFind)
    if(bookFind === -1) {
      setBooksData(prevState => [...prevState, {
        id: uid(),
        title: book.title,
        img: book.cover,
        author: book.author,
        description: book.description,
      }]) 
    }else {
      handleOpenToast()
    }
  },[booksData])



  return (
    <Grid container  justifyContent="center">
      <Snackbar
        open={openToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleOpenToast}
        action={<IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleOpenToast}
        >
          <CloseIcon fontSize="small" />
        </IconButton>}
        >
          <Alert onClose={handleOpenToast} severity="error" sx={{ width: '100%' }}>
            Book already registered
          </Alert>

        </Snackbar>
      <ModalAddBook 
        open={openAddModalBook} 
        onClose={handleOpenAddModalBook} 
        onSave={addBook} 
        />
      <Grid container  sx={{maxWidth: 900}} spacing={2}  columns={12}>
        <Grid item xs={12} sx={{margin: "40px 0"}}>
          <Grid container>
            <Grid item sx={{marginBottom:5}}  md={9}>
              <Typography variant='h4'>List Books</Typography>
            </Grid>
            <Grid item md={3}>
              <Button fullWidth variant="contained" onClick={handleOpenAddModalBook}>
                Add Book
              </Button>
            </Grid>
          </Grid>
          <ListBooks books={booksData} onDelete={deleteBook} />
        </Grid>
      </Grid>
    </Grid>
    
  );
}

export default App;
