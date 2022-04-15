import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

const Party = props => {
    const { setProvince, CountryTopoJson, electionYear, zone } = useContext(MapContext);
    const [nationalProps, setNationalProps] = useState([]);

    useEffect(() => {
        setProvince('ประเทศไทย');
    }, []);

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

    let sumCandidate = 0;
    byPartySorted.forEach((data) => { return sumCandidate += data.candidate })

    return (
        <div>
            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text national-view--text'>400 เขต 400 คน</h1>
                    <h1 className='national-view--text'>พรรคสร้างอนาคตไทย</h1>
                    <h1 className='national-view--number'>{selectedParty ? selectedParty.candidate + Math.round(selectedParty.candidate * 0.1) : (byPartySorted.length > 0 && byPartySorted[0].candidate + Math.round(byPartySorted[0].candidate * 0.1))}</h1>
                    <h1 className='national-view--text'>(โอกาส) คน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>จำนวนเสียง</h1>
                    <h1 className='national-view--number'>{(selectedParty ? selectedParty.score + Math.round(selectedParty.score * 0.1) : (byPartySorted.length > 0 && byPartySorted[0].score + Math.round(byPartySorted[0].score * 0.1))).toLocaleString()}</h1>
                    <h1 className='national-view--text'>(เป้าหมาย) คะแนน</h1>
                </div>
            </div>

            <div className='bar--lower bar--lower__right'>
                <div className='national-view national-view--green-bg'>
                    <h1 className='national-view--text'>จำนวนที่ได้</h1>
                    {/* <h1 className='national-view--number'>{selectedParty ? selectedParty.candidate - Math.round(selectedParty.candidate * 0.1) : (byPartySorted.length > 0 && sumCandidate)}</h1> */}
                    <h1 className='national-view--number'>400</h1>
                    <h1 className='national-view--text'>เป้าหมาย (คน)</h1>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Party);