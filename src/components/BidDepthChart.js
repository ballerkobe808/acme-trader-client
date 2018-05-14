import React, { Component } from 'react';

import Chart from 'chart.js';
import dateFormat from 'dateformat';


class BidDepthChart extends Component {

  constructor(props) {
    super(props);
    this.showChart = this.showChart.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {
    this.showChart(this.props.data)
  }
 
  showChart(data) {
    // chartjs needs to be destoryed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("bid-depth-chart-container").innerHTML = '&nbsp;';
    document.getElementById("bid-depth-chart-container").innerHTML = '<canvas id="bid-depth-chart"></canvas>';

    if (data == null) return; // fix this later

    const title = dateFormat(new Date(data.bids[0].timestamp * 1000), "dddd, mmmm dS, yyyy");
    const bids = (data.bids.map( depth => { return depth.volume})).reverse();
    const prices = (data.bids.map( depth => { return parseFloat(depth.price).toFixed(2)})).reverse();

    // add up all the bids volumes by price to display in a graph
    for (let i=0; i<bids.length; i++) {
      let currentPrice = parseFloat(bids[i])
      // loop thru the bids and add each amount to all the prev amounts
      for (let j=0; j<i; j++) {
        let newPrice = parseFloat(bids[j]) + currentPrice;
        bids[j] = newPrice.toString();
      }
    }

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
        elements: { point: { radius: 0 } },
        animation: false
      }
    });
  }



  render () {
    return (
      <div id="bid-depth-chart-container">
      </div> 
    )
  }

}

export default BidDepthChart;