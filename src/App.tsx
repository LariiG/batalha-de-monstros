import { useState } from "react";
import type { Monster } from "./types/Monster";
import MonsterForm from "./components/MonsterForm/MonsterForm";
import BattleArena from "./components/BattleArena/BattleArena";
import "./App.css";

function App() {
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const handleAddMonster = (monster: Monster) => {
    setMonsters((prev) => [...prev, monster]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">👾 Batalha de Monstros</h1>

      <MonsterForm onAddMonster={handleAddMonster} monsters={monsters} />

      <h2>📋 Monstros Cadastrados</h2>
      <ul className="monster-list">
        {monsters.map((m) => (
          <li className="monster-list-item" key={m.id}>
            <img src={m.image_url} alt={m.name} className="monster-image" />
            <div>
              <strong>{m.name}</strong>
              <div>
                ⚔️ Ataque: {m.attack} | 🛡️ Defesa: {m.defense} | 🏃 Velocidade:{" "}
                {m.speed} | ❤️ HP: {m.hp}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <BattleArena monsters={monsters} />
    </div>
  );
}

export default App;
