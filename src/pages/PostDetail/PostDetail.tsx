import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const PostCardAuthor = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--color-text-secondary);
`;

const PostCardDiscipline = styled.h4`
  font-size: 1rem;
  margin-bottom: 20px;
  color: var(--color-text-secondary);
`;

const PostComments = styled.div`
  margin-top: 40px;
  border-top: 1px solid var(--color-border);
  padding-top: 20px;
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
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminPermission') === 'true';


  useEffect(() => {
    api.get(`/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

    const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        navigate('/postlist');
      } catch (error) {
        alert('Erro ao excluir post.');
        console.error(error);
      }
    }
  };

  return (
    <PostDetailContainer>
      <PostTitle>{post.titulo}</PostTitle>
      <PostCardAuthor>Por Prof. {post.autor.nome}</PostCardAuthor>
      <PostCardDiscipline>{post.disciplina.nome}</PostCardDiscipline>
      <PostContent>{post.conteudo}</PostContent>
      <BackLink to="/postlist">Voltar para a lista de posts</BackLink>
      {isAdmin && (
        <>
          <EditLink to={`/editpost/${post.postId}`}>Editar Post</EditLink>
          <button style={{marginTop: 20, marginLeft: 15, background: "#d9534f", color: "white", border: "none", borderRadius: 4, padding: "8px 16px", cursor: "pointer"}} onClick={handleDelete}>
            Excluir Post
          </button>
        </>
      )}
      <PostComments>
        {post.comentarios.map(comentario => (
          <div key={comentario.comentarioId}>
            <strong>{comentario.autor.nome}</strong>: {comentario.conteudo}
            <br />
            <small>Publicado em: {comentario.dtCriacao}</small>
            <hr />
          </div>
        ))}
      </PostComments>
    </PostDetailContainer>
          //TODO: Formulário para adicionar novo comentário

  );
};

export default PostDetail;
