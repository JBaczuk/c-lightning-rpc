const LightningRpc = require('../c-lightning-rpc')

l = new LightningRpc('/home/jbaczuk/.lightning/lightning-rpc')

l.call('getinfo')
.then((response) => {
    console.debug('TEST ', response)
})

