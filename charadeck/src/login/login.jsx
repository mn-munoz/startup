import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css'

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid login-page'>
      <div className='welcome'>
        <h1>Welcome to CharaDeck</h1>
        <h2>An encyclopedia for your characters.</h2>
      </div>
      <div className='login-panel'>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
