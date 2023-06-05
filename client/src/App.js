import {Home, Landing, Form, Detail} from './Views/index';
import { Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();
  return (   
    <div className='App'>
      {location.pathname !== '/' && <Navbar/>}
      <Route exact path='/' component={Landing}/>
      <Route path='/home' component={Home}/>
      <Route path='/create' component={Form}/>
      <Route path="/detail/:id" component={Detail}/>  
    </div>
    
  );
};

export default App;
