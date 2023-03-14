import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash == '') {
            window.scrollTo({ top: 0 })
        }
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;