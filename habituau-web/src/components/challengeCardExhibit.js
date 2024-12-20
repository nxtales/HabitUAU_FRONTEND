import React from "react";

const ChallengeCardExhibit = ({ challenge, onEnroll }) => {
  return (
    <div className="col-md-4">
      <div className="card border-secondary mb-3" style={{ maxWidth: "20rem" }}>
        <div className="card-header">Desafio</div>
        <div className="card-body">
          <h4 className="card-title">{challenge.nome}</h4>
          <p>
            <strong>Parceiro:</strong> {challenge.parceiroNome}
          </p>
          <p>
            <strong>Categoria:</strong> {challenge.categoriaNome}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onEnroll(challenge.id)}
          >
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCardExhibit;
