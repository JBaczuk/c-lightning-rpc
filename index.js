const net = require('net')

module.exports = class LightningRpc {
    constructor (socketPath) {
        this.socketPath = socketPath

        // Source: lightning-cli help (v0.6.1)
        this.rpcMethods = {
            feerates: [],
            connect: [],
            listnodes: [],
            getroute: [],
            listchannels: [],
            invoice: [],
            listinvoices: [],
            delinvoice: [],
            delexpiredinvoice: [],
            autocleaninvoice: [],
            waitanyinvoice: [],
            waitinvoice: [],
            decodepay: [],
            help: [],
            stop: [],
            getinfo: [],
            getlog: [],
            fundchannel: [],
            listconfigs: [],
            sendpay: [],
            waitsendpay: [],
            listpayments: [],
            pay: [],
            listpeers: [],
            close: [],
            disconnect: [],
            ping: [],
            withdraw: [],
            newaddr: [],
            devListaddrs: [],
            listfunds: [],
            devRescanOutputs: []
        }
        
        this.initializeMethods()
    }


    call (method, params=null) {
        return new Promise ((resolve, reject) => {
            // TODO: filter valid methods
            if (method == undefined)
                return reject('CALL Method undefined')
            
            let client = net.createConnection(this.socketPath)
            let payload = {
                method: method,
                params: params,
                id: 0
            }
            client.write(JSON.stringify(payload))
            
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

    initializeMethods () {
        for (const cmd of Object.keys(this.rpcMethods)) {
            LightningRpc.prototype[cmd] = async (...args) => {
                let result = await this.call(cmd, args)
                return result
            }
        }
    }
}

