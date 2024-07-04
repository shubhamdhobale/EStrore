import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import EmptyPages from './pages/EmptyPage/EmptyPages';

function App() {

  return (
    <div>
     <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/*' element={<EmptyPages/>}/>
        </Routes>
     </Router>
    </div>
  )
}

export default App
