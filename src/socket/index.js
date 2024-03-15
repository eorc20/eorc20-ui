/* eslint-disable */
import { getEnvelopeEndpointWithUrlEncodedAuth } from '@sentry/nextjs'
import CFClient from './cfws'

const env = process.env.NODE_ENV
let uri = 'wss://api.public.io/aws'

let BASE_URL = 'api.public.io'
if (process.env.NODE_ENV !== 'development') {
  BASE_URL = typeof window !== 'undefined' ? window.location.hostname : ''
}

uri = `wss://` + BASE_URL + `/aws`

if (process.env.NODE_ENV === 'development') {
  uri = 'ws://192.168.50.2:10078'
}
console.log('wss-URL', uri)

// let uri = ''
// console.log('env', env)
// if (chainId === 15557) {
//   if (process.env.NODE_ENV === 'development') {
//     uri = 'ws://192.168.50.2:10078'
//   } else {
//     uri = 'wss://testapi.public.pro/aws'
//   }
// } else {
//   uri = 'wss://api.public.pro/aws'
// }
// if (reinitializePageRef.current === true) {

// if(env === 'development'){
//   uri = 'wss://testapi.public.pro/aws'
// } else {
//   uri = 'wss://api.public.pro/aws'
// }

const client = new CFClient({ env, uri, debug: false })
const Io = {
  lastSubscribe: null,
  subscribeCallback: null,
  // k线图部分
  // cfwsKline: function (client, params, type = 'hour', subscribe, callback) {
  cfwsKline: function (params, subscribe, callback) {
    var me = this
    let resolution = params.resolution
    delete params.resolution
    client.ready(function () {
      var type = 'hour'
      if (resolution == '5') {
        type = 'minute5'
      } else if (resolution == '15') {
        type = 'minute15'
      } else if (resolution == '30') {
        type = 'minute30'
      } else if (resolution == '60') {
        type = 'hour'
      } else if (resolution == '240') {
        type = 'hour4'
      } else if (resolution == '1D') {
        type = 'day'
      } else if (resolution == '1W') {
        type = 'week'
      } else if (resolution == '1M') {
        type = 'month'
      }
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
              volume: Number(e[5].toFixed(0)),
            })
          })
        }
        callback(res, 'all')
        res.klines = []
      }
      // params.symbol = params.symbol.toLowerCase();
      delete params.symbol
      //请求k线数据
      client.request('kline.' + type, params, function (err, data) {
        if (err) {
          return
        }
        // console.log('原始数据', data)
        wsCallback(data)
      })

      if (!subscribe) return
      // console.log(11111)
      client.subscribe(`kline.${type}.${params.pairId}`, params, function (data) {
        const item = {
          close: data.close,
          // date: me.dataFormat(data.id),
          high: data.high,
          low: data.low,
          open: data.open,
          time: data.id * 1000,
          volume: Number(data.amount.toFixed(0)),
        }
        const res = {
          resolution: resolution,
          symbol: params.symbol,
          klines: [item],
        }
        // console.log(data, '更新订阅')
        callback(res, 'one')
      })
    })
  },
  // 取消交易对所有推送
  cfwsUnsubscribe: function (client, params) {
    let unscribe = '*'
    client.ready(function () {
      if (params) {
        unscribe = params.toLowerCase()
      }
      client.unsubscribe(unscribe)
    })
  },
  // 时间戳转换
  // dataFormat(fdata) {
  //   return moment.unix(fdata).format("YYYY-MM-DD HH:mm:ss")
  // },
  // 交易中心 头部信息
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
