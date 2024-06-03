#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
// 1. declare a variable for generating a five digit number
const randomNumber = Math.floor(10000 + Math.random() * 90000);
// 2. Variable for balance:
let myBalance = 0;
// 3. Use inquirer to ask some questions from user
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter your name: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            else
                return "Please enter your name to continue.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "Please select your course: ",
        choices: ["Graphic Design", "HTML", "Typescript", "Freelancing", "Python"],
    },
]);
let tutionFee = {
    "Graphic Design": 1500,
    HTML: 1000,
    Typescript: 5000,
    Freelancing: 2500,
    Python: 6000,
};
console.log(chalk.yellow.bold(`\nTutionFees: ${tutionFee[answer.courses]}`));
console.log(chalk.blue(`Balance: ${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method:",
        choices: ["Bank Transfer", "Easypaisa", "JazzCash", "PayPal"],
    },
    {
        name: "amount",
        type: "number",
        message: "Enter amount to pay fees:",
        validate: function (value) {
            if (value !== "") {
                return true;
            }
            else
                return "Please enter some amount";
        },
    },
]);
console.log(`\nYou select payment method ${paymentType.payment}.`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.yellow(`\nCongratulation! You have successfully enrolled in ${answer.courses}.\n`));
    let ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "What would you want to do next?",
        choices: ["View Status", "Exit"],
    });
    if (ans.select === "View Status") {
        console.log(`\n *****************Status***************\n`);
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fess Paid: ${paymentAmount}`);
        console.log(`Balance: ${(myBalance += paymentAmount)}`);
    }
    else {
        console.log(`\n Existing Student Management System.`);
    }
}
else {
    console.log(`\nInsufficiant amount due to fees.`);
}
