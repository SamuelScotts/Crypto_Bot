let result = [];
let rs = 0;
let rsi = 0;
let prevSumGain = 0;
let prevSumLoss = 0;
let currSumGain = 0;
let currSumLoss = 0;

// ADD 13 NUMBERS TO RESULT INITIALLY
result[0] = parseInt((Math.random() * (101 - 0) + 0))
for (i=0;i<13;i++){
  marketMarker();
}

// RUNS EVERY SECOND:
setInterval(function main() {
    marketMarker();
    console.log(result);
    if (rsi == 0){
      initialAvgGainLoss();
    } else {
      currentAvgGainLoss();
    }
    calculateRSI();
    console.log(`The RSI is: ${rsi}`);
  }, 2000);

  // GENERATE RANDOM PRICES
  function marketMarker(){
      let min = 0;
      let max = 101;
      let num = parseInt((Math.random() * (max - min) + min));
      result.unshift(num);
      if (result.length > 14){result.pop()};
  }

function initialAvgGainLoss(){
  let diff = [];
  let loss = [];
  let gain = [];
  for (i=0; i<13; i++){
    diff = result[i] - result[i+1];
     if (diff < 0){
      loss.push(Math.abs(diff));
    } else {
      gain.push(diff);
    }
  }
  for(j=0,len1 = gain.length; j < len1; j++){
    prevSumGain += gain[j];
    prevSumGain /= 14;
  }
  for(k=0,len2 = loss.length; k < len2; k++){
    prevSumLoss += loss[k];
    prevSumLoss /= 14;
  }
  rs = prevSumGain / prevSumLoss;
}

function currentAvgGainLoss(){
  let diff = result[0] - result[1];
  if (diff < 0){
    currSumLoss = Math.abs(diff);
  } else {
    currSumGain = diff;
  }
  avgGain = (prevSumGain * 13 + currSumGain)/14;
  avgLoss = (prevSumLoss * 13 + currSumLoss)/14;
  rs = avgGain / avgLoss;
  prevSumGain = avgGain;
  prevSumLoss = avgLoss;
}

function calculateRSI(){
  rsi = 100 - (100/(1+rs));
  rsi = rsi.toFixed(2);
}