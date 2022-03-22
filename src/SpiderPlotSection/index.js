import React from 'react';
import SpiderChart from "./components/SpiderChart";
import TeamSelector from "./components/TeamSelector";
import PieChart from "./components/PieChart";
import { connect } from "react-redux";
import { addChartValue } from '../Redux';

const SpiderPlotSection = (props) => {

  const SpiderChartValues = {
    name: "England Premier League",
    match: "Arsenal vs Brighton",
    type: "Win Market",
    min: 0,
    max: 10,
    data: [
      {
        name: "Arsenal",
        value: 5
      },
      {
        name: "Draw",
        value: 5
      },
      {
        name: "Brighton",
        value: 5
      }
    ]
  };

  const PieChartData = [
    {
      "name": "Arsenal",
      "value": 120
    },
    {
      "name": "Liverpool",
      "value": 160
    }
  ];

  return (
    <>
      <div>
        <TeamSelector />
        <SpiderChart SpiderChartValues={SpiderChartValues} />
        <PieChart PieChartData={PieChartData} />
      </div>
    </>
  );
};

export default SpiderPlotSection;
