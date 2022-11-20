import Home from './components/Home';
import Layout from './components/Layout';
import Lecturers from './components/Lecturers';
import Courses from './components/Courses';
import Profil from './components/Profil';
import Missing from './components/Missing';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="lecturers" element={<Lecturers />} />
        <Route path="profil" element={<Profil />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;