import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface Credentials {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({ email: '', senha: '' });
  const [showModal, setShowModal] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCredentials(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleLogin = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const response = await api.post("/usuario/signin", credentials);
    localStorage.setItem("authToken", response.data.token);
    navigate('/postlist');
  } catch (error) {
    setShowModal(true);
    console.error("Erro ao fazer login:", error);
  }
};




  return (
    <LoginContainer>
        <Title>Portal Múltipla Escolha</Title>
        <Subtitle>Faça login para acessar o blog.</Subtitle>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" name="email" value={credentials.email} onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input type="password" id="password" name="senha" value={credentials.senha} onChange={handleChange}/>
          </FormGroup>
          <Button type="submit">Entrar</Button>
        </Form>
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <h2>Falha no login</h2>
              <p>Email ou senha incorretos. Tente novamente.</p>
              <ModalButton onClick={() => setShowModal(false)}>Fechar</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
    </LoginContainer>
  );
};

export default Login;
