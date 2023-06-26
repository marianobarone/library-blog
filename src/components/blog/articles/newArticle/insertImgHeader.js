import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

const FileInput = ({ headerImg, setHeaderImg }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            // setHeaderImg(URL.createObjectURL(selectedImage));
            // setHeaderImg(selectedImage);
            setHeaderImg(selectedImage, URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <>
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
            />

            <div>
                <p>Agregar imagen de articulo</p>
                <label htmlFor="select-image" >

                    <Button variant="contained" color="primary" component="span">

                        <lord-icon
                            src="https://cdn.lordicon.com/wfadduyp.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                        >
                        </lord-icon>
                        Subir imagen
                    </Button>
                </label>
            </div>

            {headerImg && selectedImage && (
                <Box mt={2} textAlign="center">
                    <div>Imagen Preview:</div>
                    <img src={headerImg} alt={selectedImage.name} height="200px" className="articleHeader-img"/>
                </Box>
            )}

            {/* {headerImg && selectedImage && (
                <Box mt={2} textAlign="center">
                    <div>Imagen Preview:</div>


                    <div class="container">
                        <img src={headerImg} alt={selectedImage.name} height="200px" />
                        <div class="overlay">
                            <a href="#" class="icon" title="Haga click para subir nueva imagen">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />

                                <div>
                                   
                                    <label htmlFor="select-image" >

                                        <Button variant="contained" color="primary" component="span">

                                            <lord-icon
                                                src="https://cdn.lordicon.com/wfadduyp.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                            // style={{width : '250px', height : '250px'}}
                                            >
                                            </lord-icon>
                                            Subir imagen
                                        </Button>
                                    </label>
                                </div>
                            </a>
                        </div>
                    </div>
                </Box>
            )} */}
        </>
    );
};

export default FileInput;