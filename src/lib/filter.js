

class Filter {
    static otherOptions(options, defaults) {
        if (Array.isArray(options) && Array.isArray(defaults)) {
            return options.filter(option => {
                return !defaults.find(def => def.short === option || def.long === option)
            })
        }
        return []
    }
}

module.exports = Filter