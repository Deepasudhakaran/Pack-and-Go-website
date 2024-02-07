
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRouter from './Routers/AdminRouter';
import UserRouter from './Routers/UserRouter';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/*' element={<UserRouter/>}/>
      <Route path='/admin/*' element={<AdminRouter/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
