import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

const PagesWrapper = styled.div`

`;

const PaperStyled = styled(Paper)`
  padding: 2rem 1rem 3rem 1rem;
  box-sizing: border-box;
`;

const Heading = styled.div`
  margin: 0rem 1rem;
  font-size: 2rem;
  padding-bottom 1.5rem;
`;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: "1rem 1rem" }}>
      {props.children}
    </Typography>
  );
}

class Pages extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <PagesWrapper className="Pages">
        <PaperStyled>
          {/* <Heading></Heading> */}
          {value === 0 && <Heading>How To Play</Heading>}
          {value === 1 && <Heading>About NAS Dice</Heading>}

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // centered
          >
            <Tab label="How To Play" />
            <Tab label="About NAS Dice" />
          </Tabs>

          {value === 1 && <TabContainer>
            <li>This game was created as part of the Nebulas Incentive program. <a target="_blank" href="https://incentive.nebulas.io/signup.html?invite=PQe3y">Participate today and get 100 NAS free!</a></li>
            <li>NAS Dice is a betting game where you roll under a certain number from 2 to 99.</li>
            <li>Your NAS rewards significantly increase as you decrease your win percentage.</li>
          </TabContainer>}
          {value === 0 && <TabContainer>
            <li>Follow instructions and install the NAS Web Wallet at this <a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">link</a>. You can create a wallet in the Chrome extension.</li>
            <li>Game is currently only supported in Google Chrome.</li>
            <li>Make sure to have NAS in your wallet. You can get some small amounts at this <a href="http://www.givemenas.com/home.html" target="_blank">faucet</a> or buy at <a href="https://coinmarketcap.com/currencies/nebulas-token/#markets" target="_blank">exchanges</a></li>

          </TabContainer>}

        </PaperStyled>

      </PagesWrapper>
    );
  }
}

export default Pages;