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

import $ from 'jquery'

// libs within this app
import { fetchCoins } from '../actions/FetchActions';
import SpreadChart from '../components/SpreadChart';
import TradeChart from '../components/TradeChart';
import BidDepthChart from '../components/BidDepthChart';
import AskDepthChart from '../components/AskDepthChart';
import CoinHeader from '../components/CoinHeader';

class AgGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spreadData: null,
      tradeData: null,
      bidDepthData: null,
      askDepthData: null,
      currentCoin: {}
    }
    // This binding is necessary to make `this` work in the callback
    // this.refreshClick = this.refreshClick.bind(this);
    // this.onGridReady = this.onGridReady.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    // this.onModelUpdated = this.onModelUpdated.bind(this);
  }

  componentWillMount() {
    this.props.fetchCoins();
    this.bootstrapTabs();
  }

  render() {
    return (
     <div className="row">
        <div className="col-md-6">
         <div className="ag-theme-balham col-12 mb-4" style= {{ height: '480px' }}>
            <AgGridReact style= {{ height: '400px' }} enableSorting={true} enableFilter={true} 
              columnDefs={this.props.coinList.columnDefs} rowData={this.props.coinList.rowData}
              onGridReady={this.onGridReady} enableColResize={true} 
              rowSelection="single" onRowSelected={this.onRowSelected}
              // componentStateChanged={this.onModelUpdated}
              // rowClicked={this.onRowSelected}
              >
            </AgGridReact>
          </div>
        </div>

        <div className="col-md-6">

          <div>
          <CoinHeader coin={ this.state.currentCoin } />

          </div>


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
      <SpreadChart data={ this.state.spreadData } />
		</section>
		<section id="tab2" className="tab-content hide">
    <TradeChart data={ this.state.tradeData } />
		</section>
		<section id="tab3" className="tab-content hide">
    <BidDepthChart data={ this.state.depthData } />
		</section>
    <section id="tab4" className="tab-content hide">
    <AskDepthChart data={ this.state.depthData } />
		</section>

        </div>

        {/* <button onClick={this.props.fetchCoins} className="btn btn-secondary">Refresh</button> */}
      </div>
    );
  }

  // in onGridReady, store the api for later use
  // onGridReady = (params) => {
  //   this.api = params.api;
  //   this.columnApi = params.columnApi;
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
    // console.log(row)
    // only take action on the selected row
    // this event is fired on the row that is selected and also unselected
    if (row.node.selected) {
      this.setState ( {
        currentCoin: row.data,
        spreadData: row.data.spreads,
        tradeData: row.data.trades,
        depthData: row.data,
      });
    }
  }

  // onModelUpdated() {
  //   console.log('updated')
  // }


  // autoSizeColumns() {
  //   var allColumnIds = [];
  //   this.columnApi.getAllColumns().forEach(function(column) {
  //     allColumnIds.push(column.colId);
  //   });
  //   this.columnApi.autoSizeColumns(allColumnIds);
  // }

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