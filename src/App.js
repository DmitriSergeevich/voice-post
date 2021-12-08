import Main from './components/Main/Main';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';
function App() {
  return (
    <ErrorBoundry>
      <Main />
    </ErrorBoundry>  
  );
}

export default App;
