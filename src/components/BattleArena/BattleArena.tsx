import { useEffect, useState } from "react";
import type { Monster } from "../../types/Monster";
import { simulateBattle, type BattleResult } from "../../utils/battle";

import "./BattleArena.css";

interface Props {
  monsters: Monster[];
}

export default function BattleArena({ monsters }: Props) {
  const [monstersState, setMonstersState] = useState<Monster[]>([]);
  const [firstId, setFirstId] = useState<string>("");
  const [secondId, setSecondId] = useState<string>("");
  const [result, setResult] = useState<BattleResult | null>(null);
  const [history, setHistory] = useState<BattleResult[]>([]);

  useEffect(() => {
    setMonstersState(monsters.map((m) => ({ ...m })));
  }, [monsters]);

  useEffect(() => {
    setResult(null);
  }, [firstId, secondId]);

  const handleBattle = () => {
    const monster1 = monstersState.find((m) => m.id === firstId);
    const monster2 = monstersState.find((m) => m.id === secondId);

    if (!monster1 || !monster2 || monster1.id === monster2.id) {
      alert("Selecione dois monstros diferentes para batalhar!");
      return;
    }

    if (monster1.hp <= 0 || monster2.hp <= 0) {
      const deadMonsters = [monster1, monster2]
        .filter((m) => m.hp <= 0)
        .map((m) => m.name)
        .join(" e ");
      alert(
        `${deadMonsters} não pode(m) participar da batalha porque está(ão) sem vidas!`
      );
      return;
    }

    const battleResult = simulateBattle(monster1, monster2);
    setResult(battleResult);
    setHistory((prev) => [...prev, battleResult]);

    setMonstersState((prev) =>
      prev.map((m) => {
        if (m.id === battleResult.winner.id) return { ...battleResult.winner };
        if (m.id === battleResult.loser.id) return { ...battleResult.loser };
        return m;
      })
    );
  };

  return (
    <div className="battle-arena">
      <h2>🏟️ Arena de Batalha</h2>

      <div className="battle-arena__controls">
        <select
          className="battle-arena__select"
          value={firstId}
          onChange={(e) => setFirstId(e.target.value)}
        >
          <option value="">Selecione o Monstro 1</option>
          {monstersState.map((monster) => (
            <option key={monster.id} value={monster.id}>
              {monster.name} {monster.hp <= 0 ? "" : ""}
            </option>
          ))}
        </select>

        <select
          className="battle-arena__select"
          value={secondId}
          onChange={(e) => setSecondId(e.target.value)}
        >
          <option value="">Selecione o Monstro 2</option>
          {monstersState.map((monster) => (
            <option key={monster.id} value={monster.id}>
              {monster.name} {monster.hp <= 0 ? "" : ""}
            </option>
          ))}
        </select>

        <button className="battle-arena__button" onClick={handleBattle}>
          Iniciar Batalha
        </button>
      </div>

      {result && (
        <>
          <h3>🏆 Vencedor: {result.winner.name}</h3>
          <img
            src={result.winner.image_url}
            alt={result.winner.name}
            className="battle-arena__winner-image"
          />

          <ul className="battle-arena__round-list">
            {result.rounds.map((round, index) => (
              <li key={index} className="battle-arena__round-item">
                <strong>Round {index + 1}:</strong> {round.attacker} atacou{" "}
                {round.defender} causando {round.damage} de dano (HP restante:{" "}
                {round.defenderRemainingHp})
              </li>
            ))}
          </ul>
        </>
      )}

      {history.length > 0 && (
        <div className="battle-arena__history">
          <h3>📜 Histórico das Batalhas</h3>
          {history.map((battle, battleIndex) => (
            <div
              key={battleIndex}
              className="battle-arena__battle-history-item"
            >
              <h4>🏆 Vencedor: {battle.winner.name}</h4>
              <ul>
                {battle.rounds.map((round, roundIndex) => {
                  const globalRoundNumber =
                    history
                      .slice(0, battleIndex)
                      .reduce((acc, b) => acc + b.rounds.length, 0) +
                    roundIndex +
                    1;

                  return (
                    <li key={roundIndex}>
                      <strong>Round {globalRoundNumber}:</strong>{" "}
                      {round.attacker} atacou {round.defender} causando{" "}
                      {round.damage} de dano (Vidas restante:{" "}
                      {round.defenderRemainingHp})
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
