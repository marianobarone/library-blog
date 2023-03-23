import React, { useContext, useEffect, useState } from 'react'
import './articleComment.css'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../../../../global/context/blogContext';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import saveComment from '../../../../services/saveComment.js'
import toast, { Toaster } from 'react-hot-toast';

const notify = (toast, text) => toast(text);

export default function ArticleComment({ comments }) {
    let { id } = useParams();
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState();
    const [arrayComentarios, setArrayComentarios] = useState(comments);
    console.log("Prueba de comment:" + comment)

    const { addNewComment } = useContext(BlogContext)

    useEffect(() => {
        console.log("Value author: " + author)
        console.log("Value cometanrio: " + comment)
    }, [arrayComentarios])

    async function saveComment() {

        const newComment = {
            author: author,
            body: comment,
        };

        let result = await addNewComment(id, newComment);
        if (result.status == "200") {
            setAuthor("");
            setComment("");
            notify(toast.success, "Gracias por su comentario!")
        }
        else {
            notify(toast.error, "Error al intentar publicar su comentario!")
        }
        console.log("Resultado agregar nuevo comentario" + JSON.stringify(result));
        console.log("Resultado agregar nuevo comentario" + result);
    }

    return (
        <div>
            <div className='comments-list'>
                {comments.length == 0 ?
                    <p>No Existen comentarios</p> :
                    comments && comments.map((comment, index) => (
                        <div className='articleComment' key={comment._id}>
                            <h5 className='dateComment'>{comment.date}</h5>
                            <h4 className='nameComment'>{comment.author}</h4>

                            <p>{comment.body}</p>

                            <hr className='comment-divider'/>
                        </div>
                    ))}
            </div>

            <div className='leaveCommentArea'>
                <h3>Deja tu comentario</h3>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 2, width: '25ch', },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Nombre*" variant="standard" value={author} onChange={e => setAuthor(e.target.value)} />
                </Box>

                <TextareaAutosize
                    className='leave-comment-text-area'
                    aria-label="empty textarea"
                    minRows={5}
                    placeholder="Escribe aquí tu comentario..."
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    style={{ width: "100%" }}
                />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => saveComment({ id, author, comment })}>Publicar comentario</Button>
                </Stack>
            </div>
        </div>
    )
}
