import React, { Component } from 'react';

import Chart from 'chart.js';


export default class AskDepthChart extends Component {

  constructor(props) {
    super(props);
    this.showChart = this.showChart.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {
    // if there is data passed, show the chart
    if (this.props.data) {
      this.showChart(this.props.data)
    }
  }

  showChart(data) {
    // chartjs needs to be destoryed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("ask-depth-chart-container").innerHTML = '&nbsp;';
    document.getElementById("ask-depth-chart-container").innerHTML = '<canvas id="ask-depth-chart"></canvas>';

    // if (data == null) return; // fix this later

    // setup the arrays of data used in the chart
    const asks = data.asks.map( depth => { return depth.volume})
    const prices = data.asks.map( depth => { return parseFloat(depth.price).toFixed(2)})

    // add up all the asks volumes by price to display in a graph
    asks.reverse();
    for (let i=0; i<asks.length; i++) {
      let currentPrice = parseFloat(asks[i])
      // loop thru and add each amount to all the prev amounts
      for (let j=0; j<i; j++) {
        let newPrice = parseFloat(asks[j]) + currentPrice;
        asks[j] = newPrice.toString();
      }
    }
    asks.reverse();

    new Chart(document.getElementById("ask-depth-chart"), {
      type: 'line',
      data: {
        labels: prices,
        datasets: [
          { 
          data: asks,
          label: "Asks",
          borderColor: "#007bff",
          fill: false
          }, 
        ]
      },
      options: { 
        title: { display: false }, 
        elements: { point: { radius: 0 } },
        animation: false
      }
    });
  }

  render () {
    return (
      <div id="ask-depth-chart-container" className="mb-4">
      </div> 
    )
  }

}
