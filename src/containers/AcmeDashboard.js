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

class AcmeDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // current selected coin (and all the chart data with it)
      currentCoin: null, 
      // had to add a template cuz the default position of the "Loading" html was showing up behind the selected row
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center" style="z-index: 100; position: relative;">Refreshing Data <i class="fa fa-circle-o-notch fa-spin"></span>',
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
  }

 
  // if the propertys or state changed, then check to see if need to take any actions
  componentDidUpdate(prevProps, prevState) {
    // if we came back and it was loading, but now its not, then clear any loading message
    if (this.gridApi && prevProps.coinList.loading && !this.props.coinList.loading) {
      this.gridApi.hideOverlay();
    }

    // if we changed from no polling to polling, then start the polling up
    if (!prevProps.pollingTime.doPollingp && this.props.pollingTime.doPolling) {
      this.startPoll();
    }
    // if we are stopping polling, then stop the current poll cycle
    else if (prevProps.pollingTime.doPolling && !this.props.pollingTime.doPolling)  {
      clearTimeout(this.timeout);
    }


  }



  // table of cyrpto values on the left of the page
  agGridComponent() {
    return (
      <div className="ag-theme-balham mb-4 pb-4" style= {{ height: '450px' }}>
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
          <SpreadChart data={ this.state.currentCoin } />
        </section>
        <section id="tab2" className="tab-content hide">
          <TradeChart data={ this.state.currentCoin } />
        </section>
        <section id="tab3" className="tab-content hide">
          <BidDepthChart data={ this.state.currentCoin } />
        </section>
        <section id="tab4" className="tab-content hide">
          <AskDepthChart data={ this.state.currentCoin } />
        </section>
      </div>
    );
  }

  render() {
    let detailDisplay = 'none';
    // only display the  coin detail component if there is information
    if (this.state.currentCoin) {
      detailDisplay = 'block';
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            {this.agGridComponent()}
          </div>
          <div className="col-md-6 pt-2" style={{ display: detailDisplay}}>
            {this.coinDetailsComponent()}
          </div>
        </div>
      </div>
    );
  }


  // user clicked to refresh data in the list
  refreshClick() {
    // repull the data
    this.gridApi.showLoadingOverlay(); //have to call this manually - weird thing with the ag-grid it says no rows when the table is empty OR null
    this.props.fetchCoins();
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
    clearTimeout(this.timeout);

    // Check to see if user has polling enabled, and we dont have
    // a request out pending
    if (this.props.pollingTime.doPolling && !this.props.coinList.loading) {
      this.timeout = setTimeout(() => {
        this.gridApi.showLoadingOverlay();
        this.props.fetchCoins();
        this.startPoll();
      }, this.props.pollingTime.milliseconds);
    }
    
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
      });
    }
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
    coinList: state.coinList,
    pollingTime: state.pollingTime,

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
export default connect(mapStateToProps, matchDispatchToProps)(AcmeDashboard);