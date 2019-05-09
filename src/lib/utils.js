
const opt = Object.prototype.toString;
const fs = require('fs')
class Utils {
    static isInstalled(packageName) {
        try {
            require.resolve(packageName);

            return true;
        } catch (err) {
            return false;
        }
    }
	static async hasFile(filename){
		let ret = await new Promise((resolve,reject)=>{
			fs.exists(`${process.cwd()}/${filename}`,(exist)=>{
				resolve(exist)
			})
		})
		return ret;
	}
    static checkType(arg1, arg2) {
        return opt.call(arg1) == opt.call(arg2)
    }
	static isArray(arg1){
		return checkType(arg1,[])
	}
}

module.exports = Utils