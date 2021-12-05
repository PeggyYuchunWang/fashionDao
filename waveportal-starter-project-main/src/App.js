import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const contractAddress = "0xCC474620C7513919f16210F368a7E913C1cB7c64";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi.abi;
  
  const checkIfWalletIsConnected = async () => {
    console.log("check if wallet is connected");
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getVote = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(wavePortalContract);

        let totalVotes = await wavePortalContract.votes("1");
        console.log("Retrieved total wave count for Sweatshirt 1", totalVotes);

        totalVotes = await wavePortalContract.votes("2");
        console.log("Retrieved total wave count for Sweatshirt 2", totalVotes);

        totalVotes = await wavePortalContract.votes("3");
        console.log("Retrieved total wave count for Sweatshirt 3", totalVotes);

        totalVotes = await wavePortalContract.votes("4");
        console.log("Retrieved total wave count for Sweatshirt 4", totalVotes);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const vote = async (number) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(wavePortalContract);

        let count = await wavePortalContract.placeVote(number);
        console.log("placed vote for ", number);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <Container fluid className="p-3">
        <h1 className="header">FashionDAO</h1>
        <Row>
        <Card style={{ width: '22%', margin: "0 auto" }}>
          <Card.Img variant="top" src="/img/1.png" />
          <Card.Body>
            <Card.Title>FashionDAO</Card.Title>
            <Card.Text>
            Midnight-black crewneck. Embroidered logo in "sterling silver."
            
            creator: https://twitter.com/Austinsc2014
            </Card.Text>
            <button className="waveButton" onClick={() => vote("1")}>
            Vote
            </button>
          </Card.Body>
        </Card>
        <Card style={{ width: '22%', margin: "0 auto" }}>
          <Card.Img variant="top" src="/img/2.png" />
          <Card.Body>
            <Card.Title>Midnight in Meta(verse)</Card.Title>
            <Card.Text>
            Midnight-black crewneck. Embroidered logo in "flashlight white." 
            
            creator: https://twitter.com/peggy_wang
            </Card.Text>
            <button className="waveButton" onClick={() => vote("2")}>
            Vote
            </button>
          </Card.Body>
        </Card>
        <Card style={{ width: '22%', margin: "0 auto"}}>
          <Card.Img variant="top" src="/img/3.png" />
          <Card.Body>
            <Card.Title>Crypto Fyres Everywhere</Card.Title>
            <Card.Text>
            Snowflake-white crewneck. Embroidered logo in "youpreme red."
            creator: https://twitter.com/priyamuurali
            </Card.Text>
            <button className="waveButton" onClick={() => vote("3")}>
            Vote
            </button>
          </Card.Body>
        </Card>
        <Card style={{ width: '22%', margin: "0 auto" }}>
          <Card.Img variant="top" src="/img/4.png" />
          <Card.Body>
            <Card.Title>Ayushi in Cryptoland</Card.Title>
            <Card.Text>
              Snowflake-white crewneck. Embroidered logo in "mystical green." 
              
              creator: https://twitter.com/ayushisinhahaha
            </Card.Text>
            <button className="waveButton" onClick={() => vote("4")}>
            Vote
            </button>
          </Card.Body>
        </Card>
        </Row>
        <div class="container">
          <div class="center">
        <button className="waveButton" onClick={() => getVote()}>
          Get Total Vote
        </button>
        </div>
        </div>
    </Container>
  );
}

export default App
