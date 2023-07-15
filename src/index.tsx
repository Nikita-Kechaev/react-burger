import { createRoot } from 'react-dom/client';
import "./index.css";
import { App } from './components/App/App';
import { Provider } from "react-redux";
import React from 'react';
import { store } from './utils/store';


const container: any = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);