# Back-end-Node-NG-chat

Hello and Welcome to the back-end part of my first and ongoing Node/Angular chat !

## Install

- To install the following project, start by cloning or downloading it 

- Once you are in the project folder in your computer :

```bash
npm install
```

It will install all the dependencies needed to run this NodeJs API and the socket server
Do take note that in this project, i am using MySql as my chosen database, and Sequelize for the ORM
If you wish to use MariaDB or PostGreSql, a few tweaks might be needed, such as 

```bash
npm install pg 
```
for PostgreSql e.g

- You will also want to change your DB config in the config.json, for instance : 

```json
{
    "development": {
    "username": "Your_User_Name_Here",
    "password": "Your_Password_Here",
    "database": "Your_DB_Name_Here",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql",
    "operatorsAliases": false
    },
    ...
}
```
## Run migrations

Now that you have everything ready (I hope), you will have to run some migrations to get your DB in order. I personnaly
had some issues with Sequelize automatic model synchronisation, so while I work on that, the best way to get started is :

```bash
sequelize db:create
```
 ( Or ``node_modules/.bin/sequelize db:create`` if you don't have it installed globally).It Will create you DB. Check on phpMyAdmin
or directly in your terminal via 
```bash
mysql -u Your_user_name -p
```
Then to migrate : 

```bash
sequelize db:migrate
```
(Or ``node_modules/.bin/sequelize db:migrate``)

## Start the server 
Now you can start your server ! 

```bash
npm start
```

## Go Get and install the Front-end !