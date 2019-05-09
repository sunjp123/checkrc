const fs = require('fs');
const path = require('path')
const util = require('util')
const child_process = require('child_process')
const spawn = util.promisify(child_process.spawn)

const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

const packages = require('../lib/package')
const eslint = require('../lib/eslint')
const checkVersion = require('../lib/checkVersion')


module.exports = async (options) =>{
    if(options.async){
        if(options.checkVersion){
            checkVersion()
        }
        if(options.eslint){
			eslint(options.eslint)
        } 
    }else{
        if(options.checkVersion){
            await checkVersion()
        }
        if(options.eslint){
            await eslint(options.eslint)
        } 
    }
     
}