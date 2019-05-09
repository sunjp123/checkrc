const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')
const packages = require('./package')
const install = require('./install')
const Utils = require('./utils')
const copy = require('./copy')
const path = require('path')

module.exports = (options) => {
    return wapper(new ProcessHandler(async function eslint() {
		if(!await Utils.hasFile('.eslintrc')&&!await Utils.hasFile('.eslintrc.json')){
			console.log(path.resolve())
			console.log(require.resolve('checkrc'))
			//await copy(path.resolve())
		}
		if(!packages.eslint.installed()){
			await install('eslint')
		}
		if(!packages.eslint.installed()){
			this.reject('eslint install error')
		}
		if(!options || !Array.isArray(options)){
			const eslintCfg = require('rc')('ceslint', {
				'path':'./',
				'--max-warnings':20
			},true);
			let eslintOpts = []
			Object.entries(eslintCfg).map((item,index)=>{
				if(item[0] === 'path'){
					eslintOpts.unshift(item[1])
				}else{
					eslintOpts = eslintOpts.concat(item)
				}
			})
			options = eslintOpts
		}
        spawn(`node ${process.cwd()}/node_modules/eslint/bin/eslint`, [...options], {
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