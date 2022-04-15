import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const TargetPartyZone = props => {
    const { province, zone, electionYear, CountryTopoJson } = useContext(MapContext);
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
                if (person.province === province && person.zone_name === zone) {
                    if (!(person.party in byParty)) {
                        byParty[person.party] = [person];
                    } else {
                        byParty[person.party] = [...byParty[person.party], person];
                    }
                }
            });
    });

    let byPartySorted = {};
    for (let [party, winnerResult] of Object.entries(byParty)) {
        const zone_name = winnerResult[0].zone_name
        const score = winnerResult.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.score), 0);
        const full_name = winnerResult[0].title + winnerResult[0].first_name + " " + winnerResult[0].last_name;
        byPartySorted = {
            party,
            score: score.toLocaleString(),
            zone_name,
            full_name,
            candidate: winnerResult.length
        }
    }

    return (
        <div>
            <div className='bar--lower bar--lower__right' style={{height: '9.5rem'}}>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>เขต {byPartySorted && byPartySorted.zone_name}</h1>
                    <h1 className='national-view--text national-view--text--blue'>พรรค{byPartySorted && byPartySorted.party}</h1>
                    <h1 className='national-view--name national-view--text--blue'>{byPartySorted && byPartySorted.full_name} </h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>จำนวนเสียง</h1>
                    <h1 className='national-view--number national-view--text--blue'>{byPartySorted && byPartySorted.score}</h1>
                    <h1 className='national-view--text national-view--text--blue'>คะแนน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>เป้าหมายการเลือกตั้งครั้งนี้</h1>
                    <h1 className='national-view--number national-view--text--blue'>{byPartySorted && byPartySorted.candidate}</h1>
                    <h1 className='national-view--text national-view--text--blue'>คน</h1>
                </div>
            </div>

        </div>
    )
}

export default withRouter(TargetPartyZone);