import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { NationalLeft, NationalRight } from './NationalView';
import { ProvincialLeft, ProvincialRight } from './ProvincialView';

import TargetParty from './TargetParty';
import TargetPartyProvincial from './TargetPartyProvincial';
import Party from './Party';
import Footer from './Footer';

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
                    <Route path="/:year?/:province?" exact component={NationalLeft} />
                    <Route path="/:year/:province" component={ProvincialLeft} />
                </div>

                <div className='bar--lower__left'>
                    <label className='chance-label'> โอกาสชนะ xxx/350 </label>
                </div>
            </aside>

            <aside className={`bar bar__left`}>
                <div>
                    {/* <label className='chane-label'>จำนวนผู้มีสิทธิเลือกตั้ง</label> */}
                </div>
            </aside>

            <aside className={`bar bar__right`} style={{ marginLeft: 'auto' }}>
                <div>
                    <Switch>
                        <Route
                            path="/:year?"
                            exact
                            render={() => <TargetParty selectedParty={selectedParty} />}
                        />

                        <Route
                            path="/:year/:province"
                            exact
                            render={() => <TargetPartyProvincial selectedParty={selectedParty} />}
                        />
                    </Switch>
                </div>

                <div className="bar--lower bar--lower__right">
                    <Switch>
                        <Route
                            path="/:year?"
                            exact
                            render={() => <NationalRight toggleShowDetail={toggleMobileDetail} partyChanged={onPartyChanged} />}
                        />
                        <Route
                            path="/:year/:province"
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
