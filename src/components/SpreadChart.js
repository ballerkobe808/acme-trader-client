import React, { Component } from 'react';

import Chart from 'chart.js';
import dateFormat from 'dateformat';


export default class SpreadChart extends Component {

  constructor(props) {
    super(props);
    this.showChart = this.showChart.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {
    // if there is data passed, show the chart
    if (this.props.data) {
      this.showChart(this.props.data.spreads)
    }
  }
 

  showChart(data) {
     // chartjs needs to be destroyed before a new one is added
    // since we dont have access to the actual object, this is the best way to
    // clear the canvas
    document.getElementById("spread-chart-container").innerHTML = '&nbsp;';
    document.getElementById("spread-chart-container").innerHTML = '<canvas id="spread-chart"></canvas>';
    
    // if (data == null) return; // fix this later

    // setup the arrays of data used in the chart
    const times = data.map( spread => { 
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(spread.time*1000);
      return dateFormat(date, "h:MM TT");
    })
    const bids = data.map( spread => { return spread.bid})
    const asks = data.map( spread => { return spread.ask})

    new Chart(document.getElementById("spread-chart"), {
      type: 'line',
      data: {
        labels: times,
        datasets: [{ 
          data: asks,
          label: "Asks",
          borderColor: "#007bff",
          fill: false
        }, 
          { 
            data: bids,
            label: "Bids",
            borderColor: "orange",
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
    // display the date of the timestamps of the data on the bottom
    let dateTime = '';
    if (this.props.data && this.props.data[0] && this.props.data[0].time) {
      dateTime = dateFormat(new Date(this.props.data[0].time * 1000), "dddd, mmmm dS, yyyy");
    }
    
    return (
      <div>
        <div id="spread-chart-container">
        </div> 
        <div style={{textAlign: 'center', color: '777', fontSize: '0.8em', paddingBottom: '10px'}}>
          {dateTime}
        </div>
      </div>
    )
  }

}
