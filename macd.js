let result = [];
let twelveSMA;
let previousTwelveEMA = 0;
let twelveEMA;
let twentySixSMA;
let previousTwentySixEMA = 0;
let twentySixEMA;
let difference;
let ledger = [];
let accountBalance = 1000;
let inMarket = false;

// ADD 26 RANDOM NUMBERS TO RESULT INITIALLY
result[0] = parseInt((Math.random() * (101 - 0) + 0))
for (let i=0;i<27;i++){
  marketMarker();
}

// RUNS EVERY 1 SECONDS:
setInterval(function main() {
    marketMarker();
    console.log(result);
    calcTwelveSMA();
    calcTwelveEMA();
    calcTwentySixSMA();
    calcTwentySixEMA();
    console.log(`Current 12-day EMA is: ${twelveEMA}`);
    console.log(`Current 26-day EMA is: ${twentySixEMA}`);
    calculateMacd();
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
function calcTwelveSMA(){
    twelveSMA = ((result[0] + result[1] + result[2] + result[3] + result[4])/5).toFixed(2);
};

// CALCULATE 5EMA
function calcTwelveEMA(){
    if (previousTwelveEMA == 0){
        twelveEMA = (((2/(5+1)) * (result[0] - twelveSMA)) + parseFloat(twelveSMA)).toFixed(0);
        previousTwelveEMA = twelveEMA;
    } else {
        twelveEMA = (((2/(5+1)) * (result[0] - previousTwelveEMA)) + parseFloat(previousTwelveEMA)).toFixed(0);
        previousTwelveEMA = twelveEMA;
    }      
};

// CALCULATE 8SMA
function calcTwentySixSMA(){
    twentySixSMA = ((result[0] + result[1] + result[2] + result[3] + result[4] + result[5] + result[6] + result[7])/8).toFixed(2);
};

// CALCULATE 8EMA
function calcTwentySixEMA(){
        if (previousTwentySixEMA == 0){
            twentySixEMA = (((2/(8+1)) * (result[0] - twentySixSMA)) + parseFloat(twentySixSMA)).toFixed(0);
            previousTwentySixEMA = twentySixEMA;
        } else {
            twentySixEMA = (((2/(8+1)) * (result[0] - previousTwentySixEMA)) + parseFloat(previousTwentySixEMA)).toFixed(0);
            previousTwentySixEMA = twentySixEMA;
        }     
};

// COMPARE 5EMA VS 8EMA & BUY OR SELL
function calculateMacd(){
    difference = twelveEMA - twentySixEMA;

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

