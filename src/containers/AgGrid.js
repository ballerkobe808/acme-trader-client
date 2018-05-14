import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ag grid libraries/dependecies
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import $ from 'jquery'

// libs within this app
import { fetchCoins } from '../actions/CoinActions';
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
      currentCoin: {},
      // had to add a template cuz the default position was behind the selected row
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center" style="z-index: 100; position: relative;">Loading Data</span>',
    }
    // This binding is necessary to make `this` work in the callback
    this.refreshClick = this.refreshClick.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
  }

  // when loading the container, then grab the coins and
  // setup the tabs
  componentWillMount() {
    this.bootstrapTabs();

    this.props.fetchCoins();
    this.startPoll();
  }

 
  componentDidUpdate(prevProps, prevState) {
    // if we came back and row data is there, clear any loading message
    if (this.gridApi && !this.props.coinList.loading) {
      this.gridApi.hideOverlay();
    }
  }


  // table of cyrpto values on the left of the page
  agGridComponent() {
    return (
      <div className="ag-theme-balham col-12 mb-4" style= {{ height: '450px' }}>
        <AgGridReact style= {{ height: '400px' }} enableSorting={true} 
        enableFilter={true} columnDefs={this.props.coinList.columnDefs} 
        rowData={this.props.coinList.rowData} onGridReady={this.onGridReady} 
        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
        enableColResize={true} rowSelection="single" onRowSelected={this.onRowSelected}>
        </AgGridReact>
        <button onClick={this.refreshClick} className="btn btn-secondary form-control">Refresh Data</button>
      </div>
  
    );
  }

  // detail of a crypto that was selected
  coinDetailsComponent() {
    return (
      <div>
        <CoinHeader coin={ this.state.currentCoin } />
        <div className="tab-header">
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
    );
  }

  render() {
    let detailDisplay = 'none';
    // only display the  coin detail component if there is information
    if (this.state.currentCoin.name) {
      detailDisplay = 'block';
    }

    return (
      <div className="row">
      <div className="col-md-6">
        {this.agGridComponent()}
      </div>
      <div className="col-md-6 pt-2" style={{ display: detailDisplay}}>
        {this.coinDetailsComponent()}
      </div>
    </div>
    );
  }


  // user clicked to refresh data in the list
  refreshClick() {
    // clear out the tab data
    // this.setState(
    //   {
    //     spreadData: null,
    //     tradeData: null,
    //     bidDepthData: null,
    //     askDepthData: null,
    //     currentCoin: {}
    //   }
    // )
    // repull the data
    this.gridApi.showLoadingOverlay();
    this.props.fetchCoins();
    // clearTimeout(this.timeout);
    this.startPoll();
  }

  // in onGridReady, store the api for later use
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

   // pull data from the server every so many seconds
  // this is a recursive function, but it can be stopped
  // by clearing this.timeout
  startPoll() {
    console.log('startpoll')
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('executing')
      this.gridApi.showLoadingOverlay();
      this.props.fetchCoins();
      this.startPoll();
    }, 10000);
  }

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
    fetchCoins: fetchCoins
  }, dispatch)
}

// this will connect the component u just created and connect it to the mapStateToProps function
// then export this new smart and connected component
export default connect(mapStateToProps, matchDispatchToProps)(AgGrid);