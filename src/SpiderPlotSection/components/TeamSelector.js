import React, {useState} from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import "./style.css";

const TeamSelector = () => {

  const dispatch = useDispatch();
  const [checkMatch1, setCheckMatch1] = useState(false);
  const [checkMatch2, setCheckMatch2] = useState(false);

  function handleMatch1(e) {
    setCheckMatch1(e.target.checked);
    setCheckMatch2(!e.target.checked);
    axios.get(`https://data.oddsmagnet.com/history/2022/football/england-premier-league/arsenal-v-brighton/win-market.json`)
      .then(res => {
        const data = res.data.data;

        let arsenalData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        let drawData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        let brightonData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        data.map((item, index) => {

          if (item[5] == 'arsenal') {
            arsenalData.sum += item[8];
            arsenalData.len += 1;
          }

          if (item[5] == 'draw') {
            drawData.sum += item[8];
            drawData.len += 1;
          }

          if (item[5] == 'brighton') {
            brightonData.sum += item[8];
            brightonData.len += 1;
          }
        });

        arsenalData.avg = Math.floor(arsenalData.sum / arsenalData.len * 100) / 100;
        drawData.avg = Math.floor(drawData.sum / drawData.len * 100) / 100;
        brightonData.avg = Math.floor(brightonData.sum / brightonData.len * 100) / 100;

        let dispatchData = {
          name: "England Premier League",
          match: "Arsenal vs Brighton",
          type: "Win Market",
          min: 0,
          max: 10,
          data: [
            {
              name: "Arsenal",
              value: arsenalData.avg
            },
            {
              name: "Draw",
              value: drawData.avg
            },
            {
              name: "Brighton",
              value: brightonData.avg
            }
          ]
        };

        dispatch({
          type: 'ADD-DATA',
          payload: dispatchData
        });
      })
  }

  function handleMatch2(e) {
    setCheckMatch1(!e.target.checked);
    setCheckMatch2(e.target.checked);
    axios.get(`https://data.oddsmagnet.com/history/2022/football/england-premier-league/aston-villa-v-tottenham/win-market.json`)
      .then(res => {
        const data = res.data.data;

        let astonData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        let drawData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        let tottenhamData = {
          sum: 0,
          len: 0,
          avg: 0
        };

        data.map((item, index) => {

          if (item[5] == 'aston-villa') {
            astonData.sum += item[8];
            astonData.len += 1;
          }

          if (item[5] == 'draw') {
            drawData.sum += item[8];
            drawData.len += 1;
          }

          if (item[5] == 'tottenham') {
            tottenhamData.sum += item[8];
            tottenhamData.len += 1;
          }
        });

        astonData.avg = Math.floor(astonData.sum / astonData.len * 100) / 100;
        drawData.avg = Math.floor(drawData.sum / drawData.len * 100) / 100;
        tottenhamData.avg = Math.floor(tottenhamData.sum / tottenhamData.len * 100) / 100;

        let dispatchData = {
          name: "England Premier League",
          match: "Aston Villa Vs Tottenham",
          type: "Win Market",
          min: 0,
          max: 10,
          data: [
            {
              name: "Aston Villa",
              value: astonData.avg
            },
            {
              name: "Draw",
              value: drawData.avg
            },
            {
              name: "Tottenham",
              value: tottenhamData.avg
            }
          ]
        };

        dispatch({
          type: 'ADD-DATA',
          payload: dispatchData
        });
      })
  }

  return (
    <div className="floatingManInputModal">
      <div className="container">
        <div className="innerContents">
          <div className="innerSpacing">
            <div className="titleLine"></div>
            <div className="innerBorder">
              <div className="titleSpacing">
                <span className="titleStyling">
                  Select Match
                </span>
              </div>
              <div className="innerBody">
                <span className="innerBodyContent">
                  <form>
                    <input id="arsenalvsbrighton" type="radio" name="teamSelector1" checked={checkMatch1} onChange={handleMatch1} />
                    <label htmlFor="arsenalvsbrighton"> Arsenal vs Brighton</label>
                    <br />
                    <input id="tottenhamvsastonvilla" type="radio" name="teamSelector2" checked={checkMatch2} onChange={handleMatch2} />
                    <label htmlFor="tottenhamvsastonvilla"> Tottenham vs Aston Villa</label>
                    <br />
                  </form>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSelector;
