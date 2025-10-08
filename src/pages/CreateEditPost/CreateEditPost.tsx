import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import { Post } from '../../models/Post';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: var(--color-background-card);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: var(--color-text);
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: var(--color-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--color-text-secondary);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
`;

const Button = styled.button`
  padding: 15px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const CreateEditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const emptyPost: Post = {
  postId: 0,
  titulo: '',
  conteudo: '',
  disciplina: { disciplinaId: 0, nome: '' },
  autor: {
    userId: 0,
    nome: '',
    email: '',
    senha: '',
    cargo: { cargoId: 1, tipo: '' },
    dtCriacao: '',
    dtAtualizacao: ''
  },
  dtCriacao: '',
  dtAtualizacao: '',
  comentarios: []
};

  const [post, setPost] = useState<Post | null>(emptyPost);

  

  const disciplinas = [
  { disciplinaId: 1, nome: "HISTÓRIA" },
  { disciplinaId: 2, nome: "GEOGRAFIA" },
  { disciplinaId: 3, nome: "MATEMÁTICA" },
  { disciplinaId: 4, nome: "LÍNGUA PORTUGUESA" },
  { disciplinaId: 5, nome: "FILOSOFIA" },
];

  const isEditMode = Boolean(postId);

  useEffect(() => {
    if (isEditMode) {
      api.get(`/posts/${postId}`)
        .then(response => {
          setPost(response.data);
        })
        .catch(error => console.error('Erro ao carregar post para edição:', error));
    }
  }, [postId, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
      setPost(prevPost => prevPost ? { ...prevPost, [name]: value } : prevPost);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    let autor = post.autor;
  if (!autor || !autor.userId) {
    const userId = localStorage.getItem('userId');
    autor = {
      userId: Number(userId),
      cargo: { cargoId: 1, tipo: "" },
      nome: '',
      email: '',
      senha: '', 
      dtCriacao: '',
      dtAtualizacao: ''
    };
  } else if (!autor.cargo) {
    autor = { ...autor, cargo: { cargoId: 1, tipo: "" } };
  }
  const postToSend = {
    titulo: post.titulo,
    conteudo: post.conteudo,
    disciplina: post.disciplina,
    autor: autor,
    comentarios: [],
    dataCriacao: post.dtCriacao,
    dataAtualizacao: new Date().toISOString(),
  };

    const request = isEditMode ? api.put(`/posts/${postId}`, postToSend) : api.post('/posts', postToSend);

    request
      .then(response => {
        navigate(`/postdetail/${response.data.postId}`);
      })
      .catch(error => console.error('Erro ao salvar post:', error));
  };

  return (
    <FormContainer>
      <FormTitle>{isEditMode ? 'Editar Postagem' : 'Criar Nova Postagem'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="titulo">Título</Label>
          <Input type="text" id="titulo" name="titulo" value={post?.titulo ?? ''} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="disciplina">Disciplina</Label>
            <Select id="disciplina" name="disciplina" value={post?.disciplina.disciplinaId ?? ''} 
            onChange={e => {
      const disciplinaSelecionada = disciplinas.find(
        d => d.disciplinaId === Number(e.target.value)
      );
      setPost(prevPost =>
        prevPost
          ? { ...prevPost, disciplina: disciplinaSelecionada! }
          : prevPost
      );
    }} required>
          <option value="">Selecione a disciplina</option>
              {disciplinas.map(disciplina => (
                <option key={disciplina.disciplinaId} value={disciplina.disciplinaId}>
                  {disciplina.nome}
                </option>
              ))}        
            </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="conteudo">Conteúdo</Label>
          <TextArea id="conteudo" name="conteudo" value={post?.conteudo ?? ''} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Post'}</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateEditPost;