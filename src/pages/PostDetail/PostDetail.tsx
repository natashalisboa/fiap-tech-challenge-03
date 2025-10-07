import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api'; 
import { Post } from '../../models/Post'; 
const PostDetailContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const PostContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: #1173d4;
  text-decoration: none;
`;

const EditLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  margin-left: 15px;
  color: #f0ad4e; /* Cor de aviso/edição */
  text-decoration: none;
`;

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostDetailContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <BackLink to="/postlist">Voltar para a lista de posts</BackLink>
      <EditLink to={`/editpost/${post.id}`}>Editar Post</EditLink>
    </PostDetailContainer>
  );
};

export default PostDetail;
