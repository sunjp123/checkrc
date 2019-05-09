const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')

module.exports = (options) => {
    return wapper(new ProcessHandler(function eslint() {
		if(!options || !Array.isArray(options)){
			const eslintCfg = require('rc')('ceslint', {
				'path':'./',
				'--max-warnings':20
			},true);
			let eslintOpts = []
			Object.entries(eslintCfg).map((item,index)=>{
				console.log(item)
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