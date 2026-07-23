import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { consumeInvitationToken } from './invitations/consumeInvitationToken';

const initialInvitationToken = consumeInvitationToken();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App initialInvitationToken={initialInvitationToken} />
  </BrowserRouter>
);
