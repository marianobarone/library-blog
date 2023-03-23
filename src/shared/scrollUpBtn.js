import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollUpBtn() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setShowButton(currentScrollPos > 300);
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Box
            role="presentation"
            sx={{
                position: "fixed",
                bottom: 42,
                right: 32,
                zIndex: 1,
            }}
        >
            <Fab
                onClick={handleClick}
                size="small"
                aria-label="Scroll back to top"
                style={
                    {
                        display: showButton ? 'block' : 'none',
                        backgroundColor: "#8eafd8 "
                    }}
                className="floatingBtn"
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Box >
    )
}