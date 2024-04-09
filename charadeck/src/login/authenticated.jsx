import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div className="wrapper" id="deck-ctrl">
      <h2 id="username">{props.userName}</h2>
      <Button variant='primary btn-light' onClick={() => navigate('/deck')}>
        Go to Deck
      </Button>
      <Button variant='secondary btn-light' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
