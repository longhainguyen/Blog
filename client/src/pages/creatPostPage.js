import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Navigate} from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePostPage() {
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={createNewPost}>
            <input type="title"
                placeholder="Title"
                value={title}
                onChange={ev => setTitle(ev.target.value)}>

            </input>
            <input type="summary"
                placeholder="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)}>

            </input>
            <input type="file" defaultValue={files} onChange={ev => setFile(ev.target.files)} ></input>
            <ReactQuill
                value={content}
                onChange={newValue => setContent(newValue)}
                modules={modules}
                formats={formats} />
            <button style={{ marginTop: '5px' }}> Create Post</button>
        </form>
    )
}