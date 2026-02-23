import { Outlet } from 'react-router-dom';
import TopBar from 'components/TopBar';
import Container from 'components/Container';

import '../styles/styles.css';

function App() {
  return (
    <div className="wrapper">
      <Container>
        <TopBar />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
