import React from 'react';
import dva from 'dva';
import App from './routes/App';

const app = dva();
app.router(_ => <App />);
app.start('#root');
