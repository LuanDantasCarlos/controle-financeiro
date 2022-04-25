const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// comando de amrmazenamento das transações 

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

// comando para remoção de transações

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()

    
}

// declaração de classes html e css para utilizar no js para inserção de valores nos elementos HTML

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount <0 ? '-':'+'
    const CSSClass = amount <0 ? 'minus':'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML =`
    ${name} 
    <span>${operator}R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onclick ="removeTransaction(${id})">x</button>`
transactionsUl.append(li)
}

// atualização de valores relativos a entradas de dados
const getTotal = transactionsAmounts => transactionsAmounts
.reduce((acumulator, transaction) => acumulator + transaction, 0)
.toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
.filter(value => value > 0)
.reduce((acumulator, value) => acumulator + value, 0)
.toFixed(2)

const getExpense = transactionsAmounts =>Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((acumulator, value) => acumulator + value, 0))
        .toFixed(2) 

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({amount}) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpense(transactionsAmounts)


        incomeDisplay.textContent = `R$ ${income}`
        balanceDisplay.textContent = `R$ ${total}`
        expenseDisplay.textContent = `R$ ${expense}`
}

// apresentação da lista de itens adicionados na pagina

const init = () => {   
    transactionsUl.innerHTML = '' 
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
   localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const clearInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = '' 
}

const addToTransactionArray = (TransactionName, TransactionAmount) => {
    transactions.push({ 
        id: generateID(), 
        name: TransactionName, 
        amount: Number(TransactionAmount) 
    })
}

const heandleFormSubmit = event => {
    event.preventDefault()
    
    const TransactionName = inputTransactionName.value.trim()
    const TransactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = TransactionName === '' || TransactionAmount === ''

    if(isSomeInputEmpty) {
        alert('Por favor, preencha os campos em branco')
        return
    }

    addToTransactionArray(TransactionName, TransactionAmount)
    init()
    updateLocalStorage()
    clearInputs()

    
}
form.addEventListener('submit', heandleFormSubmit)

    
    

