import { Cargo } from "./Cargo";

export interface Usuario {
    userId: number;
    nome: string;
    email: string;
    senha: string;
    cargo: Cargo;
    dtCriacao: string;
    dtAtualizacao: string;
  }
  