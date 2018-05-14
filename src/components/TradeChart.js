import React, { Component } from 'react';

import Chart from 'chart.js';
import dateFormat from 'dateformat';


class TradeChart extends Component {

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

    const title = dateFormat(new Date(data[0].time * 1000), "dddd, mmmm dS, yyyy");
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
        title: { display: true, text: title }, 
        elements: { point: { radius: 0 } } // dont show the datapoints make the line easier to read
      }
    });
  }

  render () {
    return (
      <div id="trade-chart-container">
      </div> 
    )
  }

}

export default TradeChart;