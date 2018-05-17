import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import NebPay from 'nebpay';
import Neb from 'nebulas';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import utf8 from 'utf8';

// 1)
// input range does not handle floating point numbers in the display well
// so we let react-input-range use integers,
// but display on the UI the floating point number
// by using formatLabel
import InputRange from 'react-input-range';
import { BigNumber } from 'bignumber.js';

import 'react-input-range/lib/css/index.css';

const RollzWrapper = styled.div`
`;

const PaperStyled = styled(Paper)`
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const Heading = styled.p`
  margin: 0rem 1rem;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SubHeading = styled.p`
  margin: 0;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const BetAmountStyled = styled.div`
  margin: 3rem 0;
  margin-left: 1rem;
  margin-top: 2rem;
`;

const WinPercentageStyled = styled.div`
  margin: 3rem 0;
  margin-left: 1rem;
`;

const YourOddsStyled = styled.div`
  margin-left: 1rem;
`;

const InputRangeStyled = styled.div`
  margin: 2rem 1rem;
`;

const ResultsStyled = styled.div`
  margin: 1rem 1rem;
  font-size: 1.4rem;
`;

const smartContract = "n22oTEArMVWCfJgDcX3ktyDU6P9xGT4mvL1";
const testnetAddress = "https://testnet.nebulas.io";
// expected values
// Roll under 49
// with a wager of 5 eth
// for a profit of +5.20625000000000 eth
// but my profit is BigNumber { s: 1, e: 0, c: [ 5, 20625000000000 ] }
const calculateProfit = (rollUnder, bet) => {
  // BigNumber.config({ DECIMAL_PLACES: 15, ROUNDING_MODE: 4 })
  rollUnder = new BigNumber(rollUnder);
  bet = new BigNumber(bet);
  const houseEdge = new BigNumber(980);
  const houseEdgeDivisor = new BigNumber(1000);
  // 2)
  // divide by 10 because the slider actual values are x10
  // see comment 1) above

  //kevin: no more divide by 10, removed bet slider
  const profit = new BigNumber(((((100 - rollUnder) / (rollUnder - 1)) * bet * (houseEdge / houseEdgeDivisor)).toPrecision(15)));
  return profit.toString();
};

const nebPay = new NebPay();

const neb = new Neb.Neb();
neb.setRequest(new Neb.HttpRequest(testnetAddress));

let timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = `${month} ${date} ${year} ${hour}:${min}:${sec}`;
  return time;
};

class Rollz extends Component {
  state = {
    minBet: 0.01,
    maxBet: 10.0,
    betError: false,
    betValue: 0.01,
    winValue: 50,
  };
  changeRollResults = this.props.changeRollResults.bind(this);

  displayRollResults = () => {
    let elements = [];
    if (this.props.rollResults.error != null) {
      var errorMessage = `Error: ${this.props.rollResults.error}`
    }
    elements.push(errorMessage);
    if (this.props.rollResults.isWinner != null) {
      var outcomeMessage = (this.props.rollResults.isWinner === true ? `Outcome: You won ${this.props.rollResults.profit} NAS! 😉` : "Outcome: You lost 😢");
    } else {
      outcomeMessage = "Outcome: ";
    }
    elements.push(outcomeMessage);
    if (this.props.rollResults.dieRoll != null) {
      var rollMessage = "You rolled: " + this.props.rollResults.dieRoll;
    } else {
      rollMessage = "You rolled: ";
    }
    elements.push(rollMessage);
    if (this.props.rollResults.timestamp != null) {
      var timeStampMessage = "Roll time: " + timeConverter(this.props.rollResults.timestamp);
    } else {
      timeStampMessage = "Roll time: ";
    }
    elements.push(timeStampMessage);
    return (
      <div>
        {elements.map((element, index) => {
          return (
            <ResultsStyled key={index}>{element}</ResultsStyled>
          )})
        }
      </div>
    );
  };

  handleBetChange = name => event => {
    if ((parseFloat(event.target.value) < this.state.minBet) || (parseFloat(event.target.value) > this.state.maxBet)) {
      this.setState({
        betError: true,
        betValue: event.target.value
      })
    } else {
      this.setState({
        betValue: event.target.value,
        betError: false
      });
    }
  };

  onClickNasRoll = () => {
    let bet = this.state.betValue;
    let callFunction = "nasRoll";
    let callArgs = "[\"" + String(this.state.winValue + 1) + "\"]";
    nebPay.call(smartContract, bet, callFunction, callArgs, {
      listener: this.nasRollCallBack
    });
  };

  onClickSimulateNasRoll = () => {
    let bet = this.state.betValue;
    let callFunction = "nasRoll";
    let callArgs = "[\"" + String(this.state.winValue + 1) + "\"]";
    nebPay.simulateCall(smartContract, bet, callFunction, callArgs, {
      listener: this.simulateNasRollCallBack
    });
  };

  simulateNasRollCallBack = (res) => {
    console.log("simulate callback res: " + JSON.stringify(res));
    console.log(res);
    try {
      var simulateResults = JSON.parse(res.result);
    } catch(err) {
      let updatedRollResults = Object.assign({}, this.props.rollResults);
      updatedRollResults["error"] = res.execute_err;
      console.log(updatedRollResults);
      this.changeRollResults(updatedRollResults);
      return
    }

    this.changeRollResults(simulateResults);
    console.log(this.props.rollResults);


  };

  nasRollCallBack = (res) => {
    console.log("callback res: " + JSON.stringify(res));
    let txHash = res.txhash;
    let funcIntervalQuery = () => {
      neb.api.getTransactionReceipt({hash: txHash})
        .then(function(receipt) {
          console.log("Waiting to complete transaction...");
          if (receipt.status === 1) {
            console.log("final result: ", receipt);
            let rollResults = JSON.parse(receipt.execute_result);
            this.changeRollResults(rollResults);
            clearInterval(intervalQuery);
          } else if (receipt.status === 0) {
            console.log("something went wrong", receipt);
            clearInterval(intervalQuery);
          }
        }.bind(this));
    };
    let intervalQuery = setInterval( () => {
      funcIntervalQuery();
    }, 5000);
  };

  onClickBetButtonAmount = (bet) => {
    this.setState({
      betValue: bet
    });
  };

  getMinimumBet = () => {
    let bet = 0;
    let callFunction = "getMinBet";
    let callArgs = "[\"\"]";
    nebPay.simulateCall(smartContract, bet, callFunction, callArgs, {
      listener: this.getMinimumBetCallBack
    });
  };

  getMinimumBetCallBack = (res) => {
    console.log("callback res: " + JSON.stringify(res));
    let minBetResult = res.result;
    console.log(minBetResult);
    this.setState({
      minBet: minBetResult
    })
  };

  render() {
    return (
      <RollzWrapper className="Rollz">
        <PaperStyled>
          <Heading>Place Dice Bets</Heading>

          <BetAmountStyled>
            <TextField
              label="Bet Amount"
              value={this.state.betValue}
              onChange={this.handleBetChange()}
              type="number"
              helperText={"Minimum bet: " + this.getMinimumBet() + " NAS"}
              margin="dense"
              InputProps={{inputProps: {min: 0.01, max: 10, step: 0.1}}}
              error={this.state.betError}/>
            <div>
              <Button
                variant="raised"
                color="primary"
                style={{marginRight: '.5rem'}}
                onClick={() => this.onClickBetButtonAmount(this.state.minBet)}>
                Min
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={() => this.onClickBetButtonAmount(0.5)}
                style={{margin: '.5rem',}}>
                .5 NAS
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={() => this.onClickBetButtonAmount(1.0)}
                style={{margin: '.5rem',}}>
                1.0 NAS
              </Button>
            </div>
          </BetAmountStyled>

          <WinPercentageStyled>
            <SubHeading>Win Percentage: {this.state.winValue} %</SubHeading>
            <InputRangeStyled>
              <InputRange
                maxValue={98}
                minValue={1}
                value={this.state.winValue}
                onChange={winValue => this.setState({ winValue })} />
            </InputRangeStyled>
          </WinPercentageStyled>

          <Heading>Your Odds</Heading>
          <YourOddsStyled>
            <SubHeading>Roll under: {this.state.winValue + 1}</SubHeading>
            <SubHeading>With wager: {this.state.betValue} NAS</SubHeading>
            <SubHeading>
              Profit: {calculateProfit(this.state.winValue + 1, this.state.betValue)} NAS
            </SubHeading>
            <div>
            {this.state.betError === true ? (
              <Button
                variant="raised"
                color="primary"
                disabled>Roll!
              </Button>
            ) : (
              <Button
                variant="raised"
                color="primary"
                onClick={this.onClickNasRoll}
                style={{marginBottom: '1rem',}}>Roll!
              </Button>
            )}
            <Button
              variant="raised"
              color="primary"
              onClick={this.onClickSimulateNasRoll}
              style={{marginBottom: '1rem', marginLeft: '1rem'}}>Simulate Roll
            </Button>
            </div>
          </YourOddsStyled>
          <Heading>Results</Heading>
          {this.displayRollResults()}
        </PaperStyled>
      </RollzWrapper>
    );
  }
}

export default Rollz;