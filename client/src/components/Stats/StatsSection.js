import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const PaperStyled = styled(Paper)`
  padding: 1rem 1rem;
  box-sizing: border-box;
`;

const OneStatWrapper = styled.div`
  text-align: center;
`;

const StatHeader = styled.p`
  font-size: 2rem;
  line-height: 0rem;
  color: lightslategrey;
`;

const StatDescription = styled.p`
  font-size: 1.5rem;
`;

class StatsSection extends Component {
  state = {
    gamesPlayed: 0,
    totalNasWager: 0,
    totalNasWon: 0
  };

  getGamesPlayed = () => {
    let getRequest = () => {
      this.props.nebObject.api
        .call({
          from: this.props.smartContract,
          to: this.props.smartContract,
          value: 0,
          nonce: 1,
          gasPrice: 1000000,
          gasLimit: 2000000,
          contract: {
            function: "getGamesPlayed",
            args: "[\"\"]"
          }
        })
        .then((res) => {
          let gamesPlayed = res.result.replace(/["]+/g, '');
          this.setState({
            gamesPlayed: gamesPlayed
          });
        })
        .catch((err) => {
          console.error(err);
        })
    };
    getRequest();
    setInterval(getRequest, 60000);
  };

  getTotalNasWager = () => {
    let getRequest = () => {
      this.props.nebObject.api
        .call({
          from: this.props.smartContract,
          to: this.props.smartContract,
          value: 0,
          nonce: 1,
          gasPrice: 1000000,
          gasLimit: 2000000,
          contract: {
            function: "getTotalNasWager",
            args: "[\"\"]"
          }
        })
        .then((res) => {
          let totalNasWager = res.result.replace(/["]+/g, '');
          this.setState({
            totalNasWager: totalNasWager
          });
        })
        .catch((err) => {
          console.error(err);
        })
    };
    getRequest();
    setInterval(getRequest, 60000);
  };

  getTotalNasWon = () => {
    let getRequest = () => {
      this.props.nebObject.api
        .call({
          from: this.props.smartContract,
          to: this.props.smartContract,
          value: 0,
          nonce: 1,
          gasPrice: 1000000,
          gasLimit: 2000000,
          contract: {
            function: "getTotalNasWon",
            args: "[\"\"]"
          }
        })
        .then((res) => {
          let totalNasWon = res.result.replace(/["]+/g, '');
          this.setState({
            totalNasWon: totalNasWon
          });
        })
        .catch((err) => {
          console.error(err);
        })
    };
    getRequest();
    setInterval(getRequest, 60000);
  };

  getStats = () => {
    this.getGamesPlayed();
    this.getTotalNasWager();
    this.getTotalNasWon();
  };

  componentWillMount() {
    this.getGamesPlayed();
    this.getTotalNasWager();
    this.getTotalNasWon();
  }

  render() {
    return(
      <div>
        <PaperStyled>
          <div>
            <OneStatWrapper>
              <StatHeader>Total Games Played</StatHeader>
              <StatDescription>{this.state.gamesPlayed}</StatDescription>
            </OneStatWrapper>
            <OneStatWrapper>
              <StatHeader style={{color: "mediumseagreen"}}>Total NAS Wagered</StatHeader>
              <StatDescription>{this.state.totalNasWager}</StatDescription>
            </OneStatWrapper>
            <OneStatWrapper>
              <StatHeader style={{color: "mediumvioletred"}}>Total NAS Won</StatHeader>
              <StatDescription>{this.state.totalNasWon}</StatDescription>
            </OneStatWrapper>
          </div>
        </PaperStyled>
      </div>

    )
  }
}

export default StatsSection;