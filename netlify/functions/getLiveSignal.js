exports.handler = async function () {
  const signals = [
    { asset: "BTC/USDT", type: "Buy", reason: "RSI < 30 + MACD crossover" },
    { asset: "EUR/USD", type: "Sell", reason: "MACD bearish + ADX trend" },
    { asset: "USD/JPY", type: "Buy", reason: "EMA10 bounce + Strong ADX" }
  ];
  const signal = signals[Math.floor(Math.random() * signals.length)];
  return {
    statusCode: 200,
    body: JSON.stringify(signal)
  };
};