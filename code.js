// For caculating budget
const getBudget = document.getElementById("budget");
const buttonBudget = document.getElementById("button_Budgeet");
const outputValue = document.getElementById("output-1");
let budgetCost = 0,
  expenseCost = 0,
  balanceCost = 0;

let id = 1;

// For caculating Expense (Getting all expense values)

const buttonExpense = document.getElementById("add_expense_details");
const outputExpense = document.getElementById("All_Expenses");
const expenses = [];

const output2 = document.getElementById("output-2");
const output3 = document.getElementById("output-3");
let budget = 0;

function setBudget() {
  budgetCost = budgetCost + parseInt(getBudget.value);
  if (budgetCost > 0) {
    const paraBudget = document.getElementsByClassName("visiblityIf");
    paraBudget[0].innerHTML = "<p>Budget amount added sucessfully</p>";
    paraBudget[0].style.color = "darkgreen";
    outputValue.innerHTML = `Rs: ${budgetCost}`;
    balanceCost = +budgetCost;
    output3.innerHTML = `Rs: ${balanceCost}`;
    document.getElementById("budget-form").reset();
  } else {
    const paraBudget = document.getElementById("visiblity");
    paraBudget.innerHTML = "<p>Budget amount cannot be nagetive or zero</p>";
  }
}
buttonBudget.addEventListener("click", setBudget);

const getAmount = document.getElementById("amountOfItem");
const itemDetail = document.getElementById("itemDetail");
const getDueDate = document.getElementById("due_date");
const getPaymentDate = document.getElementById("payment_Date");

let totalExpense = 0;
let expenseEdit = null;

function setExpense() {

  // Get input values

  // Create user object
  const amount = parseInt(getAmount.value);
  const expense = {
    id: id,
    amount: amount,
    itemDetail: itemDetail.value,
    dueDate: getDueDate.value,
    paymentDate: getPaymentDate.value,
  };

  // Add user to the array

  // if (expenseEdit !== null) {
  // OR
  if (expenseEdit) {
    // edit expense
    console.log(expenseEdit);

    let expenseIndex = expenses.findIndex(
      (expense) => expense.id == expenseEdit.id
    );
    console.log("Before update: ", expenses[expenseIndex]);

    expenses[expenseIndex].amount = parseInt(getAmount.value);
    expenses[expenseIndex].itemDetail = itemDetail.value;
    expenses[expenseIndex].dueDate = getDueDate.value;
    expenses[expenseIndex].paymentDate = getPaymentDate.value;
    if(amount < totalExpense){
      totalExpense = totalExpense - amount;
      output2.innerHTML = `Rs: ${totalExpense}`;
      console.log("get amount value = ", getAmount.value,"total expense = ", totalExpense," amount = ",amount, "blance cost",balanceCost);
      console.log("expense value : " , typeof expenses[expenseIndex].amount ,expenses[expenseIndex].amount );
      balanceCost = balanceCost + amount;
      output3.innerHTML = `Rs: ${balanceCost}`;
    }
    else{
      return alert("No more expense can be edited");
    }
    // console.log("After update: ", expenses[expenseIndex]);

    // balanceCost = balanceCost + amount;
    // output3.innerHTML = `Rs: ${balanceCost}`;

   
    

  }
   else {
    // add expense
    if(balanceCost>= amount){
      expenses.push(expense);
      id++;
      totalExpense = totalExpense + amount;
      output2.innerHTML = `Rs: ${totalExpense}`;
      console.log(totalExpense);
    
      balanceCost = balanceCost - amount;
      output3.innerHTML = `Rs: ${balanceCost}`;
      console.log(balanceCost);
    }
    
    else{
      alert("You have no amount in your budget");
    }

}



  // //For displaying balance output to user
  // output3.innerHTML = `Rs: ${balanceCost}`;

  // expenses.forEach(function (expense, index) {
  //   totalExpense = totalExpense + expense.amount;
  //   console.log({ expense });
  //   //For displaying expense output to user
  //   // balanceCost = balanceCost - user.amount;
  //   // output2.innerHTML = `Rs: ${user.amount}`;

  document.getElementById("add_expense_form").reset();
  // });

  // console.log(expenses);
  // console.log(user.id);

  // Clear input fields
  // document.getElementById("amountOfItem").value = "";
  // document.getElementById("itemDetail").value = "";
  // document.getElementById("due_date").value = "";
  // document.getElementById("payment_Date").value = "";

  // Refresh the table
  generateTable();

  // else{
  //   alert("Expense amount cannot be added due to low budget");
  //   document.getElementById('amountOfItem').value = '';
  //   return;}
}

buttonExpense.addEventListener("click", setExpense);

// Function to delete a user from the array and regenerate table
function deleteExpense(expense, index) {
  // console.log({ expense, index, amount: expenses[index].amount });
  // Check if index is within valid range
  // console.log(expenses.length, "expenses.length");
  // if (expenses.length === 1) {
  //   console.log("header");
  //   const element = document.getElementById("demo");
  //   element.remove();
  // }
  if (index >= 0 && index < expenses.length) {
    // Remove user from the array
    expenses.splice(index, 1);

    totalExpense = totalExpense - expense.amount;
    output2.innerHTML = `Rs: ${totalExpense}`;

    balanceCost = balanceCost + expense.amount;
    output3.innerHTML = `Rs: ${balanceCost}`;
    // Refresh the table
    generateTable();
    console.log("Splice Array: ", expenses);
  }
}

// Function to generate the table
function generateTable() {
  // Get the container element
  const tableContainer = document.getElementById("tableContainer");

  // Clear previous table
  tableContainer.innerHTML = "";

  // Create the table element
  const table = document.createElement("table");

  // Create the table header row
  const headerRow = document.createElement("tr");

  // Create header cells
  const headerCell1 = document.createElement("th");
  headerCell1.textContent = "Expense Amount";
  const headerCell2 = document.createElement("th");
  headerCell2.textContent = "Expense Detail";
  const headerCell3 = document.createElement("th");
  headerCell3.textContent = "Due Date";
  const headerCell4 = document.createElement("th");
  headerCell4.textContent = "Payment Date";
  const headerCell5 = document.createElement("th");
  headerCell5.textContent = "Action";

  // Append header cells to the header row
  headerRow.appendChild(headerCell1);
  headerRow.appendChild(headerCell2);
  headerRow.appendChild(headerCell3);
  headerRow.appendChild(headerCell4);
  headerRow.appendChild(headerCell5);

  // Append the header row to the table
  table.appendChild(headerRow);

  // Create table body rows
  expenses.forEach(function (expense, index) {
    const row = document.createElement("tr");

    // Create cells for name and phone number
    const expenseAmountCell = document.createElement("td");
    expenseAmountCell.textContent = expense.amount;
    const expenseDetailCell = document.createElement("td");
    expenseDetailCell.textContent = expense.itemDetail;

    const dueDateCell = document.createElement("td");
    dueDateCell.textContent = expense.dueDate;
    const paymentDateCell = document.createElement("td");
    paymentDateCell.textContent = expense.paymentDate;

    // const buttonCell = document.createElement('td');
    // buttonCell.innerHTML = '<button class="delete-button" onclick="deleteRow()">Delete</button>';

    const actionCell = document.createElement("td");
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash fa-lg" style="color: #f40101;"></i>`;
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      deleteExpense(expense, index);
    });
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fa-regular fa-pen-to-square fa-lg" style="color: #7aed07;"></i>`;
    editButton.className = "edit-button";
    editButton.addEventListener("click", function () {
      editExpense(expense, index);
    });

    // Append delete button to action cell
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(editButton);

    // Append cells to the row
    row.appendChild(expenseAmountCell);
    row.appendChild(expenseDetailCell);
    row.appendChild(dueDateCell);
    row.appendChild(paymentDateCell);
    row.appendChild(actionCell);

    // Append the row to the table body
    table.appendChild(row);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
}

// let expenseAmountValue = [];
// for(let i=0;i<expenses.length;i++){
//   expenseAmountValue = expenses[i].expenseAmount;

// }

// console.log(expenses);
// console.log(expenseAmountValue);

// var expense_cost = parseInt(expenses.slice(0, 1));
// console.log(typeof expense_cost);
// if (expense_cost > budgetCost) {
//   alert("Due to low budget your expense cannot be added");
//   return;
// }

//   // Creating elements in every h4 heading

// const expenseAmount = document.getElementById("Exp_Amt");
// const expenseDetails = document.getElementById("Exp_Dis");
// const dueDate = document.getElementById("Due_Dates");
// const paymentDate = document.getElementById("Pay_Dates");

// function setBudget() {
//   budgetCost = parseInt(getBudget.value);
//   outputValue.innerHTML = `Rs: ${budgetCost}`;
//   document.getElementById("budget-form").reset();
// }

// buttonBudget.addEventListener("click", setBudget);

// function expenseResult() {
//   if (output3 < getAmount.value) {
//     return alert("your expense is more than your total balance!");
//   }
//   // console.log("expenseResult calling");

//   // console.log(expenses);
//   var expense_cost = parseInt(expenses.slice(0, 1));
//   console.log(typeof expense_cost, budgetCost, expenses);

//   // if (budgetCost === 0) {
//   if (!budgetCost) {
//     return alert("Can't find budget cost please enter budget cost first!");
//   }
//   if (expense_cost > budgetCost) {
//     return alert("Due to low budget your expense cannot be added");
//   }
//   id = id++;
//   console.log({ id });

//   expenses.push({
//     id: id,
//     expenseAmount: getAmount.value,
//     expenseDetails: itemDetail.value,
//     paymentDate: getPaymentDate.value,
//     dueDate: getDueDate.value,
//   });

//   const tableBody = document.querySelector("tbody");
//   let innerHTML = "";

//   // <button type="button" onclick="console.log(${expense.id}, 'id')">Delete</button>

//   expenses.forEach((expense) => {
//     innerHTML =
//       innerHTML +
//       `<tr>
//     <td>${expense.expenseAmount}</td>
//     <td>${expense.expenseDetails}</td>
//     <td>${expense.dueDate}</td>
//     <td>${expense.paymentDate}</td>
//     <button type="button" onclick="removeExpense(${expense.id})">Delete</button>
//     <button type="button" onclick="editExpense(${expense.id})">Edit</button>

//   </tr>`;
//   });

//   tableBody.innerHTML = innerHTML;
//   console.log(innerHTML, "innerHTML");
//   // console.log("Expense Cost "+ expense_cost);
//   // console.log(typeof expense_cost);

//   // var x = expenses.toString();
//   // console.log(x);
//   // outputExpense.innerHTML = expenses;
//   // Exp_Amt.innerHTML = expenses[0]

//   // Creating elements in every h4 heading

//   const expenseAmount = document.getElementById("Exp_Amt");
//   const expenseDetails = document.getElementById("Exp_Dis");
//   const dueDate = document.getElementById("Due_Dates");
//   const paymentDate = document.getElementById("Pay_Dates");

//   // let para1 = document.createElement("p");
//   // para1.className = "styling";
//   // para1.innerHTML = expenses[0];
//   // container1.appendChild(para1);

//   // output2.innerHTML = expense_cost;
//   // let balance = budgetCost - expense_cost;

//   // output3.innerHTML = balance;

//   // let para2 = document.createElement("p");
//   // para2.className = "styling";
//   // para2.innerHTML = expenses[1];
//   // container2.appendChild(para2);

//   // let para3 = document.createElement("p");
//   // para3.className = "styling";
//   // para3.innerHTML = expenses[2];
//   // container3.appendChild(para3);

//   // let para4 = document.createElement("p");
//   // para4.className = "styling";
//   // para4.innerHTML = expenses[3];
//   // container4.appendChild(para4);

//   // document.getElementById("add_expense_form").reset();
// }

// buttonExpense.addEventListener("click", expenseResult);

function editExpense(expense, index) {
  console.log({ expense: expense, index });
  console.log(expense, "expense", index, "index");

  // const getAmount = document.getElementById("amountOfItem");
  // const itemDetail = document.getElementById("itemDetail");
  // const getDueDate = document.getElementById("due_date");
  // const getPaymentDate = document.getElementById("payment_Date");
  expenseEdit = expense;
  const { amount, itemDetail, dueDate, paymentDate } = expense;
  getAmount.value = amount;
  itemDetail.value = itemDetail;
  getDueDate.value = dueDate;
  getPaymentDate.value = paymentDate;
  
}
// function fun2(){
//     outputExpense.innerHTML = getDueDate.value;
//     // outputExpense.innerHTML = getAmount.value;
//     // outputExpense.innerHTML = getPaymentDate.value;
// }

// if(cost <=0){
//     alert("Use positive numbers to set budget");
//     if(cost = ""){
//         alert("You should write something");
//     }
// }
// else{
//     outputValue.innerHTML = cost;
// }
