import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: var(--color-background-card);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: var(--color-text);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: var(--color-text);
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: var(--color-text-secondary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: var(--color-text-secondary);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/postlist');
  };

  return (
    <LoginContainer>
        <Title>Portal Múltipla Escolha</Title>
        <Subtitle>Faça login para acessar o blog.</Subtitle>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="username">Usuário</Label>
            <Input type="text" id="username" name="username" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input type="password" id="password" name="password" />
          </FormGroup>
          <Button type="submit">Entrar</Button>
        </Form>
    </LoginContainer>
  );
};

export default Login;
