import { useEffect, useState } from "react";
import axios from "axios";
import ArticlesList from "../ArticlesList";

export default function ArticlesListPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            const response = await axios.get('/api/articles');
            setArticles(response.data);
        }
        fetchArticles();
    }, []);

    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    );
}
