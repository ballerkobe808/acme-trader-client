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
    this.showChart(this.props.data)
  }
 

  showChart(data) {
    document.getElementById("trade-chart-container").innerHTML = '&nbsp;';
    document.getElementById("trade-chart-container").innerHTML = '<canvas id="trade-chart"></canvas>';

    if (data == null) return; // fix this later

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
    if (this.props.data && this.props.data[0] && this.props.data[0].time) {
      dateTime = dateFormat(new Date(this.props.data[0].time * 1000), "dddd, mmmm dS, yyyy");
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
