import { Outlet } from 'react-router-dom';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import { createContext, useContext } from 'react';

import '../styles/styles.css';

const contextTheme = createContext({
  thema: 'light',
  changeTheme: () => {},
});

const { Provider } = contextTheme;

export const useTheme = () => useContext(contextTheme);
function App() {
  return (
    <Provider value={{ thema: 'light', changeTheme: () => {} }}>
      <div className="wrapper">
        <Container>
          <TopBar />
          <Outlet />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
