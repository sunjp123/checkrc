const { spawn } = require('child_process')

const ProcessHandler = require('./process')
const wapper = require('./wapper')
const fs = require('fs');

module.exports = (source,target) => {
    return wapper(new ProcessHandler(function copy() {
		fs.copyFile(source,target,(err)=>{
			if(err) this.reject()
			this.resolve()
		})
    }))
}