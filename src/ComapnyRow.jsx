import amazon from "/amazon.svg"
import google from "/google.svg"
import meta from "/public/meta.svg"
import microsoft from "/microsoft.svg"
import netflix from "/netflix.svg"
import uber from "/uber.svg"
import visa from "/visa.svg"
import spgi from "/spgi.svg"
import mastercard from "/mastercard.svg"
import pepsico from "/pepsico.svg"
import constellation from "/constellation.svg"

function CompanyRow(prop) {
  let rowSymbol = prop.symbol;
  let symbol = "";

  for (let leter of rowSymbol) {
    if (leter === "_") {
      break;
    }

    symbol += leter;
  }

  const stockImages = {
    AMZN: amazon,
    GOOGL: google,
    FB: meta,
    MSFT: microsoft,
    NFLX: netflix,
    UBER: uber,
    V: visa,
    MA: mastercard,
    SPGI: spgi,
    CEG: constellation,
    PEP: pepsico
  }

  const symbolIMG = stockImages[symbol];

  return (
    <>
      <div className="row item">
        <div className="rank">1</div>
        <div className="ring" style={{ "--w": prop.weith }}>
          <div className="logo l-goog">
            <img className="logoIMG" src={symbolIMG}/>
          </div>
        </div>
        <div className="name">
          <b>{symbol}</b>
          <small>{prop.companyName}</small>
        </div>
        <div className="value">{prop.holdingValue} RON</div>
        {prop.profitSum > 0 ?

          <div className="gain pos">
            +{prop.profitSum} RON
            <small>▲{prop.profitPercentage}%</small>
          </div>
          :
          <div className="gain pos2">
            {prop.profitSum} RON
            <small>▼{prop.profitPercentage}%</small>
          </div>
        }
        <div className="weight">{prop.weith}%</div>
      </div>
    </>
  );
}

export default CompanyRow