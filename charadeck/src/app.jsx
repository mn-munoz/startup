import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className='body bg-dark text-light'>
    <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a href="" className="navbar-brand">CharaDeck</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="index.html">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="deck.html">My Deck</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="updates.html">Updates</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">About</a>
                      </li>
                    </ul>
                  </div>
            </div>
        </nav>
    </header>

    <main>App components go here</main>

    <footer className="bg-body-tertiary" data-bs-theme="dark">
      <p>By <a href="https://github.com/mn-munoz/startup" target="_blank">Merleth Munoz</a></p>
    </footer>
  </div>
  );
}