import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegisterForm = () => {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [pais, setPais] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
      const response = await fetch('https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/cliente/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CPF: cpf,
          email: email,
          senha: senha,
          nome: nome,
          sobrenome: sobrenome,
          data_nascimento: dataNascimento,
          genero: genero,
          CEP: cep,
          cidade: cidade,
          pais: pais,
          telefone: telefone,
        }),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no cadastro');
      }

      const data = await response.json();
      console.log('Usuário cadastrado:', data);
      toast.success('Cadastro realizado com sucesso!'); // Exibe uma mensagem de sucesso

      // Limpar os campos após o envio
      setCpf('');
      setEmail('');
      setSenha('');
      setNome('');
      setSobrenome('');
      setDataNascimento('');
      setGenero('');
      setCep('');
      setCidade('');
      setPais('');
      setTelefone('');
    } catch (error) {
      toast.error(error.message); // Exibe um popup com a mensagem de erro
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
          <input
            type="text"
            className="form-control"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataNascimento" className="form-label">Data de Nascimento </label>
          <input
            type="date"
            className="form-control"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Gênero</label>
          <select
            className="form-control"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input
            type="text"
            className="form-control"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cidade" className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">País</label>
          <input
            type="text"
            className="form-control"
            id="pais"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserRegisterForm;