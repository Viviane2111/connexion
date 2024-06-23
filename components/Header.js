import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faPaw } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

function Header() {
  // reducer
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // inscription
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  // connexion
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // modale
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIslogin] = useState(true);

  //* INSCRIPTION
  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login(signUpUsername));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };
  //* CONNEXION
  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login(signInUsername));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };

  //* DECONNEXION
  const handleLogout = () => {
    dispatch(logout());
  };
  let logoutBnt;
  if (user.isConnected) {
    logoutBnt = (
      <div>
        <button onClick={() => handleLogout()}>Déconnexion</button>
      </div>
    );
  }

  //* TOGGLE DE LA MODALE
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //* TOGGLE FORMULAIRE
  const toggleForm = () => {
    setIslogin(!isLogin);
  }

  //* CONTENU MODALE
  let modalContent;
  modalContent = (
    <div className="flex border-t justify-center mt-2">
      {isLogin ? (
        <div className=" flex flex-col items-center m-5 ">
          <p className="mb-2">Se connecter</p>
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button
            className="cursor-pointer w-full border rounded-full text-red-800"
            id="connection"
            onClick={() => handleConnection()}
          >
            Connexion
          </button>
          <div className="mt-4">
            <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
              Pas encore inscrits ?
            </span>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center m-5 ">
          <p className="mb-2">S'inscrire</p>
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="E-mail"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button
            className="cursor-pointer w-full border rounded-full text-red-800"
            id="register"
            onClick={() => handleRegister()}
          >
            <span onClick={toggleForm}>Inscription</span>
          </button>
        </div>
      )}
    </div>
  );

  //* ICONES TOGGLE
  let userSection;
  if (isModalVisible) {
    userSection = (
      <FontAwesomeIcon icon={faXmark} onClick={() => showModal()} />
    );
  } else {
    userSection = (
      <div className="flex">
        <div className="mr-5">{logoutBnt}</div>
        <FontAwesomeIcon icon={faUser} onClick={() => showModal()} />
      </div>
    );
  }

  return (
    <div className="max-h-screen">
      <div className="max-h-1/5 h-[44px] flex items-center justify-between mx-10  cursor-pointer">
        <Link href="/modalTrial">
          <FontAwesomeIcon icon={faPaw} />
        </Link>
        {userSection}
      </div>
      <div className="">{isModalVisible && modalContent}</div>
    </div>
  );
}
export default Header;
