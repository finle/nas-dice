import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import NebPay from 'nebpay';
import Neb from 'nebulas';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const BetAmountStyled = styled.div`
  margin: 3rem 0;
  margin-left: 1rem;
  margin-top: 2rem;
`;

const BetButtonAmountStyled = styled.div`
  margin: 1rem;
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


class Rollz extends Component {
  state = {
    minBet: 0.01,
    maxBet: 10.0,
    betError: false,
    betValue: 0.01,
    winValue: 50,
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

  onClickCallNasRollDapp = () => {
    let smartContract = "n22oTEArMVWCfJgDcX3ktyDU6P9xGT4mvL1";
    let bet = this.state.betValue;
    let callFunction = "nasRoll";
    let callArgs = "[\"" + String(this.state.winValue + 1) + "\"]";
    let serialNumber = nebPay.call(smartContract, bet, callFunction, callArgs, {
      listener: this.nasRollCallBack
    });
  };

  nasRollCallBack = (res) => {
    console.log("callback res: " + JSON.stringify(res));
    let txHash = res.txhash;
    let neb = new Neb.Neb();
    neb.setRequest(new Neb.HttpRequest("https://testnet.nebulas.io"));
    neb.api.getTransactionReceipt({hash: "561aae39e3830a4947f1be3f51561a0990ad6c2d5653aecd92492575fb760b71"})
      .then(function(receipt) {
        console.log("the response from getTransaction: ",receipt);
    });
  };

  onClickBetButtonAmountMin = () => {
    this.setState({
      betValue: this.state.minBet
    })
  };

  onClickBetButtonAmountHalfNas = () => {
    this.setState({
      betValue: 0.5
    })
  };

  onClickBetButtonAmountOneNas = () => {
    this.setState({
      betValue: 1.0
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
              helperText={"Minimum bet: " + this.state.minBet + " NAS"}
              margin="dense"
              InputProps={{inputProps: {min: 0.01, max: 10, step: 0.1}}}
              error={this.state.betError}/>
            <div>
              <Button
                id="bet-button-min"
                variant="raised"
                color="primary"
                style={{marginRight: '.5rem'}}
                onClick={this.onClickBetButtonAmountMin}>
                Min
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={this.onClickBetButtonAmountHalfNas}
                style={{margin: '.5rem',}}>
                .5 NAS
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={this.onClickBetButtonAmountOneNas}
                style={{margin: '.5rem',}}>
                1.0 NAS
              </Button>
            </div>
          </BetAmountStyled>

          <WinPercentageStyled>
            <SubHeading>Win Percentage: {this.state.winValue}</SubHeading>
            <InputRangeStyled>
              <InputRange
                maxValue={98}
                minValue={1}
                value={this.state.winValue}
                onChange={winValue => this.setState({ winValue })} />
            </InputRangeStyled>
          </WinPercentageStyled>

          <Heading style={{margin: "3rem 0 2rem 0"}}>Your Odds</Heading>
          <YourOddsStyled>
            <SubHeading>Roll under: {this.state.winValue + 1}</SubHeading>
            <SubHeading>with a wager of: {this.state.betValue}</SubHeading>
            <SubHeading>
              for a profit of: {calculateProfit(this.state.winValue + 1, this.state.betValue)}
            </SubHeading>
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
                onClick={this.onClickCallNasRollDapp}>Roll!
              </Button>
            )}
          </YourOddsStyled>

        </PaperStyled>
      </RollzWrapper>
    );
  }
}

export default Rollz;