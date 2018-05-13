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
  font-size: 2rem;
`;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // centered
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>

          {value === 0 && <TabContainer>Item One</TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}

        </PaperStyled>

      </PagesWrapper>
    );
  }
}

export default Pages;