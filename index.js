const net = require('net')

module.exports = class LightningRpc {
    constructor (socketPath) {
        this.socketPath = socketPath
    }

    call (method, params=null) {
        return new Promise ((resolve, reject) => {
            // TODO: filter valid methods
            if (method == undefined)
                return reject('CALL Method undefined')
            
            let client = net.createConnection(this.socketPath)
            client.write('{"method":"getinfo","params":"","id":0}')
            
            client.on("connect", () => {
                console.debug('ON CONNECT connected!')
            })
            
            client.on("data", (data) => {
                console.debug('ON DATA ', data.toString('utf8'))
                client.end()
                return resolve(data.toString('utf8'))
            })
        })
    }
}

