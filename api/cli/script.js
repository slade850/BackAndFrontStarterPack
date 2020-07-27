const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer = require('inquirer');


clear();

console.log(
    chalk.yellow(
    figlet.textSync('BackAndFront', { horizontalLayout: 'fitted' })
    )
);


const questions = [
    {
        name: 'serverPort',
        type: 'input',
        message: 'Enter your server port: '
    },
    {
        name: 'dbPort',
        type: 'input',
        message: 'Enter your Mysql port: '
    },
    {
        name: 'username',
        type: 'input',
        message: 'Enter your Mysql username: '
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your MySql password: '
    },
    {
        name: 'dataBase',
        type: 'input',
        message: 'Enter the name of db you want used or create in Mysql: '
    },
    {
        name: 'secretToken',
        type: 'password',
        message: 'Enter a secret token for secure your cookies and generated token: '
    },
    ];


    
    const takeInfo = async () => {
        const envInfo = await inquirer.prompt(questions);
        const fileData = `SERVER_PORT=${envInfo.serverPort} \n DB_PORT=${envInfo.dbPort} \n DB_HOST=localhost \n DB_USER=${envInfo.username} \n DB_PASS=${envInfo.password} \n DB_BASE=${envInfo.dataBase} \n SECRET_TOKEN=${envInfo.secretToken}`;
        const fileApi = `import axios from 'axios'; \n
        //config axios for work with cookies
        axios.defaults.withCredentials = true;
        //init an instance with url of api
        const instance = axios.create({ 
            baseURL: 'http://localhost:${envInfo.serverPort}/api/'
        }) \n
        export default instance;`;

        fs.writeFile('apiConfig.env', fileData, {encoding: 'utf8'}, (err) => {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.writeFile('../src/js/utils/api.js', fileApi, { encoding: 'utf8'}, (err) => {
            if (err) throw err;
            console.log('Ready!');
        })
    }

takeInfo()
.then(res => {
    console.log('your starter pack has been successfully initialized.')
})
.catch(err => console.log(err))