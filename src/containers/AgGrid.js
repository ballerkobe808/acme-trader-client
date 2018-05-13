import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ag grid libraries/dependecies
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
// import 'ag-grid/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid/dist/styles/ag-theme-fresh.css';
// import 'ag-grid/dist/styles/ag-theme-dark.css';
// import 'ag-grid/dist/styles/ag-theme-bootstrap.css';

import dateFormat from 'dateformat';
import Chart from 'chart.js';
import $ from 'jquery'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import {Tabs, Tab} from 'react-bootstrap-tabs';
// import * as d3 from "d3";

// libs within this app
import { fetchCoins } from '../actions/FetchActions';

class AgGrid extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    // this.refreshClick = this.refreshClick.bind(this);
    // this.onGridReady = this.onGridReady.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
  }

  componentWillMount() {
    this.props.fetchCoins();
    this.bootstrapTabs();
  }

  render() {
    return (
     <div className="row">
        <div className="col-md-6">
         <div className="ag-theme-balham col-12 mb-4" style= {{ height: '600px' }}>
            <AgGridReact style= {{ height: '400px' }} enableSorting={true} enableFilter={true} 
              columnDefs={this.props.coinList.columnDefs} rowData={this.props.coinList.rowData}
              // onGridReady={this.onGridReady} 
              rowSelection="single"
              onRowSelected={this.onRowSelected}
              // rowClicked={this.onRowSelected}
              >
            </AgGridReact>
          </div>
        </div>

        <div className="col-md-6">

          {/* <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
              <Tab label="Recent Spread">
                <div>
                <canvas id="spread-chart" width="400" height="400"></canvas>
                </div>
              </Tab>
              <Tab label="Price Movement">
                <div>
                  <canvas id="trade-chart" width="400" height="400"></canvas>
                </div>
              </Tab>
              <Tab label="Depth Chart">
              Tab 2 content
              </Tab>
          </Tabs> */}

          <div>
			<ul className="nav nav-tabs">
				<li className="active">
					<a href="#tab1">Recent Spread</a>
				</li>
				<li>
					<a href="#tab2">Price Movement</a>
				</li>
				<li>
					<a href="#tab3">Bids Depth Chart</a>
				</li>
        <li>
					<a href="#tab4">Asks Depth Chart</a>
				</li>
			</ul>	
		</div>
		<section id="tab1" className="tab-content active">
			<div id="spread-chart-container">
			</div>
		</section>
		<section id="tab2" className="tab-content hide">
			<div id="trade-chart-container">
			</div>
		</section>
		<section id="tab3" className="tab-content hide">
    <div id="bid-depth-chart-container">
			</div>
		</section>
    <section id="tab4" className="tab-content hide">
    <div id="ask-depth-chart-container">
			</div>
		</section>

        </div>

        {/* <button onClick={this.props.fetchCoins} className="btn btn-secondary">Refresh</button> */}
      </div>
    );
  }

  // in onGridReady, store the api for later use
  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
    // console.log('ready')
  }

  // use the api some point later!
  // somePointLater() {
  //   this.api.selectAll();
  //   this.columnApi.setColumnVisible('country', visible);
  // }

  // had to use a jquery implementation of the tabs cuz the bootstrap ones
  // werent just hiding the charts, but deleting them...
  bootstrapTabs() {
    $(document).ready(function() {
      $('.nav-tabs > li > a').click(function(event){
      event.preventDefault();//stop browser to take action for clicked anchor
            
      //get displaying tab content jQuery selector
      var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');					
            
      //find actived navigation and remove 'active' css
      var actived_nav = $('.nav-tabs > li.active');
      actived_nav.removeClass('active');
            
      //add 'active' css into clicked navigation
      $(this).parents('li').addClass('active');
            
      //hide displaying tab content
      $(active_tab_selector).removeClass('active');
      $(active_tab_selector).addClass('hide');
            
      //show target tab content
      var target_tab_selector = $(this).attr('href');
      $(target_tab_selector).removeClass('hide');
      $(target_tab_selector).addClass('active');
         });
      });

  }

  onRowSelected(row) {
    console.log(row)
    // only take action on the selected row
    // this event is fired on the row that is selected and also unselected
    if (row.node.selected) {
      this.showSpreadChart(row.data.spreads);
      this.showTradeChart(row.data.trades);
      this.showBidDepthChart(row.data);
      this.showAskDepthChart(row.data);
    }
    
  }

  showSpreadChart(data) {
    const title = dateFormat(new Date(data[0].time * 1000), "dddd, mmmm dS, yyyy");

    // const currentDate = dateFormat(new Date(), "mmmm d yyyy");
    // const dateDisplay = currentDate

    // console.log(data)
    const times = data.map( spread => { 
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(spread.time*1000);
      return dateFormat(date, "h:MM TT");
    })
    const bids = data.map( spread => { return spread.bid})
    const asks = data.map( spread => { return spread.ask})
    
    // chartjs needs to be destoryed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("spread-chart-container").innerHTML = '&nbsp;';
    document.getElementById("spread-chart-container").innerHTML = '<canvas id="spread-chart"></canvas>';

    new Chart(document.getElementById("spread-chart"), {
      type: 'line',
      data: {
        labels: times,
        datasets: [{ 
          data: asks,
          label: "Ask",
          // borderColor: "blue",
          borderColor: "#007bff",
          fill: false
        }, 
          { 
            data: bids,
            label: "Bid",
            borderColor: "orange",
            fill: false
          }, 
        ]
      },
      options: { 
        title: { display: true, text: title }, 
        elements: { point: { radius: 0 } } 
      }
    });
  }

  showTradeChart(data) {
    const title = dateFormat(new Date(data[0].time * 1000), "dddd, mmmm dS, yyyy");

    // console.log(data)
    const times = data.map( trade => { 
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(trade.time*1000);
      return dateFormat(date, "h:MM TT");
    })
    const trades = data.map( trade => { return trade.price})
    
    // console.log(times)
    // console.log(trades)
    // destory old
    // chart.destroy()

    document.getElementById("trade-chart-container").innerHTML = '&nbsp;';
    document.getElementById("trade-chart-container").innerHTML = '<canvas id="trade-chart"></canvas>';

    // var ctx = document.getElementById("rade-chart").getContext("2d");
    new Chart(document.getElementById("trade-chart"), {
      type: 'line',
      data: {
        labels: times,
        datasets: [{ 
            data: trades,
            label: "Price",
            // borderColor: "gray",
            // borderColor: "#FA5656",
            borderColor: "#E82B2B",
            fill: false
          }
        ]
      },
      options: { 
        title: { display: true, text: title }, 
        elements: { point: { radius: 0 } } // dont show the datapoints make the line easier to read
      }
    });
  }

  showBidDepthChart(data) {
    const title = dateFormat(new Date(data.bids[0].timestamp * 1000), "dddd, mmmm dS, yyyy");

    // const currentDate = dateFormat(new Date(), "mmmm d yyyy");
    // const dateDisplay = currentDate

    // console.log(data)
    // const times = data.bids.map( depth => { 
    //   // Create a new JavaScript Date object based on the timestamp
    //   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    //   var date = new Date(depth.timestamp*1000);
    //   return dateFormat(date, "h:MM TT");
    // })
    const bids = (data.bids.map( depth => { return depth.volume})).reverse();
    const prices = (data.bids.map( depth => { return depth.price})).reverse();

    // add up all the bids volumes by price to display in a graph
    for (let i=0; i<bids.length; i++) {
      let currentPrice = parseFloat(bids[i])
      // loop thru the bids and add each amount to all the prev amounts
      for (let j=0; j<i; j++) {
        let newPrice = parseFloat(bids[j]) + currentPrice;
        bids[j] = newPrice.toString();
        // bids[i] += bids[j]
      }
    }

    // const asks = data.asks.map( depth => { return depth.volume})
    
    // chartjs needs to be destoryed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("bid-depth-chart-container").innerHTML = '&nbsp;';
    document.getElementById("bid-depth-chart-container").innerHTML = '<canvas id="bid-depth-chart"></canvas>';

    new Chart(document.getElementById("bid-depth-chart"), {
      type: 'line',
      data: {
        labels: prices,
        datasets: [
          { 
            data: bids,
            label: "Bid",
            borderColor: "orange",
            fill: false
          }, 
        ]
      },
      options: { 
        title: { display: true, text: title }, 
        elements: { point: { radius: 0 } } 
      }
    });
  }
  
  showAskDepthChart(data) {
    const title = dateFormat(new Date(data.asks[0].timestamp * 1000), "dddd, mmmm dS, yyyy");

    // const currentDate = dateFormat(new Date(), "mmmm d yyyy");
    // const dateDisplay = currentDate

    // console.log(data)
    // const times = data.asks.map( depth => { 
    //   // Create a new JavaScript Date object based on the timestamp
    //   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    //   var date = new Date(depth.timestamp*1000);
    //   return dateFormat(date, "h:MM TT");
    // })
    const asks = data.asks.map( depth => { return depth.volume})
    const prices = data.asks.map( depth => { return depth.price})

    // add up all the asks volumes by price to display in a graph
    asks.reverse();
    for (let i=0; i<asks.length; i++) {
      let currentPrice = parseFloat(asks[i])
      // loop thru and add each amount to all the prev amounts
      for (let j=0; j<i; j++) {
        let newPrice = parseFloat(asks[j]) + currentPrice;
        asks[j] = newPrice.toString();
        // bids[i] += bids[j]
      }
    }
    asks.reverse();

    // const asks = data.asks.map( depth => { return depth.volume})
    
    // chartjs needs to be destoryed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("ask-depth-chart-container").innerHTML = '&nbsp;';
    document.getElementById("ask-depth-chart-container").innerHTML = '<canvas id="ask-depth-chart"></canvas>';

    new Chart(document.getElementById("ask-depth-chart"), {
      type: 'line',
      data: {
        labels: prices,
        datasets: [
          { 
          data: asks,
          label: "Ask",
          // borderColor: "blue",
          borderColor: "#007bff",
          fill: false
          }, 
          // { 
          //   data: ask,
          //   label: "Bid",
          //   borderColor: "orange",
          //   fill: false
          // }, 
        ]
      },
      options: { 
        title: { display: true, text: title }, 
        elements: { point: { radius: 0 } } 
      }
    });
  }
}



// this takes a piece of your application state and passes it in to your component
// as a property. It can pass whatever piece of the store that you want and "map"
// it to a property on your component. How easy is this.

// the reason for this, is that we dont wanna pass in ALL the data in the store to
// every component/container. So by using this we can pick and choose what this 
// component actually gets
function mapStateToProps(state) {
  return {
    coinList: state.coinList
  }
}


// in order for actions to be hooked up correctly in redux, you need to pass the actions here
// vs trying import it and use it directly in the component
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    // hook up the functions you want to pass in to the component here
    // fetchCoins: () => {
    //   dispatch(fetchCoins()).then((response) => {
    //         !response.error ? dispatch(fetchCoinsSuccess(response.payload.data)) : dispatch(fetchCoinsFailure(response.payload.data));
    //       });
    // },
    fetchCoins: fetchCoins
  }, dispatch)
}

// this will connect the component u just created and connect it to the mapStateToProps function
// then export this new smart and connected component
export default connect(mapStateToProps, matchDispatchToProps)(AgGrid);