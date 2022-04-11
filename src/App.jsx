import React, { useState } from "react";

// import './App.css';
import Nav from './components/Nav';
import MapContext from './map/context';
import useFetch from './map/useFetch';

import Viz from './components/Viz';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MapView from './components/MapView';
import Footer from "./components/MapView/Footer";
import Feedback from './components/Feedback';
import { Redirect } from "react-router-dom";


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

            <Redirect exact from="/" to="/2562" />
            <Redirect exact from="/Sanganakotthai-app" to="/2562" />

            <Route exact path="/feedback">
              <Feedback />
            </Route>

            <Route path="/:year?/:province?/:zone?">
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
