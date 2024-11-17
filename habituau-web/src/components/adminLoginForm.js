import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza o login do admin
      const loginResponse = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Falha na autenticação');
      }

      const loginData = await loginResponse.json();

      if (!loginData.re) {
        throw new Error('RE do admin não encontrado na resposta da API.');
      }

      // Obtém os dados completos do admin usando o RE
      const retrieveResponse = await fetch(`${API_BASE_URL}/api/admin/retrieve/${loginData.re}`);
      if (!retrieveResponse.ok) {
        const errorData = await retrieveResponse.json();
        throw new Error(errorData.message || 'Falha ao obter dados do admin.');
      }

      const adminData = await retrieveResponse.json();

      // Armazena os dados completos do admin no localStorage
      localStorage.setItem('adminData', JSON.stringify(adminData));

      setEmail('');
      setSenha('');
      toast.success('Login bem-sucedido!');

      // Redireciona para a área do admin
      navigate('/adminArea');
    } catch (error) {
      console.error('Erro durante o login:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login Admin</h2>
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
      <ToastContainer />
    </div>
  );
};

export default AdminLoginForm;
