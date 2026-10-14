import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Home from "./Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '0 20px' }}>
        <Routes>

            <Route path="/" element={<Home/>}/>
          <Route path="/get-all-recipes" element={<RecipeList />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;