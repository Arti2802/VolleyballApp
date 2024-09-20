import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import './styles.css';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { LoginPage } from './pages/LoginPage';
import { Competitions } from './pages/Competitions';
import { Matches } from './pages/Matches';
import { Competition } from './pages/Competition';
import { Match } from './pages/Match';
import { Teams } from './pages/Teams';
import { Team } from './pages/Team';
import { Results } from './pages/Results';
import { Layout } from './pages/Layout';
import { AddCompetition } from './pages/AddCompetition';
import { Ranking } from './pages/Ranking';
import { AddMatch } from './pages/AddMatch';
import { AddTeam } from './pages/AddTeam';
import { EditCompetition } from './pages/EditCompetition';
import { EditTeam } from './pages/EditTeam';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <Routes>
        <Route path='/logowanie' element={<LoginPage/>}/>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<Page404/>}/>
          <Route path='/zawody' element={<Competitions/>}/>
          <Route path='/dodaj-zawody' element={<AddCompetition/>}/>
          <Route path='/edytuj-zawody/:pk' element={<EditCompetition/>}/>
          <Route path='/zawody/:pk' element={<Competition/>}/>
          <Route path='/zawody/:pk/wyniki' element={<Results/>}/>
          <Route path='/mecze' element={<Matches/>}/>
          <Route path='/dodaj-mecz' element={<AddMatch/>}/>
          <Route path='/mecze/:pk' element={<Match/>}/>
          <Route path='/druzyny' element={<Teams/>}/>
          <Route path='/dodaj-druzyne' element={<AddTeam/>}/>
          <Route path='/edytuj-druzyne/:pk' element={<EditTeam/>}/>
          <Route path='/druzyny/:pk' element={<Team/>}/>
          <Route path='/ranking' element={<Ranking/>}/>
        </Route>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
