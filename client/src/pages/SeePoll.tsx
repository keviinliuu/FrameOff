import axios from 'axios';
import { useState } from 'react';

export default function ViewPoll() {
    const [pollName, setPollName] = useState('text field');
    const [input, setInput] = useState('asdf');
    const [captionTitle, setCaptionTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = e => {e.preventDefault();
        const blog = {captionTitle, body, author};

    axios.get('/ZR0SbDuB').then(res => {
        setPollName(res.data.title);
    });
    return (
        <div>
            {pollName}
            <label
                htmlFor='helper-text'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
                Caption
            </label>
            <input
                onChange={event => setInput(event.target.value)}
                type='search'
                id='helper-text'
                aria-describedby='helper-text-explanation'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Goofy Goose'
            />
            <div>{input}</div>
            <form onSubmit={handleSubmit}>
                <label>Caption Title:</label>
                <input
                    type='text'
                    required
                    value={captionTitle}
                    onChange={e => setCaptionTitle(e.target.value)}
                />
                <label>Caption body:</label>
                <textarea required value={body} onChange={e => setBody(e.target.value)}></textarea>
                <label>Caption author:</label>
                <select value={author} onChange={e => setAuthor(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                </select>
                <button>Submit</button>
            </form>
        </div>
    );
}
