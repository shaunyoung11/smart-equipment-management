import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from '../../pages/Index';

function GlobalBody() {
  return (
    <Router>
      <Route path="/" exact component={Index}></Route>
    </Router>
  );
}

export default GlobalBody;
