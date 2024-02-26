const WebSocket = require('ws');

module.exports.getEthPrice = async () => {
  return new Promise((resolve, reject) => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ethusdt@trade`);
  let ethPrice;
  ws.onmessage = async (event) => {
    let stockObject = JSON.parse(event.data);
    ethPrice = stockObject.p;
    resolve(ethPrice);
    //ws.close(); // Close the WebSocket connection after receiving the price
  };

  ws.on('error', (error) => {
    console.error(`WebSocket error for ethusdt: ${error.message}`);
  });

  ws.on('close', (code, reason) => {
    console.log(`WebSocket closed for ethusdt with code ${code} and reason: ${reason}`);
  });
});
};


