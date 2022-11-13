import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";


export default function Admin({token, user, role}) {
    let { stad } = useParams();

    return (
        <div className='body'>
        <div className='kit'>
        </div>
        {stad}
        </div>
    );
};
