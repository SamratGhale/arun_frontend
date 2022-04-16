import { Router } from 'react-router-dom'
import routes, { renderRoutes } from "./Routes";
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';

const history = createBrowserHistory()
function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <div className="App">
        <Router history={history}>{renderRoutes(routes)}</Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
