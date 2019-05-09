const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')

module.exports = (packageName) => {
	
    return wapper(new ProcessHandler(function install() {
        spawn(`npm i`, [`${packageName}`,'--save-dev'], {
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