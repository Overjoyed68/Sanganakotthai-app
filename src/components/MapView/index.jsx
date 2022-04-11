import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { NationalLeft, NationalRight } from './NationalView';
import { ProvincialLeft, ProvincialRight } from './ProvincialView';

import TargetParty from './TargetParty';
import TargetPartyProvincial from './TargetPartyProvincial';
import Party from './Party';
import TargetPartyZone from './TargetPartyZone';

const Contianer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  pointer-events: none;
`;

const MapView = () => {
    const [showMobileDetail, setShowMobileDetail] = useState(false);

    function toggleMobileDetail() {
        setShowMobileDetail(!showMobileDetail);
    }

    const [selectedParty, setSelectedParty] = useState('')

    const onPartyChanged = (party) => {
        setSelectedParty(party);
    }

    return (
        <Contianer>
            <aside className="bar bar__left">
                <div className="bar--lower__left">
                    <Route path="/Sanganakotthai-app/:year?/:province?/:zone?" exact component={NationalLeft} />
                    <Route path="/Sanganakotthai-app/:year/:province?/:zone?" component={ProvincialLeft} />
                </div>
            </aside>

            <aside className='bar bar__left'>
                <div className='label-box'>
                    <h1 className='voter-label'> จำนวนผู้มีสิทธิเลือกตั้ง xxxxxxx คน</h1>
                    <h1 className='chance-label'> โอกาสชนะ xxx/350 </h1>
                </div>
            </aside>

            <aside className='bar bar__right' style={{ marginLeft: 'auto' }}>
                <div>
                    <Switch>
                        <Route
                            path="/Sanganakotthai-app/:year?"
                            exact
                            render={() => <TargetParty selectedParty={selectedParty} />}
                        />

                        <Route
                            path="/Sanganakotthai-app/:year/:province?"
                            exact
                            render={() => <TargetPartyProvincial selectedParty={selectedParty} />}
                        />

                        <Route
                            path="/Sanganakotthai-app/:year/:province/:zone"
                            exact
                            render={() => <TargetPartyZone selectedParty={selectedParty} />}
                        />
                    </Switch>
                </div>

                <div className="bar--lower bar--lower__right">
                    <Switch>
                        <Route
                            path="/Sanganakotthai-app/:year?"
                            exact
                            render={() => <NationalRight toggleShowDetail={toggleMobileDetail} partyChanged={onPartyChanged} />}
                        />
                        <Route
                            path="/Sanganakotthai-app/:year/:province"
                            render={() => <ProvincialRight toggleShowDetail={toggleMobileDetail} partyChanged={onPartyChanged} />}
                        />
                    </Switch>
                </div>
            </aside>

            <aside className={`bar bar__right`}>
                <div>
                    <Party selectedParty={selectedParty} />
                </div>
            </aside>
        </Contianer>
    );
};

export default MapView;
