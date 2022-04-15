import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const TargetPartyProvincial = props => {
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
    const numZone = provincialProps.length;
    const numCandidate = provincialProps.reduce((acc, cur) => {
        return acc + cur.quota;
    }, 0);
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
    let selectedParty = byPartySorted.find(x => x.party === props.selectedParty)

    return (
        <div>
            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>{numZone} เขต {numCandidate} คน </h1>
                    <h1 className='national-view--text national-view--text--blue'>พรรค{selectedParty ? selectedParty.party : (byPartySorted.length > 0 && byPartySorted[0].party)}</h1>
                    <h1 className='national-view--number national-view--text--blue'>{selectedParty ? selectedParty.candidate : (byPartySorted.length > 0 && byPartySorted[0].candidate)} </h1>
                    <h1 className='national-view--text national-view--text--blue'>คน </h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>จำนวนเสียง</h1>
                    <h1 className='national-view--number national-view--text--blue'>{(selectedParty ? selectedParty.score : (byPartySorted.length > 0 && byPartySorted[0].score)).toLocaleString()}</h1>
                    <h1 className='national-view--text national-view--text--blue'>คะแนน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view'>
                    <h1 className='national-view--text national-view--text--blue'>จำนวนที่ได้</h1>
                    <h1 className='national-view--number national-view--text--blue'>{selectedParty ? selectedParty.candidate + Math.round(selectedParty.candidate * 0.1) : (byPartySorted.length > 0 && byPartySorted[0]["candidate"] + Math.round(byPartySorted[0]["candidate"] * 0.1))}</h1>
                    <h1 className='national-view--text national-view--text--blue'>คน</h1>
                </div>
            </div>

        </div>
    )
}

export default withRouter(TargetPartyProvincial);