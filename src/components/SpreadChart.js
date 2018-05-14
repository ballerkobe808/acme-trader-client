import React, { Component } from 'react';

import Chart from 'chart.js';
import dateFormat from 'dateformat';


class SpreadChart extends Component {

  constructor(props) {
    super(props);
    // this.state = { data: props.data }
    this.showChart = this.showChart.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {
    this.showChart(this.props.data)
  }
 

  showChart(data) {

    if (data == null) return; // fix this later

    const title = dateFormat(new Date(data[0].time * 1000), "dddd, mmmm dS, yyyy");

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


  render () {
    return (
      <div id="spread-chart-container">
      </div> 
    )
  }

}

export default SpreadChart;