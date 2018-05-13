import React, { Component } from 'react';
import styled from 'styled-components';

import Header from 'components/Header/Header.js';
import Pages from 'components/Pages/Pages.js';
import Rollz from 'components/Rollz/Rollz.js';

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
  render() {
    return (
      <AppWrapper className="App">

        <Header></Header>

        <Section>
          <SectionPages>
            <Pages></Pages>
          </SectionPages>

          <SectionRollz>
            <Rollz></Rollz>
          </SectionRollz>
        </Section>


      </AppWrapper>
    );
  }
}

export default App;
