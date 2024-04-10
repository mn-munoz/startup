import React from 'react';
import { Websocket } from './websocket';
import './updates.css'

export function Updates() {
  return (
    <main className='container-fluid'>
      <Websocket/>
    </main>
  );
}