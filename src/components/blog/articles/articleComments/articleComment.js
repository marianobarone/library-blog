import React, { useContext, useEffect, useState } from 'react'
import './articleComment.css'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../../../../global/context/blogContext';
import { FormControl, FormHelperText, Grid, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import CommentCard from './commentCard';

const notify = (toast, text) => toast(text);

export default function ArticleComment({ comments }) {
    const { addNewComment } = useContext(BlogContext)
    let { id } = useParams();
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [commentError, setCommentError] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(() => {
        // console.log("SE ACTUALIZA ARTICLE COMMENTS.JS " + JSON.stringify(comments));
    }, [comments]);

    const handleSubmit = () => {
        setAuthorError(author != "" ? "" : "Debe ingresar su nombre");
        setCommentError(comment != "" ? "" : "Debe ingresar un comentario");

        if (author != "" && comment != "") {
            saveComment({ id, author, comment });
        }

        setTimeout(() => {
            setAuthorError("");
            setCommentError("");
        }, 3000);
    };

    async function saveComment() {
        const newComment = {
            author: author,
            body: comment,
        };

        setLoadingBtn(true);
        let result = await addNewComment(id, newComment);

        if (result.status == "200") {
            setAuthor("");
            setComment("");
            notify(toast.success, "Gracias por su comentario!")
            setLoadingBtn(false);
        }
        else {
            notify(toast.error, "Error al intentar publicar su comentario!")
            setLoadingBtn(false);
        }
        console.log("Resultado agregar nuevo comentario" + JSON.stringify(result));
        console.log("Resultado agregar nuevo comentario" + result);
    };


    return (
        <div>
            <div className='leaveCommentArea'>
                <h3>Deja tu comentario</h3>

                <Grid container className="leaveComment-form">
                    <Grid item md={12}>
                        <FormControl variant="standard" className="form-control-comment">
                            <TextField
                                required
                                label="Nombre"
                                variant="standard"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                error={Boolean(authorError)}

                            />
                            <FormHelperText
                                error={Boolean(authorError)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    // padding: "0 10px"
                                }}
                            >
                                <span>{authorError}</span>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl error variant="standard" sx={{ width: "100%" }} className="form-control-comment">
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Comentario"
                                placeholder="Escribe aquí tu comentario..."
                                onChange={e => setComment(e.target.value)}
                                value={comment}
                                error={Boolean(commentError)}
                                multiline
                                maxRows={2}
                            />
                            <FormHelperText
                                error={Boolean(commentError)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    // padding: "0 10px"
                                }}
                            >
                                <span>{commentError}</span>
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container className="leaveComment-form">
                    <Grid item md={3}>
                        <LoadingButton
                            onClick={() => handleSubmit({ id, author, comment })}
                            loading={loadingBtn}
                            // loadingIndicator="Publicando..."
                            loadingPosition="end"
                            startIcon={""}
                            variant="contained"
                            fullWidth
                        >
                            {loadingBtn ? "Publicando..." : "Publicar comentario"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </div>

            <div className='articleComments'>
                <h3>Comentarios</h3>
                <div className='comments-list'>
                    {comments.length == 0 ?
                        <p>No Existen comentarios</p>
                        :
                        comments && comments.map((item, index) => (
                            <CommentCard key={index} comment={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
