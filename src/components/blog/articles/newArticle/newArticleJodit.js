import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import './newArticle.css'
import axios from 'axios'
import JoditEditor from "jodit-react";
import FileInput from "./insertImgHeader";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../../global/context/blogContext";
import { Container, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

export default function App() {
    const navigate = useNavigate();
    const notify = (toast, text) => toast(text);
    const { articles, addNewArticle } = useContext(BlogContext)
    const editor = useRef(null);

    const [titulo, setTitulo] = useState('');
    const [headerImage, setHeaderImage] = useState("");
    const [showHeaderImg, setShowHeaderImg] = useState("");
    const [bodyContent, setBodyContent] = useState("");
    const [bodyImages, setBodyImages] = useState([])
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [titleError, setTitleError] = useState("");

    // const [value, setValue] = useState('');
    const urlImagenes = []
    const [bodyError, setBodyError] = useState("");

    //cada vez que cambia el bodyContent, se va actualizando el valor de bodyImages donde se guardan todas las etiquetas img
    useEffect(() => {
        setBodyImages(bodyContent.match(/<img([\w\W]+?)>/g));
        //bodyContent.replace(/<img[^>]*>/,"{img_1}");
        console.log(bodyImages)
        console.log("URL img:" + headerImage)
    }, [bodyContent, setHeaderImage])

    function handleSubmit() {
        setTitleError(titulo != "" ? "" : "Debe ingresar el titulo del articulo");

        if (titulo != "") {
            saveArticle();
        }

        setTimeout(() => {
            setTitleError("");
        }, 3000);
    }

    const changeImgHeaderUrl = (url, imgToShow) => {
        setHeaderImage(url);
        setShowHeaderImg(imgToShow);
    }

    //tengo el STRING HTML SIN IMG 
    function reemplazarImgTag() {
        let cantidadImg = bodyImages.length;
        let result = bodyContent;

        for (let index = 0; index < bodyImages.length; index++) {
            result = result.replace(/<img[^>]*>/, `{IMG_${index}}`);
        }

        return result;
    };



    function guardarImagenes() {
        const imagenes = bodyImages.map(item => (
            {
                nuevaUrl: null,
                path64: item.split("base64,")[1].split(" ")[0].slice(0, -1),
                width: item.split("base64,")[1].split(" ")[1].split(">")[0]
            }
        ));

        return imagenes;
    }

    async function saveImgImgbb(datos, url) {
        const formData = new FormData();
        formData.append("image", url ? url : datos.path64); // has to be named 'image'!
        let result;

        await axios
            .post(
                "https://api.imgbb.com/1/upload?key=21ddb91d5b4c4cbd3e3dbd98a09bd2a3",
                formData,
            )
            .then((response) => {
                console.log(response.data.data.url);
                result = response.data.data.url

            })
            .catch((error) => {
                console.log(error.response);
            });

        return result;
    }



    async function saveArticle() {
        let contentReemplazado = bodyContent;
        if (bodyImages != null) {
            contentReemplazado = reemplazarImgTag();

            let datosImg = guardarImagenes();

            for (let i = 0; i < datosImg.length; i++) {
                datosImg[i].nuevaUrl = await saveImgImgbb(datosImg[i], null);
                let x = `{IMG_${i}}`
                console.log(`{IMG_${i}}`);
                let h = `<img src="${datosImg[i].nuevaUrl}" ${datosImg[i].width}/>`
                console.log(h);

                contentReemplazado = contentReemplazado.replace(x, h);
            }
        }

        // console.log(bodyContent);
        // console.log(datosImg);
        // console.log(contentReemplazado);

        const urlHeader = await obtenerHeaderImgUrl(headerImage);

        const nuevoArticulo = {
            title: titulo,
            headerImg: urlHeader,
            body: contentReemplazado,
        };

        setLoadingBtn(true);
        let result = await addNewArticle(nuevoArticulo);

        if (result.status != "200") {
            setLoadingBtn(false);
            notify(toast.error, "Error! No se pudo crear el articulo, vuelva a intentarlo más tarde");
        }
        else {
            setLoadingBtn(false);
            navigate("/#blog");
            notify(toast.success, "Articulo creado correctamente");
        }
    }



    async function obtenerHeaderImgUrl(url) {
        const result = await saveImgImgbb(null, url);
        return result;
    }

    const joditConfig = {
        readonly: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        maxHeight: 400,
        askBeforePasteHTML: false,
    };

    return (
        <Container className='newArticle-section'>

            <h1>Nuevo Artículo</h1>


            <FormControl variant="standard" className="form-control-comment">
                <TextField
                    required
                    label="Titulo"
                    variant="standard"
                    className='newArticle-title'
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    error={Boolean(titleError)}
                />
                <FormHelperText
                    error={Boolean(titleError)}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        // padding: "0 10px"
                    }}
                >
                    <span>{titleError}</span>
                </FormHelperText>
            </FormControl>

            <div>
                <FileInput headerImg={showHeaderImg} setHeaderImg={changeImgHeaderUrl} />
            </div>

            <div className='newArticle-text-editor'>
                {useMemo(
                    () => (
                        <JoditEditor
                            ref={editor}
                            value={bodyContent}
                            config={joditConfig}
                            tabIndex={1} // tabIndex of textarea

                            onBlur={(newContent) => {
                                // setBodyContent(newContent.target.innerHTML);
                            }}
                            onChange={(newContent) => {
                                setBodyContent(newContent);
                            }}
                        />
                    ),
                    []
                )
                }
            </div>

            <div className='newArticle-save-btn-div'>
                <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item md={2} >
                        <LoadingButton
                            onClick={() => { handleSubmit() }}
                            loading={loadingBtn}
                            // loadingPosition="end"
                            variant="contained"
                            className='newArticle-save-btn'
                            fullWidth
                        >
                            {loadingBtn ? "Guardando..." : "Guardar"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </div>
            <div>Preview HTML: {bodyContent}</div>
            <div>
                Preview Formatted:{" "}
                <span dangerouslySetInnerHTML={{ __html: bodyContent }} />
            </div>
        </Container>
    );
}