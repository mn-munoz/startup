import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { About } from './about/about';
import { Updates } from './updates/updates';
import { Deck } from './deck/deck';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
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
                                <NavLink className="nav-link" aria-current="page" to=''>Home</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                            <NavLink className='nav-link' to='deck'>
                                My Deck
                            </NavLink>
                            </li>
                            )}
                            {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                            <NavLink className='nav-link' to='updates'>
                                Updates
                            </NavLink>
                            </li>
                            )}
                            <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="about">About</NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />} exact />
                <Route path='/deck' element={<Deck userName={userName} />} />
                <Route path='/updates' element={<Updates />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-body-tertiary" data-bs-theme="dark">
            <p>By <a href="https://github.com/mn-munoz/startup" target="_blank">Merleth Munoz</a></p>
            </footer>
        </div>
    </BrowserRouter>
  
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}