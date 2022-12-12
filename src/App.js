import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import User from "./components/User";
import { isEmpty } from "./components/Utils";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import logoNN from "../src/assets/logoNN.svg";

const App = () => {
  const posts = useSelector((state) => state.postReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  if (localStorage.getItem("firstTimeHere") === null) {
    localStorage.setItem("firstTimeHere", false);
    setShow(true);
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          Tout ce que vous écrivez ici sera stocké localement sur votre périphérique.<br/>
          <strong> Personne d'autre ne pourra le voir. </strong><br/><br/>
					Il n'y a pour l'instant pas de mécanisme ou sécurité si le localStorage est plein. <br/><br/>
        </Modal.Body>
					<a style={{marginLeft: "15px"}} href="https://github.com/nnieddu/CRUD-localStorage-exemple/"><strong>Code source</strong></a><br/>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand style={{ marginLeft: "20px" }}>
            <img alt="pp" src={logoNN} width="50" height="50" />
          </Navbar.Brand>
          <h1>CRUD</h1>
          <User />
        </Container>
      </Navbar>
      <div className="body">
        <PostForm />
        <div className="content">
          <div className="post-container">
            {!isEmpty(posts) &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
