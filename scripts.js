const modal = document.querySelector(".container-modal");
const tbody = document.querySelector("tbody");
const nomeFunc = document.querySelector("#modal-nome");
const funcaoFunc = document.querySelector("#modal-funcao");
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
    itens.forEach((item, index) => {
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
        <td>R$ ${item.salario}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    //inclue na tabela conforme cada item for carregado nessa função
    tbody.appendChild(tr);
}

function editItem(index){

    openModal(true, index);
}

function deleteItem(index){
    //no indice "index", remova 1 elemento
    itens.splice(index, 1);

    //atualiza os itens no banco
    setItensBD();

    //carrega novamente os dados na tela
    loadItens();
}

function openModal(edit = false, index = 0){
    modal.classList.add('active');
    
    //Cliques fora do modal remove a classe active, e fica display none.
    modal.onclick = e => {
        if(e.target.className.indexOf('container-modal') != -1){
            modal.classList.remove('active');
        }
    }

    //se for edição, ele carrega para o modal o nome, função e salário
    if(edit){
        nomeFunc.value = itens[index].nome;
        funcaoFunc.value = itens[index].funcao;
        salarioFunc.value = itens[index].salario;
        id = index;
    }
    //se não, carrega tudo em branco
    else{
        nomeFunc.value = '';
        funcaoFunc.value = '';
        salarioFunc.value = '';
    }
}

btnSalvar.onclick = e =>{
    if(nomeFunc.value == '' || funcaoFunc.value == '' || salarioFunc.value == ''){
        return;
    }

    e.preventDefault();

    //se o id não for uma edição, atualiza o funcionario referente
    if(id != undefined){
        itens[id].nome = nomeFunc.value;
        itens[id].funcao = funcaoFunc.value;
        itens[id].salario = salarioFunc.value;
    }//se não, ele dá um push incluindo um novo item no banco 
    else{
        itens.push({'nome': nomeFunc.value, 'funcao': funcaoFunc.value, 'salario': salarioFunc.value});
    }

    //atualiza o banco
    setItensBD();

    //sai do modal 
    modal.classList.remove('active');
    
    loadItens();
    id = undefined;
}