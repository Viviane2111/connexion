import Link from "next/link";
import {useState} from "react";

const ModalTrial = () => {
   const [isSignIn, setIsSignIn] = useState(true);

   const toggleForm = () => {
     setIsSignIn(!isSignIn);
   };

  return (
    <div>
      <Link href="/">
         <div className="text-center">ModalTrial</div>
      </Link>
      <div className="flex border justify-center">
        {isSignIn ? (
          <div className=" flex flex-col items-center m-5 ">
            <p className="mb-2">Se connecter</p>
            <input
              className="w-full text-center px-36 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
              type="text"
              placeholder="Username"
              id="signInUsername"
            />
            <input
              className="w-full text-center px-36 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
              type="password"
              placeholder="Password"
              id="signInPassword"
            />
            <button
              className="cursor-pointer w-full border rounded-full text-red-800"
              id="connection"
            >
              Connexion
            </button>
            <div className="mt-4">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleForm}
              >
                Pas encore inscrits ?
              </span>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col items-center m-5 ">
            <p className="mb-2"></p>
            <input
              className="w-full text-center px-36 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
              type="text"
              placeholder="Username"
              id="signUpUsername"
            />
            <input
              className="w-full text-center px-36 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
              type="text"
              placeholder="E-mail"
              id="signUpUsername"
            />
            <input
              className="w-full text-center px-36 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
              type="password"
              placeholder="Password"
              id="signUpPassword"
            />
            <button
              className="cursor-pointer w-full border rounded-full text-red-800"
              id="register"
            >
              Inscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalTrial;
