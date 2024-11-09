import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
      const response = await fetch('https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/cliente/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha na autenticação');
      }

      const data = await response.json();
      console.log('Usuário autenticado:', data);
      // Aqui você pode armazenar o token ou fazer o que for necessário após a autenticação

      // Limpar os campos após o envio
      setEmail('');
      setSenha('');
      toast.success('Login bem-sucedido!'); // Exibe uma mensagem de sucesso
      
      // Redireciona para a UserArea com o usuário retornado
      navigate('/userArea', { state: { user: data } }); // Passando os dados do usuário

    } catch (error) {
      toast.error(error.message); // Exibe um popup com a mensagem de erro
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
      <ToastContainer /> {/* Componente para exibir os toast notifications */}
    </div>
  );
};

export default LoginForm;