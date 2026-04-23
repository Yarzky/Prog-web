const alunos = [
  { nome: "Ana", nota1: 7.5, nota2: 8.0 },
  { nome: "Bruno", nota1: 4.0, nota2: 5.5 },
  { nome: "Carla", nota1: 9.0, nota2: 9.5 },
  { nome: "Diego", nota1: 3.5, nota2: 4.0 },
  { nome: "Elena", nota1: 6.0, nota2: 7.0 },
];

const calcularMedia = (nota1, nota2) => (nota1 + nota2) / 2;

const alunosComMedia = alunos.map(aluno => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2),
}));

const alunosOrdenados = [...alunosComMedia].sort((aluno1, aluno2) => aluno1.media - aluno2.media);

const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const mediaGeral = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0) / alunosComMedia.length;

console.log("Todos os alunos:");
alunosOrdenados.forEach(({ nome, nota1, nota2, media }) => {
  console.log(`${nome} - Nota 1: ${nota1} | Nota 2: ${nota2} | Média: ${media.toFixed(1)}`);
});

console.log(`\nAprovados: ${aprovados.length}`);
aprovados.forEach(({ nome, media }) => {
  console.log(`${nome} - Média: ${media.toFixed(1)}`);
});

console.log(`\nReprovados: ${reprovados.length}`);
reprovados.forEach(({ nome, media }) => {
  console.log(`${nome} - Média: ${media.toFixed(1)}`);
});

console.log(`\nMédia geral da turma: ${mediaGeral.toFixed(2)}`);
