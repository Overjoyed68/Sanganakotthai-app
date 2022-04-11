import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const TargetPartyZone = props => {
    const { province, electionYear, CountryTopoJson } = useContext(MapContext);
    const [provincialProps, setProvincialProps] = useState([]);

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        const provincialProps = CountryTopoJson.objects[electionYear].geometries
            .filter(geo => geo.properties.province_name === province)
            .map(geo => geo.properties);

        provincialProps.sort((a, b) => a.zone_id - b.zone_id);
        setProvincialProps(provincialProps);
    }, [CountryTopoJson, province, electionYear]);

    let byParty = {};
    provincialProps.forEach(cur => {
        if (!cur.result) {
            byParty['noresult'] = 'No vote';
            return;
        }
        cur.result
            .sort((a, b) => b.score - a.score)
            .slice(0, cur.quota)
            .forEach(person => {
                if (!(person.party in byParty)) {
                    byParty[person.party] = [person];
                } else {
                    byParty[person.party] = [...byParty[person.party], person];
                }
            });
    });

    let byPartySorted = [];
    for (let [party, winnerResult] of Object.entries(byParty)) {
        const score = winnerResult.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.score), 0);
        byPartySorted.push({ party, score, candidate: winnerResult.length });
    }
    byPartySorted.sort((a, b) => b.candidate - a.candidate);

    return (
        <div>
            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text'>เขต</h1>
                    <h1 className='national-view--text'>พรรค{byPartySorted.length > 0 && byPartySorted[0].party}</h1>
                    <h1 className='national-view--number'>{byPartySorted.length > 0 && byPartySorted[0].candidate} </h1>
                    <h1 className='national-view--text'>คน </h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text'>จำนวนเสียง</h1>
                    <h1 className='national-view--number'>{byPartySorted.length > 0 && byPartySorted[0].score}</h1>
                    <h1 className='national-view--text'>คะแนน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text'>เป้าหมาย</h1>
                    <h1 className='national-view--number'>{byPartySorted.length > 0 && byPartySorted[0]["candidate"] + Math.round(byPartySorted[0]["candidate"] * 0.1)}</h1>
                    <h1 className='national-view--text'>คน</h1>
                </div>
            </div>

        </div>
    )
}

export default withRouter(TargetPartyZone);