import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

const ImgInput = ({ headerImg, setHeaderImg }) => {
    const [imgAboutMe, setImgAboutMe] = useState("");

    useEffect(() => {
        if (imgAboutMe) {
            setHeaderImg(imgAboutMe, URL.createObjectURL(imgAboutMe));
        }
    }, [imgAboutMe]);


    return (
        <>
            {headerImg && (
                <Box mt={2} textAlign="center" className="editImg-AboutMe-card">
                    <div className="container">
                        <img src={headerImg} className="editImg-AboutMe" />
                        <div className="overlay">
                            <a href="#" className="icon">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => setImgAboutMe(e.target.files[0])}
                                />

                                <div>
                                    <label htmlFor="select-image" >
                                        <Tooltip title="Subir imagen">
                                            <IconButton>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wfadduyp.json"
                                                    trigger="loop-on-hover"
                                                >
                                                </lord-icon>
                                            </IconButton>
                                        </Tooltip>
                                    </label>
                                </div>
                            </a>
                        </div>
                    </div>
                </Box>
            )}
        </>
    );
};

export default ImgInput;