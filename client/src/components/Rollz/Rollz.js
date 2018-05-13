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

const Heading = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SubHeading = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const BetAmountStyled = styled.div`
  margin: 2rem 0;
`;

const WinPercentageStyled = styled.div`
  margin: 2rem 0;
`;

const YourOddsStyled = styled.div`
  margin: 2rem 0;
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

          <YourOddsStyled>
            <Heading style={{ margin: "4rem 0 2rem 0" }}>Your Odds</Heading>
            <SubHeading>Roll under: {}</SubHeading>
            <p>with a wager of: {}</p>
            <p>for a profit of: {}</p>
          </YourOddsStyled>

        </PaperStyled>
      </RollzWrapper>
    );
  }
}

export default Rollz;