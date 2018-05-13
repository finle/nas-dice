import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import InputRange from 'react-input-range';

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

class Rollz extends Component {
  state = {
    betValue: 0,
    winValue: 0,
  };

  render() {
    return (
      <RollzWrapper className="Rollz">
        <PaperStyled>
          <Heading>Choose Your Bet</Heading>

          <BetAmountStyled>
            <SubHeading>Bet Amount: {this.state.betValue}</SubHeading>
            <InputRangeStyled>
              <InputRange
                maxValue={100}
                minValue={0}
                value={this.state.betValue}
                onChange={betValue => this.setState({ betValue })} />
            </InputRangeStyled>
          </BetAmountStyled>

          <WinPercentageStyled>
            <SubHeading>Win Percentage: {this.state.winValue}</SubHeading>
            <InputRangeStyled>
              <InputRange
                maxValue={100}
                minValue={0}
                value={this.state.winValue}
                onChange={winValue => this.setState({ winValue })} />
            </InputRangeStyled>
          </WinPercentageStyled>

          <Heading style={{margin: "3rem 0 2rem 0"}}>Your Odds</Heading>
          <YourOddsStyled>
            <SubHeading>Roll under: {}</SubHeading>
            <SubHeading>with a wager of: {}</SubHeading>
            <SubHeading>for a profit of: {}</SubHeading>
          </YourOddsStyled>

        </PaperStyled>
      </RollzWrapper>
    );
  }
}

export default Rollz;