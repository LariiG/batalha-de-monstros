# 🧟‍♂️ Batalha de Monstros

Aplicação de simulação de batalhas entre monstros, desenvolvida com React + TypeScript. Permite cadastrar monstros com atributos personalizados e colocá-los para lutar automaticamente, seguindo um algoritmo de batalha específico.

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie a aplicação**
   ```bash
   npm run dev
   ```

> A aplicação estará disponível em `http://localhost:5173` (ou a porta definida pelo Vite).

---

## ⚙️ Funcionalidades

- ✅ Cadastro de monstros com os seguintes atributos:
  - `name` (nome)
  - `attack` (ataque)
  - `defense` (defesa)
  - `speed` (velocidade)
  - `hp` (vida)
  - `image_url` (imagem do monstro)

- ✅ Simulação automática de batalhas entre dois monstros
- ✅ Visualização detalhada do resultado da batalha
- ✅ Histórico de batalhas com todos os rounds
- ✅ Restrições:
  - Não é possível batalhar com monstros mortos (HP ≤ 0)
  - Nomes de monstros devem ser únicos

---

## 🤖 Algoritmo de Batalha

- O monstro com **maior velocidade** ataca primeiro.
- Se houver empate de velocidade, o que tem **maior ataque** começa.
- O dano é calculado com:  
  **`dano = ataque - defesa`**  
  Caso o resultado seja menor ou igual a zero, aplica-se **1 de dano**.
- O dano é subtraído do `HP` do oponente.
- A batalha segue em **rounds alternados** até que o `HP` de um monstro chegue a **zero ou menos**.
- O monstro que **zerar o HP do oponente primeiro** é o vencedor.

---

## 💄 Design e Usabilidade

- Interface simples e intuitiva
- Pré-visualização da imagem ao escolher o monstro
- Feedbacks claros durante ações (ex: alerta ao tentar batalhar com monstros mortos ou duplicar nome)

---


## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para bundling rápido
- [UUID](https://www.npmjs.com/package/uuid) para gerar IDs únicos

---

## 📄 Licença

Este projeto foi desenvolvido para fins de desafio técnico. Fique à vontade para explorar e modificar.

---

Feito com 💥 por Larissa Gontijo
