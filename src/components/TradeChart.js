import React, { Component } from 'react';

import Chart from 'chart.js';
import dateFormat from 'dateformat';

/**
 * This is the chart to display the list of trades
 */
export default class TradeChart extends Component {

  constructor(props) {
    super(props);
    this.showChart = this.showChart.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // if there is data passed, show the chart
    if (this.props.data) {
      this.showChart(this.props.data.trades)
    }
  }
 

  showChart(data) {
    document.getElementById("trade-chart-container").innerHTML = '&nbsp;';
    document.getElementById("trade-chart-container").innerHTML = '<canvas id="trade-chart"></canvas>';

    // // data doesnt come in sorted consistently, so do that now
    // data.sort(function(a, b){
    //   if (a.time < b.time) {
    //     return -1;
    //   }
    //   else if (a.time > b.time) {
    //     return 1;
    //   }
    //   else {
    //     return 0;
    //   }
    // });
    // setup the arrays of data used in the chart
    const times = data.map( trade => { 
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(trade.time*1000);
      return dateFormat(date, "h:MM TT");
    })
    const trades = data.map( trade => { return trade.price})

    new Chart(document.getElementById("trade-chart"), {
      type: 'line',
      data: {
        labels: times,
        datasets: [{ 
            data: trades,
            label: "Price",
            borderColor: "#E82B2B",
            fill: false
          }
        ]
      },
      options: { 
        title: { display: false }, 
        elements: { point: { radius: 0 } }, // dont show the datapoints make the line easier to read
        animation: false
      }
    });
  }

  render () {
    // display the date of the timestamps of the data on the bottom
    let dateTime = '';
    if (this.props.data && this.props.data.trades && this.props.data.trades[0] && this.props.data.trades[0].time) {
      let spreadLength = this.props.data.trades.length
      let startDateTime = dateFormat(new Date(this.props.data.trades[0].time * 1000), "dddd, mmmm dS, yyyy");
      let endDateTime = dateFormat(new Date(this.props.data.trades[spreadLength - 1].time * 1000), "dddd, mmmm dS, yyyy");
      // if the start and end date are different, then show the range, otherwise just show one date
      dateTime = (startDateTime === endDateTime) ? startDateTime  : startDateTime + ' - ' + endDateTime;
    }
    
    return (
      <div>
        <div id="trade-chart-container">
        </div> 
        <div style={{textAlign: 'center', color: '777', fontSize: '0.8em', paddingBottom: '10px'}}>
          {dateTime}
        </div>
      </div>
    )
  }

}
