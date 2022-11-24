import Home from './components/Home';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import AddAirport from './components/AddAirport';
import Search from './components/Search';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth/>}>
          <Route path="addAirport" element={<AddAirport />} />
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;