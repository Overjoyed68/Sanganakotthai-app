import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const PartyProvincial = props => {
    const { province, CountryTopoJson, electionYear, provinceData } = useContext(MapContext);
    const [nationalProps, setNationalProps] = useState([]);

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        const nationalProps = CountryTopoJson.objects[electionYear].geometries.map(
            geo => geo.properties
        );
        setNationalProps(nationalProps);
    }, [CountryTopoJson, electionYear]);

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
                if (person.province === province) {
                    if (!(person.party in byParty)) {
                        byParty[person.party] = [person];
                    } else {
                        byParty[person.party] = [...byParty[person.party], person];
                    }
                }
            });
    });

    let byPartySorted = [];
    for (let [party, winnerResult] of Object.entries(byParty)) {
        const score = winnerResult.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.score), 0);
        byPartySorted.push({ party, score, candidate: winnerResult.length });
    }
    byPartySorted.sort((a, b) => b.candidate - a.candidate);
    let sumCandidate = 0;
    byPartySorted.forEach((data) => { return sumCandidate += data.candidate })

    return (
        <div>
            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text national-view--text'>{ provinceData.total_electoral_district } ????????? { provinceData.total_member } ??????</h1>
                    <h1 className='national-view--text'>???????????????????????????????????????????????????</h1>
                    <h1 className='national-view--number'>{ provinceData.total_chance_of_won }</h1>
                    <h1 className='national-view--text'>(???????????????) ??????</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>??????????????????????????????</h1>
                    <h1 className='national-view--number'>{ provinceData.total_goals_points }</h1>
                    <h1 className='national-view--text'>(????????????????????????) ???????????????</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>?????????????????????????????????</h1>
                    <h1 className='national-view--number'>{ provinceData.total_goals_member }</h1>
                    <h1 className='national-view--text'>(????????????????????????) ??????</h1>
                </div>
            </div>
        </div>
    )
}

export default withRouter(PartyProvincial);