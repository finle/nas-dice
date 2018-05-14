import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

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
  margin: 0;
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
  const profit = new BigNumber(((((100 - rollUnder) / (rollUnder - 1)) * bet * (houseEdge / houseEdgeDivisor)).toPrecision(15)) / 10);
  return profit.toString();
};

class Rollz extends Component {
  state = {
    betValue: 1,
    winValue: 1,
  };

  render() {
    return (
      <RollzWrapper className="Rollz">
        <PaperStyled>
          <Heading>Choose Your Bet</Heading>

          <BetAmountStyled>
            <SubHeading>Bet Amount: {this.state.betValue / 10}</SubHeading>
            <InputRangeStyled>
              <InputRange
                formatLabel={value => `${value / 10} NAS`}
                step={1}
                maxValue={10}
                minValue={1}
                value={this.state.betValue}
                onChange={(betValue) => {
                  this.setState({ betValue });
                  console.log("betValue is", this.state.betValue / 10);
                }} />
            </InputRangeStyled>
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
            <SubHeading>with a wager of: {this.state.betValue / 10}</SubHeading>
            <SubHeading>
              for a profit of: {calculateProfit(this.state.winValue + 1, this.state.betValue)}
            </SubHeading>
          </YourOddsStyled>

        </PaperStyled>
      </RollzWrapper>
    );
  }
}

export default Rollz;