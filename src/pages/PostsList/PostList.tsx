import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import { Post } from '../../models/Post'; 

const PostListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--color-text);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const PostCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const PostCard = styled.div`
  background: var(--color-background-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const PostCardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 10px 0;
`;

const PostCardAuthor = styled.p`
  font-style: italic;
  color: var(--color-text-secondary);
  margin: 0 0 15px 0;
`;

const PostCardDescription = styled.p`
  flex-grow: 1;
  margin-bottom: 15px;
`;

const PostCardLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
  align-self: flex-end;
`;

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.autor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PostListContainer>
      <Title>Postagens</Title>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      <PostCardsContainer>
        {filteredPosts.map(post => (
          <PostCard key={post.postId}>
            <PostCardTitle>{post.postId}</PostCardTitle>
            <PostCardAuthor>Por: {post.autor.nome}</PostCardAuthor>
            <PostCardDescription>
              {post.conteudo.substring(0, 150)}...
            </PostCardDescription>
            <PostCardLink to={`/postdetail/${post.postId}`}>
              Ler Mais
            </PostCardLink>
          </PostCard>
        ))}
      </PostCardsContainer>
    </PostListContainer>
  );
};

export default PostList;
