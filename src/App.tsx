import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CertificateStorage from "./components/Sertificates";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <CertificateStorage />
        </div>
    );
}

export default App;
