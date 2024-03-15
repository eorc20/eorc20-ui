/* eslint-disable */
import CFClient from './cfws'

const env = process.env.NODE_ENV
const hostname = '' || location.host
let uri = 'wss://api.public.pro/aws'

const client = new CFClient({ env, uri, debug: false })
console.log('client', client)
const Io = {
  lastSubscribe: null,
  subscribeCallback: null,
  cfwsKline: function (client, params, type = 'hour', subscribe, callback) {
    var me = this
    let resolution = params.resolution
    delete params.resolution
    client.ready(function () {
      var wsCallback = function (data) {
        const res = {
          resolution: resolution,
          symbol: params.symbol,
          klines: [],
        }
        if (data.length > 0) {
          data.forEach((e) => {
            res.klines.push({
              // date: me.dataFormat(e[0]),
              // open: e[1],
              // close: e[2],
              // high: e[3],
              // low: e[4],
              open: e[1],
              close: e[2],
              high: e[3],
              low: e[4],
              time: e[0] * 1000,
              // volume: Number(e[5].toFixed(0)),
            })
          })
        }
        callback(res, 'all')
        res.klines = []
      }
      // params.symbol = params.symbol.toLowerCase();
      delete params.symbol
      client.request('kline.' + type, params, function (err, data) {
        if (err) {
          return
        }
        // console.log(data, err, 'dataerr')
        wsCallback(data)
      })

      if (!subscribe) return
      client.subscribe(`kline.${type}.${params.pairId}`, params, function (data) {
        const item = {
          close: data.close,
          // date: me.dataFormat(data.id),
          high: data.high,
          low: data.low,
          open: data.open,
          time: data.id * 1000,
          // volume: Number(data.amount.toFixed(0)),
        }
        const res = {
          resolution: resolution,
          symbol: params.symbol,
          klines: [item],
        }
        // console.log(data, 'datadatadatadata11111')
        callback(res, 'one')
      })
    })
  },
  cfwsUnsubscribe: function (client, params) {
    let unscribe = '*'
    client.ready(function () {
      if (params) {
        unscribe = params.toLowerCase()
      }
      client.unsubscribe(unscribe)
    })
  },
  // dataFormat(fdata) {
  //   return moment.unix(fdata).format("YYYY-MM-DD HH:mm:ss")
  // },
  cfwsHeard: function (params, callback) {
    // const poolMarketInfo = JSON.parse(sessionStorage.getItem('marketIdAndIndex'))
    const symbol = params.symbol
    client.ready(function () {
      client.subscribe(`ticker.${symbol}`, function (data) {
        // if (poolMarketInfo && poolMarketInfo.pairId == "35" && poolMarketInfo.coinIndex === "USN" && !data.isChange) {
        //   const e1 = data.open
        //   const e2 = data.close
        //   const e3 = data.high
        //   const e4 = data.low
        //   const e5 = data.price
        //   data.isChange = true
        //   data.open = accDiv(1, e1)
        //   data.close = accDiv(1, e2)
        //   data.high = accDiv(1, e4)
        //   data.low = accDiv(1, e3)
        //   data.price = accDiv(1, e5)
        //   data.amount = Number(accDiv(data.amount, e2))
        // }
        callback(data)
      })
    })
  },
  // testclient.subscribe
  subscribe(channel, params, callback) {
    client.ready(function () {
      client.subscribe(channel, params, callback)
    })
  },
  unsubscribe(channel, params) {
    client.ready(function () {
      client.unsubscribe(channel, params)
    })
  },
}

export default Io
