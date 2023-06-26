import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useContext } from 'react';
import { BlogContext } from '../../../global/context/blogContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({ deleteFunction, modalText, idArticle, idComment, comment, show, setShow, }) {
    // export default function DeleteModal({ deleteFunction, item, show, setShow, }) {
    const { deleteItem, deleteComment } = useContext(BlogContext)
    // const [open, setOpen] = React.useState(false);
    // const [open, setOpen] = React.useState(show);

    // const handleClickOpen = () => {
    //     // setOpen(true);
    // };

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = () => {
        // deleteItem(url, id);
        // deleteComment(idArticle, idComment);
        // comment.filter(comment._id != idComment);
        // deleteFunction()
        deleteFunction();
        setShow(false);
    }

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button> */}
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{modalText.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {/* Se va a eliminar el comentario seleccionado. ¿Está seguro? */}
                        {modalText.body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" variant="contained">Cancelar</Button>
                    <Button onClick={handleDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}