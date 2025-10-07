import { Comentarios } from "./Comentario";
import { Disciplina } from "./Disciplina";
import { Usuario } from "./Usuario";

export interface Post {
    postId: number;
    titulo: string;
    autor: Usuario;
    conteudo: string;
    disciplina: Disciplina;
    dtCriacao: string;
    dtAtualizacao: string;
    comentarios: Comentarios[];
  }
  