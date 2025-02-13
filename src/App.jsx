import { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import { theme } from './style/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
