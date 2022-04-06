import React, { useState } from "react";

// import './App.css';
import Nav from './components/Nav';
import MapContext from './map/context';
import useFetch from './map/useFetch';

import Viz from './components/Viz';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import CompareView from './components/CompareView';
import MapView from './components/MapView';


function App() {
  const [province, setProvince] = useState('ประเทศไทย');
  const [electionYear, setElectionYear] = useState('election-2562');
  const [scope, setScope] = useState('ประเทศไทย');
  const [CountryTopoJson] = useFetch();

  return (
    <div>
      <MapContext.Provider
        value={{
          electionYear,
          setElectionYear,
          province,
          setProvince,
          scope,
          setScope,
          CountryTopoJson
        }}
      >

        <BrowserRouter>
          <Nav />
          <main>
            <article className="detail-layer">
              <Switch>
                {/* <Route path="/:year/compare/:province" component={CompareView} /> */}
                {/* <Route path="/:year?" component={MapView} /> */}
                <Route path="/:country?" component={MapView} />
                {/* <Route path="/:year/:scope" /> */}
              </Switch>
            </article>
            <Viz />
          </main>
        </BrowserRouter>


      </MapContext.Provider>
    </div>
  );
}

export default App;
