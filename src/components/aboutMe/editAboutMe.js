
import React, { useState, useRef, useEffect, useContext } from "react";
import './editAboutMe.css'
import axios from "axios";
import ImgInput from "./imgInput";
import DefaultUser from '../../portadasWeb/defaultUser.png'
import JoditEditor from "jodit-react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Tooltip } from "@mui/material";
import { BlogContext } from "../../global/context/blogContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const joditConfig = {
    readonly: false,
    uploader: {
        insertImageAsBase64URI: true,
    },
    maxHeight: 400,
    askBeforePasteHTML: false,
    "showCharsCounter": false,
    "showWordsCounter": false,
    "showXPathInStatusbar": false,
    "buttons": "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,lineHeight,spellcheck,cut,copy,paste,copyformat,hr,table,link,indent"
};

export default function ModalEditAboutMe({ aboutMe }) {
    const editor = useRef(null);
    const { updateAboutMe } = useContext(BlogContext)
    const [open, setOpen] = useState(false);
    const [aboutMeActual, setAboutMeActual] = useState(aboutMe?.body);
    const [imgAboutMe, setImgAboutMe] = useState();
    const [showHeaderImg, setShowHeaderImg] = useState(aboutMe?.img ? aboutMe.img : DefaultUser);
    const [enableSaveBtn, setEnableSaveBtn] = useState(false);

    useEffect(() => {
        // const cambioAboutMe = aboutMeActual != aboutMe.body;
        // const cambioImg = showHeaderImg != aboutMe.img;
        setEnableSaveBtn(aboutMeActual != aboutMe.body || showHeaderImg != aboutMe.img)
    }, [aboutMeActual, imgAboutMe])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEnableSaveBtn(false);
        setShowHeaderImg(aboutMe.img ? aboutMe.img : DefaultUser);
    };

    const actualizarAboutMe = (newAboutMe) => {
        setAboutMeActual(newAboutMe);
    };

    const saveAboutMe = async () => {
        const imgUrl = imgAboutMe === undefined ? aboutMe.img : await obtenerUrlImg();
        const data = {
            body: aboutMeActual,
            img: imgUrl,
        }

        updateAboutMe(data, aboutMe._id);
        handleClose();
    };

    const changeImgHeaderUrl = (url, imgToShow) => {
        setImgAboutMe(url);
        setShowHeaderImg(imgToShow);
    };

    async function obtenerUrlImg() {
        const formData = new FormData();
        formData.append("image", imgAboutMe); // has to be named 'image'!
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

    return (
        <div>
            <Tooltip title="Editar">
                <IconButton aria-label="Delete" onClick={handleClickOpen} className="admin-button">
                    <lord-icon
                        src="https://cdn.lordicon.com/wloilxuq.json"
                        trigger="loop-on-hover"
                        colors="primary:#121331,secondary:#000000"
                        state="hover-2"
                    >
                    </lord-icon>
                </IconButton>
            </Tooltip>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="lg"
                fullWidth={true}
                xs={{ width: "100%" }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Editar AboutMe
                </BootstrapDialogTitle>

                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <div className='newArticle-text-editor'>
                                <JoditEditor
                                    ref={editor}
                                    value={aboutMe.body}
                                    config={joditConfig}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={(newContent) => {
                                        console.log("new content" + newContent)
                                        actualizarAboutMe(newContent);
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div>
                                <ImgInput headerImg={showHeaderImg} setHeaderImg={changeImgHeaderUrl} />
                            </div>
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        className=''
                        disabled={!enableSaveBtn}
                        variant="contained"
                        onClick={() => { saveAboutMe() }}
                    >
                        Guardar
                    </Button>

                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}