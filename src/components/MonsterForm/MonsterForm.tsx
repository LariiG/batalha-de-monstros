import { useState } from "react";
import type { Monster } from "../../types/Monster";
import { v4 as uuidv4 } from "uuid";
import "./MonsterForm.css";

interface MonsterFormProps {
  onAddMonster: (monster: Monster) => void;
  monsters: Monster[];
}

const monsterImages = [
  { label: "Batatossauro", url: "https://robohash.org/monster1.png?set=set2" },
  { label: "Fofurante", url: "https://robohash.org/monster2.png?set=set2" },
  { label: "Brigadente", url: "https://robohash.org/monster3.png?set=set2" },
  { label: "Zé Monstrão", url: "https://robohash.org/monster4.png?set=set2" },
  { label: "Tiquinho", url: "https://robohash.org/monster5.png?set=set2" },
];

const MonsterForm = ({ onAddMonster, monsters }: MonsterFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    attack: "",
    defense: "",
    speed: "",
    hp: "",
    image_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nomeJaExiste = monsters.some(
      (m) => m.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
    );

    if (nomeJaExiste) {
      alert("Já existe um monstro com esse nome! Tente outro diferente.");
      return;
    }

    const newMonster: Monster = {
      id: uuidv4(),
      name: formData.name.trim(),
      attack: parseInt(formData.attack),
      defense: parseInt(formData.defense),
      speed: parseInt(formData.speed),
      hp: parseInt(formData.hp),
      image_url: formData.image_url,
    };

    onAddMonster(newMonster);

    setFormData({
      name: "",
      attack: "",
      defense: "",
      speed: "",
      hp: "",
      image_url: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Monstro</h2>

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="attack"
        placeholder="Ataque"
        value={formData.attack}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="defense"
        placeholder="Defesa"
        value={formData.defense}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="speed"
        placeholder="Velocidade"
        value={formData.speed}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="hp"
        placeholder="Pontos de Vida"
        value={formData.hp}
        onChange={handleChange}
        required
      />

      <select
        name="image_url"
        value={formData.image_url}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Escolha seu monstro
        </option>
        {monsterImages.map((img) => (
          <option key={img.url} value={img.url}>
            {img.label}
          </option>
        ))}
      </select>

      {formData.image_url && (
        <div className="monster-preview">
          <p>Pré-visualização do Monstro:</p>
          <img src={formData.image_url} alt="Monstro escolhido" />
        </div>
      )}

      <button type="submit">Adicionar Monstro</button>
    </form>
  );
};

export default MonsterForm;
