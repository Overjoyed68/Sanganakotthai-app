import React, { useState } from "react";

import './App.css';
import Nav from './components/Nav';
import MapContext from './map/context';
import useFetch from './map/useFetch';

import Viz from './components/Viz';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MapView from './components/MapView';
import Footer from "./components/MapView/Footer";
import Feedback from './components/Feedback';
import { Redirect } from "react-router-dom";

import { isSupportDevice, isTablet, size } from './components/size'


function App() {
  const [province, setProvince] = useState('ประเทศไทย');
  const [electionYear, setElectionYear] = useState('election-2562');
  const [zone, setZone] = useState('เขต')
  const [CountryTopoJson] = useFetch();

  const [loading, setLoading] = useState(false);

  const initialCountryData = {
    total_chance_of_won: 0,
    total_electoral_district: 0,
    total_goals_member: 0,
    total_goals_points: 0,
    total_member: 0
  };

  const initialProvinceData = {
    total_electoral_district: 0,
    total_member: 0,
    total_chance_of_won: 0,
    total_goals_points: 0,
    total_goals_member: 0
  };

  const initialZoneData = {
    member_name: '',
    province: '',
    electorate: '',
    total_goals_points: 0,
    total_amount: 0,
    total_goals_member: 0
  };

  const [countryData, setCountryData] = useState(initialCountryData);
  const [provinceData, setProvinceData] = useState(initialProvinceData);
  const [zoneData, setZoneData] = useState(initialZoneData);

  const [numberOfVoter, setNumberOfVoter] = useState(0)

  return (
    <div>

      {isSupportDevice() ? (
        <MapContext.Provider
          value={{
            electionYear,
            setElectionYear,
            province,
            setProvince,
            zone,
            setZone,
            CountryTopoJson,
            countryData, 
            setCountryData,
            provinceData,
            setProvinceData,
            zoneData,
            setZoneData,
            loading,
            setLoading,
            numberOfVoter,
            setNumberOfVoter
          }}>
          <BrowserRouter>
            <Nav />
            <Switch>

              <Redirect exact from="/" to="/Sanganakotthai-app" />
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
      ) :
        <div className="unsupport-device-label">
          {window.alert('กรุณาเข้าสู่ระบบด้วยคอมพิวเตอร์หรือแล็ปทอป')}
          กรุณาเข้าสู่ระบบด้วยคอมพิวเตอร์หรือแล็ปทอป
        </div>}
    </div>
  );
}

export default App;
