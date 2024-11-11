import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEditForm = () => {
  const cpf = localStorage.getItem('cpf'); // Obtém o CPF do localStorage
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

  useEffect(() => {
    // Função para buscar dados do usuário
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/cliente/retrieve/${cpf}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }

        const userData = await response.json();
        setEmail(userData.email);
        setNome(userData.nome);
        setSobrenome(userData.sobrenome);
        setDataNascimento(userData.data_nascimento);
        setGenero(userData.genero);
        setCep(userData.CEP);
        setCidade(userData.cidade);
        setPais(userData.pais);
        setTelefone(userData.telefone);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserData();
  }, [cpf]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/cliente/update/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CPF: cpf,
          email,
          senha,
          nome,
          sobrenome,
          data_nascimento: dataNascimento,
          genero,
          CEP: cep,
          cidade,
          pais,
          telefone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao atualizar os dados');
      }

      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edição de Dados do Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            value={cpf}
            readOnly
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
          <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
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
        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserEditForm;
