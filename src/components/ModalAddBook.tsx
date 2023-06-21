import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface ModalAddBookProps {
  open: boolean
  onClose: () => void
  onSave: (newBook: IFormInput) => void
}

 export interface IFormInput {
  cover: string
  title: string
  description: string
  author: string
}

export default function ModalAddBook({open, onSave , onClose}: ModalAddBookProps) {
  const { control, reset, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      cover: "",
      title: "",
      description: "",
      author: "",
    }
});
  const onSubmit: SubmitHandler<IFormInput> = data => {
    onSave(data)
    reset()
    onClose()
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Controller
            name="title"
            rules={{required: true}}
            control={control}
            render={({ field }) =>  
              <TextField 
                error={!!errors.title} 
                helperText={errors.title && "Title is required"} 
                margin="normal" 
                id="title" 
                label="Title" 
                fullWidth 
                variant="outlined" 
                {...field} 
              />
            }
          />
          <Controller
            name="author"
            rules={{required: true}}
            control={control}
            render={({ field }) =>  
              <TextField 
                error={!!errors.author} 
                helperText={errors.author && "Author is required"} 
                margin="normal" 
                id="author" 
                label="Author" 
                fullWidth 
                variant="outlined" 
                {...field} 
              />
            }
          />
          <Controller
            name="cover"
            rules={{required: true}}
            control={control}
            render={({ field }) =>  
              <TextField 
                error={!!errors.cover} 
                helperText={errors.cover && "Cover is required"} 
                margin="normal" 
                id="img" 
                label="Cover image URL" 
                fullWidth variant="outlined" 
                {...field} 
              />
            }
          />
          <Controller
            name="description"
            rules={{required: true}}
            control={control}
            render={({ field }) =>  
              <TextField 
                error={!!errors.description} 
                helperText={errors.description && "Description is required"} 
                margin="normal" 
                rows={4} 
                multiline 
                id="description" 
                label="Description" 
                fullWidth 
                variant="outlined" 
                {...field} 
              />
            }
          />
          <Button sx={{marginTop:3}} type="submit" fullWidth variant="contained" >
                Add and Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}