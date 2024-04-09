import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';
import './login.css'

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function login(event) {
        loginOrCreate(`/api/auth/login`, event);
    }

    async function create(event) {
        loginOrCreate(`/api/auth/create`, event);
    }

    // function filled() {
    //     const form = document.querySelector('form');
    //     if (!form.checkValidity()) {
    //         form.reportValidity();
    //         return false;
    //     }
    //     return true;
    // }

    async function loginOrCreate(endpoint) {
        // if (!filled()) {
        //     return;
        // }
    
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ user: userName, pswd: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      
        try{
            if (response.ok) {
                localStorage.setItem('userName', userName);
              } else {
                const body = await response.json();
                setDisplayError(`⚠ Error: ${body.msg}`);
            }
        } catch (error) {
            console.error('Login or create request failed:', error);
            setDisplayError('⚠ Error: Something went wrong. Please try again.');
        }
    
    }

    return (
        <>
            <div className="wrapper" id="login-ctrl">
            <form method="get">
                <h2>Login</h2>
                <div className="input-box">
                    <input type="text" id="userName" 
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username" required/>
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="password" id="pswd" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" required/>
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <Button variant='primary btn-light' onClick={() => login()}>
                    Login
                </Button>
                <Button variant='primary btn-light' onClick={() => create()}>
                    Create
                </Button>
            </form>
        </div>

        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );

}