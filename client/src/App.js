
import './App.css';
import Home from '../src/components/Home/Home';
import RestaurantDetails from '../src/components/RestDetails/RestaurantDetails';
import Filter from '../src/components/RestDetails/Filter';
import{Routes, Route,} from "react-router-dom";
import Login from './components/Common/Login';
import SignUp from './components/Common/SignUp';

function App() {
  return (
<div>
  <Routes>
  <Route path="/details/:rName" element={<RestaurantDetails/>}/>
  <Route path="/filter" element={<Filter/>}/>
  <Route path="/sign-in" element={<Login />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route path="/" element={<Home/>}/>

  </Routes>
 
  </div>
  );
}

export default App;
