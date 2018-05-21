// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and update its piece of the store
// when its something it cares about
export default function(state = {}, action) {

  // column definitions for our coin table
  const columnDefs = [
    { headerName: "Symbol", field: "fullBase", width: 110 },
    { headerName: "Name", field: "name", width: 140 },
    { headerName: "Last Traded", field: "lastTraded", width: 140 },
    { headerName: "Market Cap", field: "marketcap", width: 160 },
    { headerName: "ERC20", field: "erc20", width: 80 }
  ]


  // sort an array of objects by the time property 
  const sortData = function(data) {
    if (data) {
      data.sort(function(a, b) {
        if (a.time < b.time) {
          return -1;
        } else if (a.time > b.time) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  // convert a value into a displayable usd, use the decmialPlaces passed in to
  // determine how many decimals to the right will be displayed
  const valueToUsd = function(value, decmialPlaces) {
    let newValue = 'no data found'
    // quick solution taken from:
    // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
    if (value) {
      newValue = '$' + (parseFloat(value)).toFixed(decmialPlaces).replace(/./g, function(c, i, a) {
        // dont add commas right of the decimal
        if (i <= a.indexOf('.')) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        } else {
          return i && c;
        }
      });
    }

    return newValue;
  }


  switch (action.type) {
    // this is sent when the data is beginning to load
    case 'FETCH_COINS_START':
      return {
        ...state,
        loading: true
      };

      // we got the coins from the server
    case 'FETCH_COINS_FULFILLED':
      // map the data a little - should this be moved out of here to a mapping service???
      action.payload.map(coin => {
        // if the alt base is different, then show it as well
        if (coin.base !== coin.altbase) {
          coin.fullBase = coin.base + ' (' + coin.altbase + ')';
        } else {
          coin.fullBase = coin.base;
        }
        // if no coin name found show ??
        if (!coin.name) coin.name = '??'

        //  convert to displayable dollars 
        coin.marketcap = valueToUsd(coin.marketcap, 2)
        let decmialPlaces = coin.display_decimals
        if (decmialPlaces == null || parseFloat(coin.display_decimals) < 3) decmialPlaces = 3;
        coin.lastTraded = valueToUsd(coin.last_traded, decmialPlaces)

        // data doesnt come in sorted consistently, so do that now
        sortData(coin.trades)
        sortData(coin.spreads)

        return coin;
      })

      return {
        ...state,
        columnDefs: columnDefs,
        rowData: action.payload,
        loading: false
      };

    default:
  };



  return state;




}

