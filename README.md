# A JavaScript Trading Bot
- Basic beginnings of a trading bot, written in JavaScript, and run using Node.js.
- Only initial very basic strategy present, which uses crossing 5 and 8 period moving averages.  This is contained within app.js.
- I've begun developing the Relative Strength Index indicator, in the rsi.js file.  It is self-contained, and does not need app.js to function.
- Values for the initial strategy are hard-coded in, and the functions are not particularly reuseable currently.
- More strategies are to be added, along with the ability to self-select your preference.
- All price data is self-generated, and not yet pulled from an API.
- Buy/Sell orders are conducted using false values, and are not yet linked to an exchange API as yet either.
- Code is yet to be split across mutiple files, and is only held with 'app.js' currently.

It is the intention of this project to automate cryptoasset trading.

The project is being built purely as a learning tool, to aid in the understanding of JavaScript and its associated parts.

Disclaimer: I will not be held liable for any other individual or organisations use of this code.
