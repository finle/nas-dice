import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const InfoBarStyled = styled.div`
  margin: 1rem 2rem;
  text-align: center;
`;
class InfoBar extends Component {

  render() {
    return (
      <div>
        <InfoBarStyled>
          Hello there
        </InfoBarStyled>
      </div>

    );
  }
}


export default InfoBar;

