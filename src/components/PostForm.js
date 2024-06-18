// src/components/PostForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = ({ onSave, board, posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', order: posts.length + 1 });

  useEffect(() => {
    if (id) {
      const existingPost = posts.find(post => post.id === parseInt(id));
      if (existingPost) {
        setPost(existingPost);
      }
    }
  }, [id, posts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(board, post);
    navigate(`/${board}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* Order: */}
        <script>
          type="number"
          name="order"
          value={post.order}
          onChange={handleChange}
          required
          </script>
      </label>
      <br/>
      <label>
        제목
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
      </label>
      <br/>

      <label>
        내용
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />
      </label>
      <br/>
      
      <button type="submit">저장</button>
    </form>
  );
};

export default PostForm;
