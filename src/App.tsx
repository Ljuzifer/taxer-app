// import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CertificateStorage } from "./components/CertificateStorage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <CertificateStorage />

            <Toaster position="top-right" reverseOrder={true} />
        </div>
    );
}

export default App;
