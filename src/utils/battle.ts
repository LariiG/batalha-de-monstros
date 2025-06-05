import type { Monster } from "../types/Monster";

export interface BattleRound {
  attacker: string;
  defender: string;
  damage: number;
  defenderRemainingHp: number;
}

export interface BattleResult {
  winner: Monster;
  loser: Monster;
  rounds: BattleRound[];
}

export function simulateBattle(
  monster1: Monster,
  monster2: Monster
): BattleResult {
  const rounds: BattleRound[] = [];

  const m1 = { ...monster1 };
  const m2 = { ...monster2 };

  let attacker = m1;
  let defender = m2;

  if (m2.speed > m1.speed || (m2.speed === m1.speed && m2.attack > m1.attack)) {
    attacker = m2;
    defender = m1;
  }

  while (attacker.hp > 0 && defender.hp > 0) {
    const rawDamage = attacker.attack - defender.defense;
    const damage = rawDamage > 0 ? rawDamage : 1;
    defender.hp -= damage;

    rounds.push({
      attacker: attacker.name,
      defender: defender.name,
      damage,
      defenderRemainingHp: defender.hp > 0 ? defender.hp : 0,
    });

    if (defender.hp <= 0) {
      break;
    }

    const temp = attacker;
    attacker = defender;
    defender = temp;
  }

  return {
    winner: attacker,
    loser: defender,
    rounds,
  };
}
