// import axios from "axios";

// // Actions are a way of telling the app that "something happened"
// // setup your action(s) here, these will be sent to one or more reducers
// // put most of your business logic here, since you have access to the full store
// // vs reducers where you only have access to a limited part of the store

// // this function is the action creator
// // its job is to return an object which is called the "action"
// export function fetchCoins() {

//   return function(dispatch) {
//     dispatch({ type: "FETCH_COINS" });

//     const config = {
//       method: 'GET',
//       // mode: 'no-cors',
//       headers: {
//         // 'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       // withCredentials: true,
//       // credentials: 'same-origin',
//     }
    

//     axios.all([
//         axios.get("https://api.kraken.com/0/public/Assets", config),
//         axios.get("https://api.kraken.com/0/public/AssetPairs", config),
//         axios.get("https://api.coinmarketcap.com/v1/ticker/"),
//         // axios.get("https://www.isiterc20.com/"),
//       ])
//       .then(axios.spread(function(assets, AssetPairs, coins) {

//         const coinList = coins.data;
//         const assetList = assets.data.result;
//         const pairsList = AssetPairs.data.result;
//         // console.log(erc20Html)

//         // list of only pair assets from kraken that are usd based
//         const usdList = [];
//         console.log(pairsList)

//         //loop thru all the asset pairs, but only use ones
//         // that have a USD pairing
//         Object.keys(pairsList).forEach(function(key) {

//           // using this quote check to say it is a USD pair
//           // could alse use a string parse of the last 3 chars and
//           // see if it matches USD...
//           // ALSO ignore the .d pairs - WHAT ARE THESE???
//           // they seem to be same as an existing pair without a .d at the end...
//           if (pairsList[key].quote === 'ZUSD' && key.indexOf('.d') < 0) {

//             // ok now build the object we will use
//             let coin = Object.assign({}, pairsList[key], { name: key })

//             // add the alternative name of the base using the asset listing we got
//             Object.keys(assetList).forEach(function(assetKey) {
//               if (coin.base === assetKey) {
//                 coin.altBaseName = assetList[assetKey].altname
//               }
//             });

//             // special case for bitcoin - kraken uses xbt, but everywhere else uses btc, 
//             // so set that here
//             if (coin.altBaseName === 'XBT') coin.altBaseName = 'BTC'

//             // lookup the name and the Total market capitalization of the currency in USD
//             let marketCoin = coinList.find(c => c.symbol === coin.altBaseName)

//             // if there is a matching record, add it to the coin
//             if (marketCoin) {
//               coin.fullName = marketCoin.name;
//               coin.marketCap = marketCoin.market_cap_usd;
//             }
//             // otherwise no matching record, then look it up ourselves
//             else {
//               // console.log(this)
//               // coin.fullName = 'test';
//               coin.fullName = getCoinName(coin.altBaseName);
//               coin.marketCap = 'Unknown';
//             }

//             usdList.push(coin)
//           }
//         });


//         console.log(usdList)
//         dispatch({ type: "FETCH_COINS_FULFILLED", payload: usdList })

//       }))
//       .catch(error => {
//         dispatch({ type: "FETCH_COINS_ERROR", payload: error })
//         console.log(error)}
//       );
//   }


//   function getCoinName(symbol) {
//     let name;
  
//     switch (symbol) {
//       case 'ETC':
//         name = 'Ethereum Classic';
//       break;
//       case 'ETH':
//         name = 'Ethereum';
//       break;
//       case 'LTC':
//         name = 'Litecoin';
//       break;
//       case 'REP':
//         name = 'Augur';
//       break;
//       case 'XLM':
//         name = 'Stellar';
//       break;
//       case 'XMR':
//         name = 'Monero';
//       break;
//       case 'XRP':
//         name = 'Ripple';
//       break;
//       case 'ZEC':
//         name = 'Zcash';
//       break;
//       default:
//         name = 'Unknown'
//     }
  
//     return name;
//   }
  

// }