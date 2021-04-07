import { HashRouter as Router, Route } from 'react-router-dom';

import Index from '../pages/index/index';
import Login from '../pages/login';

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Index}></Route>
      <Route path="/login" component={Login}></Route>
    </Router>
  );
}

export default AppRouter;
