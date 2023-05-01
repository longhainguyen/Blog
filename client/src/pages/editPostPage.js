import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Navigate, useParams} from "react-router-dom";

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

export default function EditPostPage() {
    const {id} = useParams();
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:4000/post/' + id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
                setFile(postInfo.cover);
            });
        });
    }, [])

    async function EditPostPage(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        data.set('id', id);
        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials:'include',
        })

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }
    return (
        <form onSubmit={EditPostPage}>
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
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    )
}