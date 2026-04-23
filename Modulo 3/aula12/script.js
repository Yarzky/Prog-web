const nome = "Yarzky";
let precoProduto = 400;
let percentualDesconto = 20;

function calcularValor() {
    let precoFinal = precoProduto - (precoProduto * percentualDesconto / 100);
        console.log("Preco final: " + precoFinal);
}

console.log("Olá " + nome + "! O Produto custa R$" + precoProduto);
console.log("Desconto de 20%: " + (precoProduto * percentualDesconto / 100));
calcularValor();
console.log("Preco Acima de R$ 100: " + (precoProduto > 100));
console.log("Desconto válido: " + (percentualDesconto > 0 && percentualDesconto < 100));




