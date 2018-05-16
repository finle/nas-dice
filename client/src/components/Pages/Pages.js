import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

const PagesWrapper = styled.div`

`;

const PaperStyled = styled(Paper)`
  padding: 2rem 1rem;
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
          {value === 0 && <Heading>About NAS Dice</Heading>}
          {value === 1 && <Heading>How to Play</Heading>}

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // centered
          >
            <Tab label="About NAS Dice" />
            <Tab label="How to Play" />
          </Tabs>

          {value === 0 && <TabContainer>About NAS Dice</TabContainer>}
          {value === 1 && <TabContainer>How to Play</TabContainer>}

        </PaperStyled>

      </PagesWrapper>
    );
  }
}

export default Pages;