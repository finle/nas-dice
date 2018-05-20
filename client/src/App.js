import React, { Component } from 'react';
import styled from 'styled-components';
import Neb from 'nebulas';

import Header from 'components/Header/Header.js';
import Pages from 'components/Pages/Pages.js';
import Rollz from 'components/Rollz/Rollz.js';
import InfoBar from 'components/InfoBar/InfoBar.js';
import StatsSection from "./components/Stats/StatsSection";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: Roboto;
  font-size: 16px;
`;

const Section = styled.div`
  // height: 100%;
  display: flex;
`;

const SectionPages = styled.div`
  width: 60vw;
  height: 100%;
  padding: 0rem 1rem 2rem 2rem;
`;

const SectionRollz = styled.div`
  width: 40vw;
  height: 100%;
  padding: 0rem 2rem 2rem 1rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollResults: {
        isWinner: null,
        dieRoll: null,
        profit: null,
        timestamp: null,
        error: null
      },
      webExtension: true,
      //testnet
      //smartContract: "n1ump1QJZS8JRcwXN7tYgMcEizSvwphYQo4",
      //mainnet
      smartContract: "n1wmQbKbYvdTHFjNdemyJSbw6C12FCCN6yY",
      //networkURL: "https://testnet.nebulas.io",
      networkURL: "https://mainnet.nebulas.io",
      nebObject: null
    };
    this.changeRollResults = this.changeRollResults.bind(this);
    this.changeWebExtension = this.changeWebExtension.bind(this);
  }

  changeRollResults = (rollResults) => {
    this.setState({
      rollResults: rollResults
    })
  };

  changeWebExtension = (status) => {
    this.setState({
      webExtension: status
    })
  };

  initNebObject = () => {
    let neb = new Neb.Neb();
    neb.setRequest(new Neb.HttpRequest(this.state.networkURL));
    console.log("Setting neb object request to ", this.state.networkURL);
    this.setState({
      nebObject: neb
    })
  };

  componentWillMount() {
    this.initNebObject();

  }
  render() {
    return (
      <AppWrapper className="App">

        <Header></Header>

        <InfoBar
          webExtension={this.state.webExtension}
          changeWebExtension={this.changeWebExtension}
          smartContract={this.state.smartContract}
          networkURL={this.state.networkURL}
          nebObject={this.state.nebObject} />
        <Section>
          <SectionPages>
            <Pages
              rollResults={this.state.rollResults}
              changeRollResults={this.changeRollResults} />
            <StatsSection
              nebObject={this.state.nebObject}
              smartContract={this.state.smartContract} />
          </SectionPages>

          <SectionRollz>
            <Rollz
              rollResults={this.state.rollResults}
              changeRollResults={this.changeRollResults}
              webExtension={this.state.webExtension}
              changeWebExtension={this.changeWebExtension}
              smartContract={this.state.smartContract}
              networkURL={this.state.networkURL} />
          </SectionRollz>
        </Section>


      </AppWrapper>
    );
  }
}

export default App;
