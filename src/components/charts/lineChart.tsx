// src/components/charts/ApexChart.jsx
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import CanvasJSReact from '@canvasjs/react-charts';

import { Panel } from 'rsuite';
import {seriesX} from "@/data/mockSor"
import {anotate} from "@/data/mockAnotation"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const   LineChart = () => {
  
  const options = {
    theme: "light1", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    zoomType: "xy",
    title: {
      text: "OTDR .SOR Viewer"
    },
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: false
      },
      stripLines:[
        {                
            value: 37.636				
        }],
    },
    toolTip:{
      contentFormatter: function (e) {
				let content = " ";
  				for (let i = 0; i < e.entries.length; i++) {
					content += "Distance : " + "<strong>" + e.entries[i].dataPoint.x + " Km</strong>";
					content += "<br/>";
					content += "Loss : " + "<strong>" + e.entries[i].dataPoint.y + " Db</strong>";
				}
				return content;
			},
      showAtX: 37.636
    },
    height: 330,
    data: [{
      type: "line",
      dataPoints: seriesX
    }]
  }
  

  return (
    <Panel>
      <div id="chart">
        <CanvasJSChart options = {options} 
          /* onRef={ref => this.chart = ref} */
        />
      </div>
    </Panel>
  );
};

export default LineChart;
