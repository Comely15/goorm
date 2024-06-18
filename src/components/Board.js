// src/components/Board.js
import React from 'react';
import { Link } from 'react-router-dom';

const Board = ({ posts, currentBoard, onDelete }) => {
  const boardPosts = posts[currentBoard].sort((a, b) => a.order - b.order);

  return (
    <div>
      <h2>{currentBoard.toUpperCase()} 게시물</h2>
      <ul>
        {boardPosts.map(post => (
          <li key={post.id}>
            <strong>{post.order}. {post.title}</strong><br/>
            <p>{post.content}</p><br/>
            <div className='post-actions'>
              <Link to={`/edit/${currentBoard}/${post.id}`}>Edit</Link>
              <button onClick={() => onDelete(currentBoard, post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
