import React, { useContext, useEffect, useState } from 'react'
import './articleComment.css'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../../../../global/context/blogContext';
import { Button, FormControl, FormHelperText, Grid, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import DeleteModal from '../deleteModal';
import { GetDate } from '../../../../services/getDate';
import { AccountCircle } from '@mui/icons-material';
import { AuthContext } from '../../../../global/context/AuthContext';

export default function CommentCard({ comment }) {
    // const { comment } = comment;
    // const { comment: body} = comment
    const { body, _id, author, date } = comment;
    console.log("body: " + body)
    console.log("author: " + author)
    console.log("date: " + date)

    const notify = (toast, text) => toast(text);
    const { user } = useContext(AuthContext);
    const { updateComment, deleteComment } = useContext(BlogContext);
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [edit, setEdit] = useState(false);
    const [commentForDelete, setCommentForDelete] = useState();
    const [loadingBtn, setLoadingBtn] = useState(false);

    // useEffect(() => {
    //     // setIsReadOnly(true);
    //     console.log("ESTE ES EL COMMENT: " + JSON.stringify(comment))
    // }, [comment])

    const deleteConfirmation = (idComment) => {
        setCommentForDelete(idComment);
        setShow(true);
    };

    const handleEdit = (id) => {
        // setEditComment(id);
        // setIsReadOnly(false);
        setEdit(true);
    };

    const handleDelete = async (id, commentForDelete) => {
        const result = await deleteComment(id, commentForDelete)

        if (result.status == "200") {
            notify(toast.success, "Comentario eliminado correctamente");
        }
        else { notify(toast.error, `ERROR! No se ha podido eliminar el comentario - ${result.response.statusText}`); }
    }

    const handleCommentEdit = async (e) => {
        e.preventDefault();

        setLoadingBtn(true);

        const editedComment = {
            _id: e.target.idComment.value,
            // date: e.target.dateComment.value,
            date: new Date().toISOString().slice(0, 10),
            author: e.target.authorComment.value,
            body: e.target.bodyComment.value
        }

        console.log("COMENTARIO EDITADO: " + JSON.stringify(editedComment));

        let result = await updateComment(id, editedComment);

        if (result.status == "200") {
            notify(toast.success, "Comentario actualizado correctamente");
            setIsReadOnly(true);
            setEdit(false);
            setLoadingBtn(false);
        }
        else {
            notify(toast.error, "ERROR! El comentario no se ha podido actualizar");
            setLoadingBtn(false);
        }

    }

    return (
        <div className='articleComment' >
            <Grid container className="leaveComment-form">
                {/* <Grid item md={10}>
                    <h5 className='dateComment'>{GetDate(comment.date)}</h5>
                    <h4 className='nameComment'>{comment.author}</h4>

                    <p>{comment.body}</p>
                </Grid> */}
                <Grid item md={10} xs={8} sx={{ display: "flex" }}>

                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                    {edit ?

                        <form onSubmit={handleCommentEdit} className='commentForm' id={"commentForm_" + comment._id} key={comment._id}>
                            <input id={"idComment_" + comment._id} name="idComment" defaultValue={comment._id} hidden />
                            {/* 
                            <input className='authorComment' name="authorComment" defaultValue={comment.author} readOnly={isReadOnly} />
                            <input className='dateComment' name="dateComment" defaultValue={GetDate(comment.date)} readOnly={isReadOnly} />
                            <textarea className='bodyComment' name="bodyComment" defaultValue={body} readOnly={isReadOnly} /> */}
                            <input className='authorComment' name="authorComment" defaultValue={comment.author} />
                            <input className='dateComment' name="dateComment" defaultValue={GetDate(comment.date)} />
                            <textarea className='bodyComment' name="bodyComment" defaultValue={body} />

                            {/* <Grid container className={isReadOnly ? 'hide-editComment-buttons' : 'show-editComment-buttons'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} > */}
                            <Grid container className={'show-editComment-buttons'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                <Grid item md={2} xs={6}>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        // sx={isReadOnly ? { display: 'none' } : { display: 'flex', marginRight: "5px" }}
                                        // onClick={() => setIsReadOnly(true)}
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={6}>
                                    <LoadingButton
                                        type="submit"
                                        loading={loadingBtn}
                                        loadingPosition="end"
                                        endIcon={<SaveIcon />}
                                        // sx={isReadOnly ? { display: 'none' } : { display: 'flex', marginRight: "5px" }}
                                        variant="contained"
                                    >
                                        {loadingBtn ? "Guardando" : "Guardar"}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                        :
                        <Grid item md={10}>
                            <p className='authorComment'>{comment.author}</p>
                            <p className='dateComment'>{GetDate(comment.date)}</p>

                            <p className='bodyComment'>{comment.body}</p>
                        </Grid>

                    }

                </Grid>

                {user &&
                    <Grid item md={2} xs={4} className="editComment-icons">
                        <Tooltip title="Editar">
                            {/* <IconButton size="small" aria-label="Delete" className="editComment-btn" onClick={() => handleEdit(comment._id)}> */}
                            <IconButton size="small" aria-label="Delete" className="editComment-btn" onClick={() => handleEdit(comment._id)}>
                                {/* <IconButton aria-label="Delete" onClick={handleClickOpen} className="admin-button"> */}
                                <lord-icon
                                    src="https://cdn.lordicon.com/wloilxuq.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#1976d2,secondary:#1976d2"
                                    stroke="100"
                                    state="hover-2"
                                // onClick={() => handleEdit(comment._id)}
                                >
                                </lord-icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton size="small" color="error" aria-label="Delete" className="deleteComment-btn" onClick={() => deleteConfirmation(comment._id)}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/gsqxdxog.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#d32f2f,secondary:#d32f2f"
                                    stroke="100"
                                >
                                </lord-icon>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                }
            </Grid>



            <hr className='comment-divider' />

            <DeleteModal
                // url={"/articles"}
                idArticle={id}
                idComment={commentForDelete}
                deleteFunction={() => handleDelete(id, commentForDelete)}
                modalText={{ title: "Eliminar comentario", body: "Se va a eliminar el comentario seleccionado. ¿Está seguro?" }}
                // item={{url: `http://localhost:3001/articles/${id}/comment/${commentForDelete}`, body: {idArticle: id, idComment: commentForDelete} }}
                comment={comment}
                show={show}
                setShow={(bool) => setShow(bool)}
            // close={() => setShow(false)}
            />
        </div >
    )
}
