import dva from 'dva';

const app = dva();
app.model(require('./models/count'));
app.model(require('./models/app'));
app.router(require('./router'));
app.start('#root');
