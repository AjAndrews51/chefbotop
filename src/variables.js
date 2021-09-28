import { client } from "tmi.js";

export function rolldie() {
    const sides = 20;
    return Math.floor(Math.random() * sides) + 1;
  };

