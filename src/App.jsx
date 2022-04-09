import React, { useState } from "react";

// import './App.css';
import Nav from './components/Nav';
import MapContext from './map/context';
import useFetch from './map/useFetch';

import Viz from './components/Viz';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import CompareView from './components/CompareView';
import MapView from './components/MapView';
import Footer from "./components/MapView/Footer";


function App() {
  const [province, setProvince] = useState('ประเทศไทย');
  const [electionYear, setElectionYear] = useState('election-2562');
  const [zone, setZone] = useState('เขต')
  const [CountryTopoJson] = useFetch();

  return (
    <div>
      <MapContext.Provider
        value={{
          electionYear,
          setElectionYear,
          province,
          setProvince,
          zone,
          setZone,
          CountryTopoJson
        }}>
        <BrowserRouter>
          <Nav />
          <main>
            <article className="detail-layer">
              <Switch>
                <Route path="/:year?" component={MapView} />
              </Switch>
            </article>
            <Viz />
          </main>
        </BrowserRouter>
      </MapContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
