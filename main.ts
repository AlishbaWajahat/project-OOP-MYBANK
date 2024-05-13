#! /usr/bin/env node



import inquirer from "inquirer";
import chalk from "chalk";

class bank{
    pin:number=0;
    Amount:number=0;
constructor(public firstName:string,public lastName:string,public age:number,public gender:string, public mobileNumber:number){}

createAccount(pin:number,DepositedAmount:number){
    this.pin=pin;
    this.Amount=DepositedAmount;
    console.log(`Your account has been successfully created!`);
}

Debit(amount:number){
    if(amount<=this.Amount){
        this.Amount-=amount;
        console.log(chalk.green(`Transaction sucessful!,Now your new balance is ${this.Amount}`));
        
    }else if(amount>this.Amount){
        console.log(chalk.red(`You don't have enough money to do this transaction!`));
        
    }else{
        console.log(chalk.red(`You made a mistake entering the amount`));
        
    }
        
}

Credit(amount:number){
    if(amount>0){
        this.Amount+=amount;
        if(amount>=1000){
            this.Amount-=500;
        }
        console.log(chalk.cyan(`Your account has been successfully credited.And your balance is ${this.Amount}`));
        
    }
    else{
        console.log(chalk.red(`Enter an appropriate amount.`));
        
    }
}
checkBalance(){
    console.log(chalk.cyan(`Your balance is ${this.Amount}`));
    
}

}

async function main(){

    console.log(chalk.yellow(`WELCOME TO OUR BANK!`));


    console.log(chalk.cyanBright.bold(`Before proceeding further , register yourself!`));

    let register=await inquirer.prompt([{
        message:"What is your first name?",
        type:"input",
        name:"First Name"
    },{
        message:"What is your last name?",
        type:"input",
        name:"Last Name"
    },{
        message:"What is your age?",
        type:"number",
        name:"Age"
    },{
        message:"What is your gender?",
        type:"input",
        name:"Gender"
    },{
        message:"What is your mobile number?",
        type:"number",
        name:"mobileNo"
    }])
    let newCustomer=new bank(register.First,register.Last,register.Age,register.Gender,register.mobileNo);
    console.table(register)
    console.log(`You have been successfully registered!`);

    let createAccount=await inquirer.prompt({
        message:"Do you want to create an account?",
        type:"confirm",
        name:"Confirm",
        default:true
    })
    if(createAccount.Confirm===true){
        let answer=await inquirer.prompt([{
            message:"To create an account , you have to deposit an amount first.Enter that amount.",
            type:"number",
            name:"amount"
        },{
            message:"Select an unique pin for your account.",
            type:"number",
            name:"pin"
        }])
        newCustomer.createAccount(answer.pin,answer.amount)
        
    }else{
        console.log(`We will be waiting for you , Take care!`);
        process.exit();
        
    }
     let condition=true;
    while(condition){
    let answer1=await inquirer.prompt([{
        message:"What do you want to do now?",
        type:"list",
        name:"options",
        choices:["Debit cash","Credit cash","Check Balance","Exit"]
    }])
    if(answer1.options==="Debit cash"){
        let answer2=await inquirer.prompt([{
            message:"Enter the amount of cash to be debit.",
            type:"number",
            name:"amount"
        },{
            message:"Enter your pin.",
            type:"number",
            name:"pin"
        }])
        if(answer2.pin===newCustomer.pin){
        newCustomer.Debit(answer2.amount)
        }else{
            console.log(chalk.red(`You entered wrong pin!`));
            
        }
    }

    else if(answer1.options==="Credit cash"){
        let answer3=await inquirer.prompt([{
            message:"Enter the amount of cash to be credit.",
            type:"number",
            name:"amount"
        },{
            message:"Enter your pin.",
            type:"number",
            name:"pin"
        }])
        if(answer3.pin===newCustomer.pin){
            newCustomer.Credit(answer3.amount)
        }else{
                console.log(chalk.red(`You entered wrong pin!`));
                
            }


    }else if(answer1.options==="Check Balance"){
        let answer4=await inquirer.prompt({
            message:"Enter your pin.",
            type:"number",
            name:"pin"
        })
        
        if(answer4.pin===newCustomer.pin){
            newCustomer.checkBalance()
        }else{
            console.log(chalk.red(`You entered wrong pin!`));
        }

    }
    else if (answer1.options==="Exit"){
        console.log(chalk.yellowBright(`We hope you had a good experience with us!`));
        process.exit();
        
    }
    var answer5=await inquirer.prompt({
        message:"Do something?",
        type:"confirm",
        name:"Confirm",
        default:true
    })
    condition=answer5.Confirm

}
    

}
main()