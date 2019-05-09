module.exports = (processHandler) => {
    return new Promise((resolve, reject) => {
        processHandler.success(() => { resolve() }).fail(e => reject(e))
    }).then(()=>{}).catch(e=>{})
}