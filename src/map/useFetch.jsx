import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

const useFetch = () => {
    const [response, setResponse] = useState([[]]);
    useEffect(() => {
        const fetch = async () => {
            const res = await Promise.all([
                d3.json(process.env.PUBLIC_URL + '/data/thailand-election.topo.json'),
                d3.json(process.env.PUBLIC_URL + '/data/zone-quota-2550.json')
            ]);

            // Append "quota" to zones for 2550
            // Other years use 1 for all
            const topoData = res[0];
            const quotaData = res[1];
            _.forEach(topoData.objects, ({ geometries }, year) => {
                geometries.forEach(({ properties }) => {
                    properties.quota = 1;
                });
            });
            setResponse([topoData]);
        };

        fetch();
    }, []);

    return response;
};

export default useFetch;
