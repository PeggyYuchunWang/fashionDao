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
  const [uploadVoteCount1, setUploadVoteCount1] = useState(0);
  const [uploadVoteCount2, setUploadVoteCount2] = useState(0);
  const [uploadVoteCount3, setUploadVoteCount3] = useState(0);
  const [uploadVoteCount4, setUploadVoteCount4] = useState(0);
  
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
        setUploadVoteCount1(parseInt(totalVotes._hex, 16));

        totalVotes = await wavePortalContract.votes("2");
        console.log("Retrieved total wave count for Sweatshirt 2", totalVotes);
        setUploadVoteCount2(parseInt(totalVotes._hex, 16));

        totalVotes = await wavePortalContract.votes("3");
        console.log("Retrieved total wave count for Sweatshirt 3", totalVotes);
        setUploadVoteCount3(parseInt(totalVotes._hex, 16));

        totalVotes = await wavePortalContract.votes("4");
        console.log("Retrieved total wave count for Sweatshirt 4", totalVotes);
        setUploadVoteCount4(parseInt(totalVotes._hex, 16));
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
      console.log(error);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <Container fluid className="p-3">
        <h1 className="header">FashionDAO</h1>
        <Row>
        <Card style={{ width: '20%' }}>
          <Card.Img variant="top" src="/img/01-Pink-Hoodie_Update.png" />
          <Card.Body>
            <Card.Title>Sweatshirt 1</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <button className="waveButton" onClick={() => vote("1")}>
            Vote
            </button>
            <Card.Text>
              Total votes: {uploadVoteCount1} 
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '20%' }}>
          <Card.Img variant="top" src="/img/images.png" />
          <Card.Body>
            <Card.Title>Sweatshirt 2</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <button className="waveButton" onClick={() => vote("2")}>
            Vote
            </button>
            <Card.Text>
              Total votes: {uploadVoteCount2} 
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '20%' }}>
          <Card.Img variant="top" src="/img/images2.png" />
          <Card.Body>
            <Card.Title>Sweatshirt 3</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <button className="waveButton" onClick={() => vote("3")}>
            Vote
            </button>
            <Card.Text>
              Total votes: {uploadVoteCount3} 
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '20%' }}>
          <Card.Img variant="top" src="/img/Z.png" />
          <Card.Body>
            <Card.Title>Sweatshirt 4</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <button className="waveButton" onClick={() => vote("4")}>
            Vote
            </button>
            <Card.Text>
              Total votes: {uploadVoteCount4} 
            </Card.Text>
          </Card.Body>
        </Card>
        </Row>
        <button className="waveButton" onClick={() => getVote()}>
          Get Total Vote
        </button>
    </Container>
  );
}

export default App
