
const Utils = require('./utils')

module.exports = {
    eslint: {
        name: "eslint",
        package: "eslint",
        installed: Utils.isInstalled("eslint"),
        recommended: true,
        description: ""
    },
    xpVersion: {
        name: "x-package-version-strict-check",
        package: "x-package-version-strict-check",
        installed: Utils.isInstalled("x-package-version-strict-check"),
        recommended: true,
        description: ""
    }
}
