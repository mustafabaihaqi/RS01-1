import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-navbar">
        <div>
          rumahsakit
          <div className="App-navbar-menu">
            <button>
              home 
            </button>
            <button>
              daftar pasien
            </button>
          </div>
        </div>
        <Img src={logo} alt='rs01' className='logo'></Img>
          
        
      </header>
    </div>
  );
}

export default App;
