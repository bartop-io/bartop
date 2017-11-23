import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
console.log(process.env.REACT_APP_AUTH0_CLIENT_ID);
ReactDOM.render(<App />, document.getElementById('root'));
