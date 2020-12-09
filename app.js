let result = [6,11,8,10,5,14,11,9];
let fiveSMA;
let previousFiveEMA = 0;
let fiveEMA;
let eightSMA;
let previousEightEMA = 0;
let eightEMA;
let difference;
let ledger = [];
let accountBalance = 1;
let inMarket = false;

// RUNS EVERY 1 SECONDS:
setInterval(function main() {
    marketMarker();
    console.log(result);
    calcFiveSMA();
    calcFiveEMA();
    calcEightSMA();
    calcEightEMA();
    console.log(`Current 5-day EMA is: ${fiveEMA}`);
    console.log(`Current 8-day EMA is: ${eightEMA}`);
    compareEMAs();
    console.log(`Difference is: ${difference}`);
    console.log(`In the market: ${inMarket}`);
    console.log(`Account Balance is: ${accountBalance}`);
    console.log(`***********************************************`);
  }, 1000);

  // CREATE FAKE PRICES
  function marketMarker(){
      let min = -10;
      let max = 10;
      let num = parseInt(Math.floor(Math.random() * (max - min + 1) + min));
      let price = result[0] + num;
      if (price < 0){price = 0};
      result.unshift(price);
      if (result.length > 60){result.pop()};
  }
  
// CALCULATE 5SMA
function calcFiveSMA(){
    fiveSMA = ((result[0] + result[1] + result[2] + result[3] + result[4])/5).toFixed(2);
};

// CALCULATE 5EMA
function calcFiveEMA(){
    if (previousFiveEMA == 0){
        fiveEMA = (((2/(5+1)) * (result[0] - fiveSMA)) + parseFloat(fiveSMA)).toFixed(0);
        previousFiveEMA = fiveEMA;
    } else {
        fiveEMA = (((2/(5+1)) * (result[0] - previousFiveEMA)) + parseFloat(previousFiveEMA)).toFixed(0);
        previousFiveEMA = fiveEMA;
    }      
};

// CALCULATE 8SMA
function calcEightSMA(){
    eightSMA = ((result[0] + result[1] + result[2] + result[3] + result[4] + result[5] + result[6] + result[7])/8).toFixed(2);
};

// CALCULATE 8EMA
function calcEightEMA(){
        if (previousEightEMA == 0){
            eightEMA = (((2/(8+1)) * (result[0] - eightSMA)) + parseFloat(eightSMA)).toFixed(0);
            previousEightEMA = eightEMA;
        } else {
            eightEMA = (((2/(8+1)) * (result[0] - previousEightEMA)) + parseFloat(previousEightEMA)).toFixed(0);
            previousEightEMA = eightEMA;
        }     
};

// COMPARE 5EMA VS 8EMA & BUY OR SELL
function compareEMAs(){
    difference = fiveEMA - eightEMA;
    if (accountBalance >= result[0] && inMarket == false && difference < 0){
        console.log("Waiting to get in the market.")
    } else if (accountBalance >= result[0] && inMarket == false && difference >= 0) {
        console.log("Instigating a buy order.")
        buy();
    } else if (inMarket == true && difference >= 0) {
        console.log("You are already in the market.")
    } else if (inMarket == true && difference < 0) {
        console.log("Instigating a sell order.")
        sell();
    }
}

// PERFORM BUY ORDER
function buy(){
    ledger.push({
        "Date/Time": new Date().toLocaleString(),
        "Type": "Buy", 
        "Price": result[0],
    });
    accountBalance -= result[0];
    inMarket = true;
    console.log(`Bought at: ${result[0]}`);
}

// PERFORM SELL ORDER
function sell(){
    ledger.push({
        "Date/Time": new Date().toLocaleString(),
        "Type": "Sell", 
        "Price": result[0],
    });
    accountBalance += result[0];
    inMarket = false;
    console.log(`Sold at: ${result[0]}`);
}

