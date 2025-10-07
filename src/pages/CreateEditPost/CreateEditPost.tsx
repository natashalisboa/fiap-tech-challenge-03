import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';

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

const CreateEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', materia: '', author: '' });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      api.get(`/posts/${id}`)
        .then(response => {
          setPost(response.data);
        })
        .catch(error => console.error('Erro ao carregar post para edição:', error));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request = isEditMode ? api.put(`/posts/${id}`, post) : api.post('/posts', post);

    request
      .then(response => {
        navigate(`/postdetail/${response.data.id}`);
      })
      .catch(error => console.error('Erro ao salvar post:', error));
  };

  return (
    <FormContainer>
      <FormTitle>{isEditMode ? 'Editar Postagem' : 'Criar Nova Postagem'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título</Label>
          <Input type="text" id="title" name="title" value={post.title} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="materia">Matéria</Label>
          <Input type="text" id="materia" name="materia" value={post.materia} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="author">Autor</Label>
          <Input type="text" id="author" name="author" value={post.author} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">Conteúdo</Label>
          <TextArea id="content" name="content" value={post.content} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Post'}</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateEditPost;