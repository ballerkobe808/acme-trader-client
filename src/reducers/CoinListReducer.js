// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and update its piece of the store
// when its something it cares about

export default function(state = {}, action) {

  console.log(action);

  // column definitions for our coin table
  const columnDefs = [
    { headerName: "Symbol", field: "fullBase", width: 115 },
    { headerName: "Name", field: "name", width: 140 },
    { headerName: "Last Traded", field: "lastTraded", width: 155 },
    { headerName: "Market Cap", field: "marketcap", width: 160 }
  ]


  switch (action.type) {
    // clear the row data to start
    // later on add loading properties
    case 'FETCH_COINS_START':
      return {
        ...state,
        loading: true
      }; 
    // break;

    // we got the coins from the server
    case 'FETCH_COINS_FULFILLED':
      // map the data a little - should this be moved out of here to a mapping service???
      action.payload.map(coin => {
        // if the alt base is different, then show it as well
        if (coin.base !== coin.altbase) {
          coin.fullBase = coin.base + ' (' + coin.altbase + ')';
        }
        else {
          coin.fullBase = coin.base;
        }
        // if no coin name found show ??
        if (!coin.name) coin.name = '??'

        //  convert marketcap to displayable dollars 
        if (coin.marketcap) {
          // quick solution taken from:
          // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
          coin.marketcap = '$' + (parseFloat(coin.marketcap)).toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
          });
        } else {
          coin.marketcap = 'No Data Found';
        }

        //  convert to displayable dollars 
        if (coin.last_traded) {
          let decmialPlaces = coin.display_decimals
          if (decmialPlaces == null || parseFloat(coin.display_decimals) < 3) decmialPlaces = 3;
          // quick solution taken from:
          // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
          coin.lastTraded = '$' + (parseFloat(coin.last_traded)).toFixed(decmialPlaces).replace(/./g, function(c, i, a) {
            // dont add commas right of the decimal
            if (i <= a.indexOf('.')) {
              return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }
            else {
              return i && c;
            }
            
          });
        } else {
          coin.lastTraded = 'No Data Found';
        }

        return coin;
      })

      return {
        columnDefs: columnDefs,
        rowData: action.payload,
        loading: false
      }; 

    // start out with just the column headers and no data until we get something
    // from the server
    default:
    //   return state;
      // return {
      //   ...state,
      //   columnDefs: columnDefs
      //   // rowData: null,
      //   // loading: false
      // }; 
  };


  return state;

}