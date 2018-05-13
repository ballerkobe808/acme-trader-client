// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and update its piece of the store
// when its something it cares about

export default function(state = {}, action) {

  console.log(action);

  const columnDefs = [
    { headerName: "Symbol", field: "altbase" },
    { headerName: "Name", field: "name" },
    { headerName: "Market Cap", field: "marketcap" }
  ]

  switch (action.type) {
    case 'FETCH_COINS_FULFILLED':
      return {
        columnDefs: columnDefs,
        rowData: action.payload
      };
      break;

    // start out with just the column headers and no data until we get something
    // from the server
    default:
      return {
        columnDefs: columnDefs,
        rowData: null // null rowdata in ag grid will show "Loading"
      }

  };



}