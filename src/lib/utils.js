
const opt = Object.prototype.toString;
class Utils {
    static isInstalled(packageName) {
        try {
            require.resolve(packageName);

            return true;
        } catch (err) {
            return false;
        }
    }
    static checkType(arg1, arg2) {
        return opt.call(arg1) == opt.call(arg2)
    }
	static isArray(arg1){
		return checkType(arg1,[])
	}
}

module.exports = Utils