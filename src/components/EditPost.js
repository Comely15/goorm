import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function EditPost({ posts, onUpdate }) {
  const { board, postId } = useParams();
  const history = useHistory();
  const post = posts[board]?.find(p => p.id === parseInt(postId));

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(board, postId, { title, content });
    history.push(`/${board}`);
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditPost;
