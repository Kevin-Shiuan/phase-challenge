import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles.css';

// recoil
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  rootElement
);
