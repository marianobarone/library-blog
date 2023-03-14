import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

const FileInput = ({ headerImg, setHeaderImg }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            // setHeaderImg(URL.createObjectURL(selectedImage));
            // setHeaderImg(selectedImage);
            setHeaderImg(selectedImage,URL.createObjectURL(selectedImage));
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
                        // style={{width : '250px', height : '250px'}}
                        >
                        </lord-icon>
                        Subir imagen
                    </Button>
                </label>
            </div>
            {headerImg && selectedImage && (
                <Box mt={2} textAlign="center">
                    <div>Imagen Preview:</div>
                    <img src={headerImg} alt={selectedImage.name} height="200px" />
                </Box>
            )}

            {/* <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div> */}

        </>
    );
};

export default FileInput;