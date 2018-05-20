import React, { Component } from 'react';
import styled from 'styled-components';

const WebExtensionStatus = styled.div`
  margin: 2rem 2rem 0rem 2rem;
  text-align: center;
`;

const InfoWrapper = styled.div`
  text-align: right;
  margin: 0rem 2rem 0rem 0rem;
`;

const NasPrice = styled.h3`
  text-align: right;
  line-height: 1rem;
`;

const SmartContract = styled.p`
  text-align: right;
  line-height: 1rem;
`;

class InfoBar extends Component {

  state = {
    nasPrice: {
      USD: null,
      CNY: null,
      EUR: null
    },
    smartContractBalance: 0
  };

  componentWillMount() {
    setInterval(() => {
      if (typeof(webExtensionWallet) === "undefined") {
        this.props.changeWebExtension(false);
        /*
        this.setState({
          webExtension: false
        });
        */
      } else {
        /*
        this.setState({
          webExtension: true
        });
        */
        this.props.changeWebExtension(true);
      }
    }, 1000);
  }

  getNasPrice = () => {
    let getRequest = () => {
      let xmlHttp = new XMLHttpRequest();
      let url = "https://api.coinmarketcap.com/v2/ticker/1908/?convert=CNY";
      xmlHttp.onload = () => {
        if (xmlHttp.readyState === 4) {
          if (xmlHttp.status === 200) {
            let response = JSON.parse(xmlHttp.responseText);
            console.log(response);
            let updatedNasPrice = Object.assign({}, this.state.nasPrice);
            console.log(updatedNasPrice);
            this.setState({
              nasPrice: {
                ...this.state.nasPrice,
                USD: response.data.quotes.USD.price,
                CNY: response.data.quotes.CNY.price
              }
            });
            console.log(this.state.nasPrice);
          } else {
            console.error(xmlHttp.statusText);
          }
        }
      };
      xmlHttp.open("GET", url, false);
      xmlHttp.send(null);
    };
    getRequest();
    setInterval(getRequest, 300000);
  };

  getSmartContractBalance = () => {
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
            function: "getBalance",
            args: "[\"\"]"
          }
        })
        .then((res) => {
          let balance = res.result.replace(/["]+/g, '');
          this.setState({
            smartContractBalance: balance
          });
          console.log(this.state.smartContractBalance)
        })
        .catch((err) => {
          console.error(err);
        })
    };
    getRequest();
    setInterval(getRequest, 10000);
  };

  componentDidMount() {
    this.getNasPrice();
    this.getSmartContractBalance();

  }

  displayWebExtensionStatus = () => {
    if (!this.props.webExtension) {
      return (
        <div>
          <a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">
          WebExtensionWallet is not installed. Please install to play NAS Dice properly.
          </a>
        </div>
      )
    }
  };
  render() {
    return (
      <div>
        <WebExtensionStatus>
          {this.displayWebExtensionStatus()}
        </WebExtensionStatus>
        <InfoWrapper>
          <NasPrice>NAS Price {this.state.nasPrice.USD} USD = {this.state.nasPrice.CNY} CNY</NasPrice>
          <SmartContract>
            Smart contract address: <a target="_blank" href={"https://explorer.nebulas.io/#/address/" + this.props.smartContract}>n1ump1QJZS8JRcwXN7tYgMcEizSvwphYQo4</a>
          </SmartContract>
          <SmartContract>
            Current balance: {this.state.smartContractBalance} NAS
          </SmartContract>
        </InfoWrapper>

      </div>

    );
  }
}


export default InfoBar;

