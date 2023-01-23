import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrapperApp } from './App';
import './index.css';

if (process.env.NODE_ENV === 'develop') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrapperApp />
  </React.StrictMode>
);
