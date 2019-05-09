const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')
module.exports = (options = []) => {
    return wapper(new ProcessHandler(function checkVersion() {
        spawn(`node ${require.resolve("x-package-version-strict-check")}`, [...options], {
            stdio: "inherit",
            shell: true
        }).on('exit', (code) => {
            if (code == 0) {
                this.resolve()
            } else {
                this.reject()
            }
        }).on('error', (error) => {
            this.reject(error)
        })
    }))
}