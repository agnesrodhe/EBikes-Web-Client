import React from 'react';

import PieAdminIndex from './components/pieadminindex';

export default function AdminIndex() {
    return (
        <div>
            <div>
                <h1 className='cityname'>Administratör</h1>
                <PieAdminIndex />
            </div>
        </div>
    );
}

