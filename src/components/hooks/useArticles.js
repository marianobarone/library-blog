import React, { useContext } from 'react'
import ArticleContext from '../../global/context/mainContext'

export default function useArticles() {
    const { article, setArticles } = useContext(ArticleContext);
    
    useEffect(() => {
        
    }, [third])


    return (
        <div>useArticles</div>
    )
}
