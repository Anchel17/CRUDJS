const modal = document.querySelector("container-modal");
const tbody = document.querySelector("tbody");
const nomeFunc = document.querySelector("#modal-nome");
const salarioFunc = document.querySelector("#modal-salario");
const btnSalvar = document.querySelector("#salvar");

//Armazena os itens do nosso banco (localstorage)
let itens;

//Armazena os índices para fazer as ações de edição
let id;

//pega os itens do banco "dbfunc", caso não tenha nada, retorna um array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];

//seta os itens do bd
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

//função executada quando a tela for carregada
function loadItens(){
    itens = getItensBD();
    tbody.innerHTML = '';
    //cria um for para cada dado pego do banco
    itens.foreach((item, index) => {
        //para criar cada linha
        insertItem(item, index)
    })
}

loadItens();

function insertItem(item, index){
    //cria uma linha para a tabela
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>${item.salario}</td>
        <td class="acao">
            <button onclick="editItem($(index))"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem($(index))"><i class='bx bx-trash'></i></button>
        </td>
    `
    //inclue na tabela conforme cada item for carregado nessa função
    tbody.appendChild(tr);
}