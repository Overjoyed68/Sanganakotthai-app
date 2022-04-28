import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const PartyProvincial = props => {
    const { province, CountryTopoJson, electionYear, zone, zoneData } = useContext(MapContext);
    const [nationalProps, setNationalProps] = useState([]);

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        const nationalProps = CountryTopoJson.objects[electionYear].geometries.map(
            geo => geo.properties
        );
        setNationalProps(nationalProps);
    }, [CountryTopoJson, electionYear]);

    const numZone = nationalProps.length;
    const numCandidate = nationalProps.reduce((acc, cur) => {
        return acc + cur.quota;
    }, 0);

    let byParty = {};
    nationalProps.map(cur => {
        if (!cur.result) {
            byParty['noresult'] = 'No vote';
            return;
        }
        cur.result
            .sort((a, b) => b.score - a.score)
            .slice(0, cur.quota)
            .map(person => {
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
            score,
            zone_name,
            full_name,
            candidate: winnerResult.length
        }
    }

    return (
        <div>
            <div className='bar--lower bar--lower__right' style={{ height: '9.5rem' }}>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>จังหวัด { zoneData.province } { zoneData.electorate }</h1>
                    <h1 className='national-view--text'>พรรคสร้างอนาคตไทย</h1>
                    <h1 className='national-view--name'>คุณ { zoneData.member_name }</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>จำนวนเสียง</h1>
                    <h1 className='national-view--number'>{ zoneData.total_goals_points }</h1>
                    <h1 className='national-view--text'>(เป้าหมาย) คะแนน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>จำนวนที่ได้</h1>
                    <h1 className='national-view--number'>{ zoneData.total_amount } / { zoneData.total_goals_member }</h1>
                    <h1 className='national-view--text'>(เป้าหมาย) คน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right' onClick={() => props.history.push(`/feedback`)}>
                <button className='feedback-btn'>Feedback ประชาชน</button>
            </div>
        </div>
    )
}

export default withRouter(PartyProvincial);