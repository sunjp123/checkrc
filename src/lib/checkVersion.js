const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')
const packages = require('./package')
const install = require('./install')

module.exports = (options = []) => {
    return wapper(new ProcessHandler(async function checkVersion() {
		if(!packages.xpVersion.installed()){
			await install(`x-package-version-strict-check`)
		}
		if(!packages.xpVersion.installed()){
			this.reject('x-package-version-strict-check install error')
		}
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