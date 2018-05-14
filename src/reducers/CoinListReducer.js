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

  let rowData;

  switch (action.type) {
    // clear the row data to start
    // later on add loading properties
    case 'FETCH_COINS_START':
      rowData = null;
    break;

    // we got the coins from the server
    case 'FETCH_COINS_FULFILLED':
      // map the data a little - should this be moved out of here to a mapping service???
      action.payload.map(coin => {
        coin.fullBase = coin.base + ' (' + coin.altbase + ')';
        if (!coin.name) coin.name = '??'
        // coin.fullBase = coin.base + ' (' + coin.altbase + ') - ' + coin.name;

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
          // quick solution taken from:
          // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
          coin.lastTraded = '$' + (parseFloat(coin.last_traded)).toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
          });
        } else {
          coin.lastTraded = 'No Data Found';
        }

        return coin;
      })

      rowData = action.payload;
      break;

    // start out with just the column headers and no data until we get something
    // from the server
    default:
    rowData = null;

  };


  return {
    columnDefs: columnDefs,
    rowData: rowData
  }; 

}