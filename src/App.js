import Auth from './components/Auth';
import './App.css';
import Movies from './components/Movies';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <Auth />
      <Movies />
      <FileUpload />
    </div>
  );
}

export default App;
