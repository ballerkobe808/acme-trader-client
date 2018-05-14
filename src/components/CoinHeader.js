import React, { Component } from 'react';

// import Chart from 'chart.js';
// import dateFormat from 'dateformat';


class CoinHeader extends Component {

  constructor(props) {
    super(props);

    // this.state = { priceChange: '' }
  }


  render () {
    let priceChange
    let priceChangePercent
    let changeColor = 'green';

    // calculate the data to be displayed
    if (this.props.coin.trades) {
      let valChange = (parseFloat(this.props.coin.last_traded) - this.props.coin.trades[0].price)
      priceChange = valChange.toFixed(2);
      priceChangePercent = ((valChange / this.props.coin.trades[0].price) * 100).toFixed(2)
    }
    if (priceChange < 0) changeColor = 'red'

    // only display if there is data to display
    if (this.props.coin.base) {
      return (
        <div style={{height: '80px'}}>
          <div style={{marginBottom: '-5px'}}>
            <span style={{color: 'black', fontSize: '1.7em', fontWeight: 'bold', marginRight: '5px'}}>
             {this.props.coin.base}
            </span>
            <span style={{color: 'gray'}}> ({this.props.coin.name}) </span>
            <span style={{color: 'gray', fontSize: '0.9em'}}> Kraken Bitcoin Exchange</span>
          </div>
          <div style={{color: 'black', fontSize: '1.5em'}}>
              <span style={{marginRight: '5px'}}> {this.props.coin.lastTraded} </span>
              <span style={{color: changeColor, fontSize: '0.7em'}}>
              {priceChange} ({priceChangePercent}%)
              </span>
          </div>
        </div> 
      )
    }
    // otherwise just leave it empty - later put useful info
    else {
      return (
        <div style={{height: '80px'}}>
        </div>
      );
    }
  }

}

export default CoinHeader;