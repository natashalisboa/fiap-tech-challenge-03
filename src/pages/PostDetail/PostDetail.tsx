import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api'; 
import { formatDateTime } from './dateFormatter';
import { Post } from '../../models/Post'; 
const PostDetailContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
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

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
`;

const CommentContent = styled.div``;

const PostContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const BackButton = styled.button`
 margin-top: 20px;
  background: #1173d4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const EditButton = styled.button`
margin-top: 20px;
  margin-left: 15px;
  background: #f0ad4e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const DeleteButton = styled.button`
  margin-top: 20px;
  margin-left: 15px;
  background: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const CommentForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminPermission') === 'true';
  const userId = localStorage.getItem('userId');


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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userId || !postId || !post) {
      alert('Você precisa estar logado e escrever algo para comentar.');
      return;
    }

      const autorPost = {
    ...post.autor,
    cargo: post.autor.cargo ? post.autor.cargo : { cargoId: 1, tipo: "" },
    nome: post.autor.nome ?? '',
    email: post.autor.email ?? '',
    senha: post.autor.senha ?? '',
    dtCriacao: post.autor.dtCriacao ?? '',
    dtAtualizacao: post.autor.dtAtualizacao ?? ''
  };

    const comentariosPost = Array.isArray(post.comentarios)
    ? post.comentarios
    : [];

    const disciplinaPost = post.disciplina
    ? post.disciplina
    : { disciplinaId: 1, nome: "" };

  const postToSend = {
    postId: post.postId,
    titulo: post.titulo,
    conteudo: post.conteudo,
    disciplina: disciplinaPost,
    autor: autorPost,
    comentarios: comentariosPost,
    dtCriacao: post.dtCriacao ?? '',
    dtAtualizacao: post.dtAtualizacao ?? ''
  };

  const comentarioToSend = {
    conteudo: newComment,
    autor: {
      userId: Number(userId),
      nome: '',
      email: '',
      senha: '',
      cargo: { cargoId: 1, tipo: '' },
      dtCriacao: '',
      dtAtualizacao: ''
    },
    dtCriacao: new Date().toISOString(),
    post: postToSend
  };

    try {
      await api.post('/comentarios', comentarioToSend);
      setNewComment('');
      // Recarrega os detalhes do post para exibir o novo comentário
      api.get(`/posts/${postId}`).then(response => {
        setPost(response.data);
      });
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      alert('Falha ao adicionar o comentário.');
    }
  };
  return (
    <PostDetailContainer>
      <PostTitle>{post.titulo}</PostTitle>
      <PostCardAuthor>Por Prof. {post.autor.nome}</PostCardAuthor>
      <PostCardDiscipline>{post.disciplina.nome}</PostCardDiscipline>
      <PostContent>{post.conteudo}</PostContent>
      <BackButton onClick={() => navigate('/postlist')}>Voltar</BackButton>
      {isAdmin && (
        <>
          <EditButton onClick={() => navigate(`/editpost/${post.postId}`)}>Editar Post</EditButton>
          <DeleteButton onClick={handleDelete}>Excluir Post</DeleteButton>
        </>
      )}
      <PostComments>
        {post.comentarios.map(comentario => (
          <Comment key={comentario.comentarioId}>
            <CommentContent>
              <strong>{comentario.autor.nome}</strong>: {comentario.conteudo}
              <br />
              <small>Publicado em: {formatDateTime(comentario.dtCriacao)}</small>
            </CommentContent>
            <hr />
          </Comment>
        ))}
        {userId && (
          <CommentForm onSubmit={handleCommentSubmit}>
            <TextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              required
            />
            <Button type="submit">Comentar</Button>
          </CommentForm>
        )}
      </PostComments>
    </PostDetailContainer>
  );
};

export default PostDetail;
