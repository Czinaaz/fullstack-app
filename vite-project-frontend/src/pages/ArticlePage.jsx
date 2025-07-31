import articles from "../article-content/article-content"
import { useParams, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentForm";
import useUser from '../useUser';
import './pages.css'


export default function ArticlePage() {
    const { name } = useParams();
    const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [comments, setComments] = useState(initialComments);
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const { user} = useUser();

    const article = articles.find(a => a.name === name);


    useEffect(() => {
    const voted = localStorage.getItem(`upvoted-${name}`);
    if (voted) setHasUpvoted(true);
}, [name]);

    async function onUpvoteClicked() {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post('/api/articles/' + name + '/upvote', null, { headers });
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes);
        setHasUpvoted(true); 
        localStorage.setItem(`upvoted-${name}`, 'true');
    }
    async function onAddComment({ nameText, commentText }) {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post('/api/articles/' + name + '/comments',{
        postedBy: nameText,
        text: commentText,
        }, {headers} );
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    return (
        <>
            <div className="article-container">
            <h1>{article.title}</h1>

                {user && (
                    hasUpvoted 
                        ? <p>You already voted</p>
                        : <button className="upvote-button" onClick={onUpvoteClicked}>Upvote</button> 
                )}
                <p>This article has {upvotes} upvotes</p>

                {article.content.map(p => <p key={p}>{p}</p>)}

                <div className="add-comment-form">
                    {user 
                        ? <AddCommentForm onAddComment={onAddComment} />
                        : <p>Log In to add a comment</p>
                    }
                </div>

                <div className="comments-list">
                    <CommentsList comments={comments} />
                </div>
            </div>
        </>
    );
}

export async function loader({ params }) {
    const response = await axios.get('/api/articles/' + params.name);
    const { upvotes, comments } = response.data;
    return { upvotes, comments };
}