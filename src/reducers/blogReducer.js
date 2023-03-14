export const BlogReducer = (state, action) => {
    switch (action.type) {
        case "getAboutMe":
            return {
                ...state,
                aboutMe: action.payload.aboutMe,
            }
        case "getArticles":
            return {
                ...state,
                articles: action.payload.articles,
            }
        case "updateArticles":
            return {
                ...state,
                articles: [state.articles, action.payload.articles]
            }
        case "addErrorMessage":
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }

        default:
            return state;
    }
}