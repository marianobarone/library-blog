import React, { useContext, useState, useEffect } from 'react'
import './articleDetails.css'
import parse from 'html-react-parser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../../../global/context/blogContext';
import { Button, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import ArticleComment from '../../articles/articleComments/articleComment'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteModal from '../deleteModal';
import toast from 'react-hot-toast';

export default function ArticleDetails() {
    const notify = (toast, text) => toast(text);
    const navigate = useNavigate()
    let { id } = useParams();
    const { articles, deleteArticle } = useContext(BlogContext);
    console.log("Estos son los params:" + id);
    const articuloEncontrado = articles.find(a => a._id == id);
    const [show, setShow] = useState(false);

    const deleteConfirmation = () => {
        // setCommentForDelete(idComment);
        setShow(true);
    };

    const handleDelete = async (id) => {
        const result = await deleteArticle(id);

        if (result.status == "200") {
            notify(toast.success, "Articulo eliminado correctamente");
            navigate("/#blog");
        }
        else { notify(toast.error, `ERROR! No se ha podido eliminar el artículo - ${result.response.statusText}`); }
    }

    return (
        <div>
            <Container className='articleDetails'>

                <Link to='/#blog' className='text-primary text-4xl -ml-4 mt-2 fixed goBack-blog'>
                    <IconButton
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: 'red',
                            backgroundColor: '#8eafd8'
                        }}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </Link>

                <img src={articuloEncontrado.headerImg} width="100%" height="300" className='articleHeader-img' />

                <div className='articleTitle'>
                    <h1>{articuloEncontrado.title}</h1>
                </div>

                <h4>{articuloEncontrado.date}</h4>

                <div className='articleBody'>
                    <div>
                        {parse(articuloEncontrado?.body)}
                    </div>
                </div>

                <hr />

                <div className='articleComments'>
                    <ArticleComment comments={articuloEncontrado.comments} />
                </div>

                <Button
                    onClick={() => deleteConfirmation()}
                    variant="contained"
                    color="error"
                >
                    Eliminar articulo
                </Button>

                <DeleteModal
                    deleteFunction={() => handleDelete(id)}
                    modalText={{ title: "Eliminar artículo", body: "Se va a eliminar el artículo seleccionado. ¿Está seguro?" }}
                    show={show}
                    setShow={(bool) => setShow(bool)}
                />

            </Container>
        </div>
    )
}
