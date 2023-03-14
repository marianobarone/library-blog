import React from "react";

const data = {
    aboutMeSection: {
        descripction: "",
        image: ""
    },
    blogSection: {
        articles: []
    },
    shopSection: [],
    user: {
        name: "",
        mail: "",
        role: "",
        token: ""
    },
};





export default React.createContext(data);