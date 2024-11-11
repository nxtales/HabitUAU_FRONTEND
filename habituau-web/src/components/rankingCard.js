import React from "react";

const RankingCard = ({ rankingData }) => {
    // Limita o ranking a exibir no máximo 5 usuários
    const topUsers = rankingData.slice(0, 5);

    return (
        <div className="col-md-4">
            <div className="card border-secondary mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Ranking</div>
                <div className="card-body">
                    {topUsers.map((user, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                            <img
                                src={user.image}
                                alt={user.name}
                                className="rounded-circle"
                                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                            />
                            <div>
                                <h5 className="mb-1">{user.name}</h5>
                                <p className="mb-0 text-muted">Pontos: {user.points}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RankingCard;
