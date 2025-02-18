import { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import { theme } from './style/theme';
import AuthProvider from './contexts/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
