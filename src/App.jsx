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
import Feedback from './components/Feedback';


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
          <Switch>

            <Route exact path="/feedback">
              <Feedback />
            </Route>

            <Route path="/:year?">
              <main>
                <article className="detail-layer">
                  <MapView />
                </article>
                <Viz />
              </main>
              <Footer />
            </Route>


          </Switch>
        </BrowserRouter>
      </MapContext.Provider>


    </div>
  );
}

export default App;
