const net = require('net')
const client = net.createConnection("/home/pi/.lightning/lightning-rpc")

/*
def call(self, method, payload=None):
        self.logger.debug("Calling %s with payload %r", method, payload)

        if payload is None:
            payload = {}
        # Filter out arguments that are None
        payload = {k: v for k, v in payload.items() if v is not None}

        sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        sock.connect(self.socket_path)
        self._writeobj(sock, {
            "method": method,
            "params": payload,
            "id": 0
        })
        resp = self._readobj(sock)
        sock.close()

        self.logger.debug("Received response for %s call: %r", method, resp)
        if "error" in resp:
            raise RpcError(method, payload, resp['error'])
        elif "result" not in resp:
            raise ValueError("Malformed response, \"result\" missing.")
return resp["result"]
*/

client.write('{"method":"getinfo","params":"","id":0}')

client.on("connect", () => {
    console.debug('ON CONNECT connected!')
})

client.on("data", (data) => {
    console.debug('ON DATA ', data.toString('utf8'))
    client.end()
})
