import React, { useState, useEffect } from "react";
import crystal from "./crystal.png";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let query;
    if (input == "") {
      query = "What weapon should I be using as a Warrior around level 30?";
    } else {
      query = input;
    }

    setMessages([...messages, "Q: " + query]);

    try {
      // http://159.89.81.211:5000/query
      // https://your-netlify-site.netlify.app/.netlify/functions/proxy
      const response = await fetch(
        "https://ffxi.xyz/.netlify/functions/proxy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }),
        }
      );

      const data = await response.json();
      console.log(data);

      setMessages([...messages, "Q: " + query, "A: " + data.answer]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, "Error sending message."]);
    }

    setInput("");
    setIsLoading(false);
  };
  return (
    <div className="chat__app ffxi-font" id="bg">
      <header>
        <div class="nav-container">
          <MDBContainer>
            <MDBRow>
              <MDBCol className="col-sm-1">
                <a href="/" class="nav-link ffxi-font">
                  Home
                </a>
              </MDBCol>
              <MDBCol className="col-sm-1">
                <a href="/chatbot" class="nav-link ffxi-font">
                  Chatbot
                </a>
              </MDBCol>

              <MDBCol className="col-sm-1"></MDBCol>
              <MDBCol className="col-sm-1"></MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </header>
      <h1 className="App ffxi-font" style={{ paddingTop: "30px" }}>
        <img style={{ maxWidth: "50px" }} src={crystal}></img>FFXI Chatbot
        <img style={{ maxWidth: "50px" }} src={crystal}></img>
      </h1>
      <hr></hr>
      <div className="app__chatContainer">
        {messages.map((message, index) => (
          <p
            className={`app__message ${
              index % 2 === 0 ? "app__message--even" : "app__message--odd"
            }`}
            key={index}
          >
            {index === messages.length - 1 && isLoading
              ? `${message}|`
              : message}
          </p>
        ))}
      </div>

      <form className="app__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any job related question, e.g., What weapon should I be using as a Warrior around level 30?"
          type="text"
        />
        <button onClick={sendMessage} type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
      {isLoading && <div className="app__loading">Loading...</div>}
    </div>
  );
}

export default ChatBot;
