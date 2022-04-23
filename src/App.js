import { Router } from 'react-router-dom'
import routes, { renderRoutes } from "./Routes";
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const history = createBrowserHistory()
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={5}>
        <div className="App">
          <Router history={history}>{renderRoutes(routes)}</Router>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
