import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddArticlePage() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const articleData = {
            name,
            title,
            content: content.split('\n\n') // split paragraphs
        };

        try {
            await axios.post('/api/articles', articleData);
            navigate('/articles/' + name); // redirect to article page
        } catch (err) {
            console.error(err);
            alert('Error adding article');
        }
    }

    return (
        <div className="article-form-container">
            <h1>Add New Article</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Article ID (URL-safe name):
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Content (paragraphs separated by empty lines):
                    <textarea rows="10" value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <button type="submit">Add Article</button>
            </form>
        </div>
    );
}
