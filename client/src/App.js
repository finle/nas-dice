import React, { Component } from 'react';
import styled from 'styled-components';

import Header from 'components/Header/Header.js';
import Pages from 'components/Pages/Pages.js';
import Rollz from 'components/Rollz/Rollz.js';
import InfoBar from 'components/InfoBar/InfoBar.js';

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
  padding: 2rem 1rem 2rem 2rem;
`;

const SectionRollz = styled.div`
  width: 40vw;
  height: 100%;
  padding: 2rem 2rem 2rem 1rem;
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
      }
    };
    this.changeRollResults = this.changeRollResults.bind(this);
  }

  changeRollResults = (rollResults) => {
    this.setState({
      rollResults: rollResults
    })
  };
  render() {
    return (
      <AppWrapper className="App">

        <Header></Header>

        <InfoBar></InfoBar>

        <Section>
          <SectionPages>
            <Pages
              rollResults={this.state.rollResults}
              changeRollResults={this.changeRollResults} />
          </SectionPages>

          <SectionRollz>
            <Rollz
              rollResults={this.state.rollResults}
              changeRollResults={this.changeRollResults} />
          </SectionRollz>
        </Section>


      </AppWrapper>
    );
  }
}

export default App;
