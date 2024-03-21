// Por enquanto, provavelmente por eu estar utilizando uma versão mais
// nova do TypeScript, eu vou ter erros se eu fizer uma classe e não
// inicializar as variáveis dela. Eu imagino que o certo talvez seja
// fazer uma interface ou inicializar essas variáveis com um
// construtor, porém, vou fazer desse jeito meia-boca mesmo por
// enquanto para continuar a aula.
export class Usuario {
    nome: string = '';
    senha: string = '';
}