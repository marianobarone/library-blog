import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import axios from 'axios'
import JoditEditor from "jodit-react";
import FileInput from "./insertImgHeader";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../../global/context/blogContext";
import { Button, Container, TextField } from "@mui/material";

export default function App() {
    const [titulo, setTitulo] = useState('');
    const [value, setValue] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const urlImagenes = []
    const [pathImg, setpathImg] = useState([])
    const navigate = useNavigate();
    const { articles, addNewArticle } = useContext(BlogContext)

    const [headerImg, setHeaderImg] = useState("");
    const [showHeaderImg, setShowHeaderImg] = useState("");

    useEffect(() => {
        setpathImg(content.match(/<img([\w\W]+?)>/g));
        //content.replace(/<img[^>]*>/,"{img_1}");
        console.log(pathImg)
        console.log("URL img:" + headerImg)
    }, [content, setHeaderImg])

    //tengo el STRING HTML SIN IMG 
    function reemplazarImgTag() {
        let cantidadImg = pathImg.length;
        let result = content;

        for (let index = 0; index < pathImg.length; index++) {
            result = result.replace(/<img[^>]*>/, `{IMG_${index}}`);
        }

        return result;
    };

    function guardarImagenes() {
        const imagenes = pathImg.map(item => (
            {
                nuevaUrl: null,
                path64: item.split("base64,")[1].split(" ")[0].slice(0, -1),
                width: item.split("base64,")[1].split(" ")[1].split(">")[0]
            }
        ));

        return imagenes;
    }

    async function obtenerUrlImg(datos, url) {
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

        let contentReemplazado = reemplazarImgTag();

        let datosImg = guardarImagenes();

        for (let i = 0; i < datosImg.length; i++) {
            datosImg[i].nuevaUrl = await obtenerUrlImg(datosImg[i], null);
            let x = `{IMG_${i}}`
            console.log(`{IMG_${i}}`);
            let h = `<img src="${datosImg[i].nuevaUrl}" ${datosImg[i].width}/>`
            console.log(h);

            contentReemplazado = contentReemplazado.replace(x, h);
        }

        // console.log(content);
        // console.log(datosImg);
        // console.log(contentReemplazado);

        const urlHeader = await obtenerHeaderImgUrl(headerImg);

        const nuevoArticulo = {
            title: titulo,
            headerImg: urlHeader,
            body: contentReemplazado,
        };

        addNewArticle(nuevoArticulo);
    }

    const changeImgHeaderUrl = (url, imgToShow) => {
        setHeaderImg(url);
        setShowHeaderImg(imgToShow);
    }

    async function obtenerHeaderImgUrl(url) {
        const result = await obtenerUrlImg(null, url);
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
            <div>
                <h1>Nuevo Artículo</h1>
            </div>

            <TextField id="standard-basic" label="Titulo" variant="standard" className='newArticle-title' value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <div>
                <FileInput headerImg={showHeaderImg} setHeaderImg={changeImgHeaderUrl} />
            </div>

            <div className='newArticle-text-editor'>
                {useMemo(
                    () => (
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={joditConfig}
                            tabIndex={1} // tabIndex of textarea

                            onBlur={(newContent) => {
                                // setContent(newContent.target.innerHTML);
                            }}
                            onChange={(newContent) => {
                                setContent(newContent);
                            }}
                        />
                    ),
                    []
                )
                }
            </div>

            <div className='newArticle-save-btn-div'>
                <Button className='newArticle-save-btn' variant="contained" onClick={() => { saveArticle() }}>
                    Guardar
                </Button>
            </div>
            <div>Preview HTML: {content}</div>
            <div>
                Preview Formatted:{" "}
                <span dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </Container>
    );
}