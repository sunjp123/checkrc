const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

const Utils = require('./utils')

const noop = () => { }
class Print {
    static success(msg) {
        console.log(symbols.success, chalk.green(msg));
    }
    static fail(msg) {
        console.log(symbols.error, chalk.red(msg));
    }
    static info(msg) {
        console.log(symbols.info, chalk.green(msg));
    }
}
class ProcessHandler {
    constructor(handler) {
        this._finish = noop;
        this._fail = noop;
        this._success = noop;
        this.resolve = noop;
        this.reject = noop;
        this.do(handler)
    }
    do(handler) {
        // const spinner = ora({text:`开始执行${handler.name}操作...`,color:'green'});
        // spinner.start();
        Print.info(`开始执行${handler.name}操作`);
        new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            handler.apply(this)
        }).then(() => {
            Print.success(`执行${handler.name}操作成功`);
            this._success()
            this._finish()
        }).catch((e) => {
            Print.fail(`${handler.name}操作失败`);
            this._fail()
            this._finish()
        })
        return this;
    }
    finish(work = noop) {
        if (Utils.checkType(this._finish, work))
            this._finish = work
        return this;
    }
    fail(work = noop) {
        if (Utils.checkType(this._fail, work))
            this._fail = work
        return this;
    }
    success(work = noop) {
        if (Utils.checkType(this._success, work))
            this._success = work
        return this;
    }
}

module.exports = ProcessHandler