// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Board from './components/Board';
import PostForm from './components/PostForm';

function App() {
  const [currentBoard, setCurrentBoard] = useState('qna');
  const [posts, setPosts] = useState({ qna: [], free: [] });

  const handleNewPost = (board, post) => {
    post.id = Date.now();
    setPosts(prevPosts => ({
      ...prevPosts,
      [board]: [...prevPosts[board], post],
    }));
  };

  const handleEditPost = (board, updatedPost) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [board]: prevPosts[board].map(post =>
        post.id === updatedPost.id ? updatedPost : post
      ),
    }));
  };

  const handleDeletePost = (board, postId) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [board]: prevPosts[board].filter(post => post.id !== postId),
    }));
  };

  return (
    <Router>
      <nav>
        <Link to="/">Balgoorm</Link>
        <Link to="/new">게시물 작성</Link>
        <Link to="/qna" onClick={() => setCurrentBoard('qna')}>게시판</Link>
        <Link to="/free" onClick={() => setCurrentBoard('free')}>Free Board</Link>
      </nav>
      <Routes>
        <Route path="/new" element={<PostForm onSave={handleNewPost} board={currentBoard} posts={posts[currentBoard]} />} />
        <Route path="/edit/:board/:id" element={<PostForm onSave={handleEditPost} board={currentBoard} posts={posts[currentBoard]} />} />
        <Route path="/:board" element={
          <Board
            posts={posts}
            currentBoard={currentBoard}
            onDelete={handleDeletePost}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
