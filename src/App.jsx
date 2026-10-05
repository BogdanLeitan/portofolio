import './App.css'
import CompanyRow from "./ComapnyRow.jsx"
import { useEffect, useState } from 'react';
import { portofolioApi } from './portofolioApi.js';

function App() {
  const [portData, setPortData] = useState([]);
  let portofolioValue = 0;
  let netInvested = 0;

  useEffect(() => {
    portofolioApi().then(data => {
      setPortData(data);
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

  portData.forEach(data => {
    portofolioValue += data.walletImpact.currentValue;
    netInvested += data.walletImpact.totalCost;
  });

  let sortedJson = [...portData].sort((a, b) => b.walletImpact.currentValue - a.walletImpact.currentValue);

  let companies = [];
  let value = [];

  sortedJson.forEach(data => {
    companies.push(data.instrument.name);
    value.push(((data.walletImpact.currentValue / portofolioValue) * 100).toFixed(2))
  });
  return (
    <>
      <input
        type="checkbox"
        id="theme"
        className="sr"
        aria-label="Dark mode"
      />

      <main className="card">
        <section className="head">
          <div className="top">
            <div>
              <div className="eyebrow">Gwoth Portofolio</div>
              <h1>Bogdan Portofolio</h1>
              <p className="sub">
                Lifetime performance across both portfolios
              </p>
            </div>

            <div className="tools">
              <label
                className="switch"
                htmlFor="theme"
                title="Light / Dark"
              >
                <span className="knob"></span>
              </label>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="label">PORTFOLIO VALUE</div>
              <div className="num">{portofolioValue.toFixed(2)} RON</div>
            </div>

            <div className="stat">
              <div className="label">TOTAL GAIN</div>
              <div className="num pos">+{(portofolioValue - netInvested).toFixed(2)} RON</div>
            </div>

            <div className="stat">
              <div className="label">DIVIDENDS EARNED</div>
              <div className="num pos">3.20 RON</div>
            </div>
          </div>
        </section>

        <div className="row th">
          <div className="span2">
            HOLDINGS <span className="count">11</span>
          </div>

          <div className="r" style={{ paddingRight: "8px" }}>
            VALUE
          </div>

          <div className="r">TOTAL GAIN / MWR</div>
          <div className="r">WEIGHT</div>
        </div>

        {sortedJson.map(data => {
          return (
            <>
              <CompanyRow companyName={data.instrument.name}
                symbol={data.instrument.ticker}
                shares={data.quantity.toFixed(3)}
                holdingValue={data.walletImpact.currentValue}
                invested={data.walletImpact.totalCost}
                averagePrice={data.averagePricePaid.toFixed(2)}
                profitSum={data.walletImpact.unrealizedProfitLoss}
                weith={((data.walletImpact.currentValue / portofolioValue) * 100).toFixed(2)}
                profitPercentage={((data.walletImpact.unrealizedProfitLoss / data.walletImpact.totalCost) * 100).toFixed(2)}
              />
            </>
          )
        })}
      </main>
    </>
  )
}

export default App
