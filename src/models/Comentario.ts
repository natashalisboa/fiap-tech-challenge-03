import { Usuario } from "./Usuario";

export interface Comentarios {
    comentarioId: number;
    conteudo: string;
    autor: Usuario;
    dtCriacao: string;
    dtAtualizacao: string;
  }
  