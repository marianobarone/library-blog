import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
    const location = useLocation();
    // const element = document.getElementById("blog");
    const violation = document.getElementById("blog");
    useEffect(() => {

        const href = window.location.href.substring(
            window.location.href.lastIndexOf('#') + 1,
        );
        if (window.location.href.lastIndexOf('#') > 0) {
            document.getElementById(href)?.scrollIntoView({behavior: "smooth"});
        }

        if (location.hash == '') {
            window.scrollTo({ top: 0 })
        }
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;