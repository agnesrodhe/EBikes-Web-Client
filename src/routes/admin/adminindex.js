import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import bikesModel from '../../models/bikes.js';
import userModel from '../../models/users.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminIndex() {
    const navigate = useNavigate();
    const [bikesInActiveBlg, setBikesInActiveBlg] = useState("");
    const [bikesErrorBlg, setBikesErrorBlg] = useState("");
    const [bikesActiveBlg, setBikesActiveBlg] = useState("");
    const [bikesInActiveVis, setBikesInActiveVis] = useState("");
    const [bikesErrorVis, setBikesErrorVis] = useState("");
    const [bikesActiveVis, setBikesActiveVis] = useState("");
    const [bikesInActiveLun, setBikesInActiveLun] = useState("");
    const [bikesErrorLun, setBikesErrorLun] = useState("");
    const [bikesActiveLun, setBikesActiveLun] = useState("");
    const [countedCustomers, setCountedCustomers] = useState("");

    useEffect(() => {
        updateandsetbikes()
        clienthandler()
    }, [])

    function clienthandler(){
        userModel.getAllCustomers().then(function(result) {
            let countzerotimes = 0;
            let countonetimes = 0;
            let countmanytimes = 0;
            let countadmin = 0;
            result.forEach((customer) => {
                console.log(customer.role)
                if (customer.role === "admin") {
                    countadmin = countadmin + 1;
                } else if (customer.history.length === 0) {
                    countzerotimes = countzerotimes + 1;
                } else if (customer.history.length === 1) {
                    countonetimes = countonetimes + 1;
                } else if (customer.history.length > 1) {
                    countmanytimes = countmanytimes + 1;
                }
            });
            setCountedCustomers([countzerotimes, countonetimes, countmanytimes, countadmin]);
        })
    }

    function updateandsetbikes(){
        bikesModel.getCityZones().then(function(result){
            result.forEach((place) => {
                if ("Borlänge" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result){
                        const working = [];
                        const notworking = [];
                        if (result === "Only active bikes in this city") {
                            setBikesInActiveBlg(0);
                            setBikesErrorBlg(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike)
                                } else {
                                    notworking.push(bike)
                                }
                            })
                            if (notworking === []) {
                                setBikesErrorBlg(0);
                            } else {
                                setBikesErrorBlg(notworking.length);
                            }
                            if (working === []) {
                                setBikesInActiveBlg(0);
                            } else {
                                setBikesInActiveBlg(working.length);
                            }
                        }
                    })
                    bikesModel.getAllActiveBikes(place._id).then(function(result){
                        if (result === "No active bikes in this city") {
                            setBikesActiveBlg(0);
                        } else {
                            setBikesActiveBlg(result.length);
                        }
                    })
                } else if ("Visby" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result){
                        const working = [];
                        const notworking = [];
                        if (result === "Only active bikes in this city") {
                            setBikesInActiveVis(0);
                            setBikesErrorVis(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike)
                                } else {
                                    notworking.push(bike)
                                }
                            })
                            if (notworking === []) {
                                setBikesErrorVis(0);
                            } else {
                                setBikesErrorVis(notworking.length);
                            }
                            if (working === []) {
                                setBikesInActiveVis(0);
                            } else {
                                setBikesInActiveVis(working.length);
                            }
                        }
                    })
                    bikesModel.getAllActiveBikes(place._id).then(function(result){
                        if (result === "No active bikes in this city") {
                            setBikesActiveVis(0);
                        } else {
                            setBikesActiveVis(result.length);
                        }
                    })
                } else if ("Lund" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result){
                        const working = [];
                        const notworking = [];
                        if (result === "Only active bikes in this city") {
                            setBikesInActiveLun(0);
                            setBikesErrorLun(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike)
                                } else {
                                    notworking.push(bike)
                                }
                            })
                            if (notworking === []) {
                                setBikesErrorLun(0);
                            } else {
                                setBikesErrorLun(notworking.length);
                            }
                            if (working === []) {
                                setBikesInActiveLun(0);
                            } else {
                                setBikesInActiveLun(working.length);
                            }
                        }
                    })
                    bikesModel.getAllActiveBikes(place._id).then(function(result){
                        if (result === "No active bikes in this city") {
                            setBikesActiveLun(0);
                        } else {
                            setBikesActiveLun(result.length);
                        }
                    })
                }
            })
        })
    }

    const dataLun = {
        labels: ['Uthyrda', 'Fungerar inte', 'Parkerade'],
        datasets: [
        {
            label: '# st',
            data: [bikesActiveLun, bikesErrorLun, bikesInActiveLun],
            backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            options: {
                responsive: true
            }
        },
        ],
    };

    const dataBlg = {
        labels: ['Uthyrda', 'Fungerar inte', 'Parkerade'],
        datasets: [
        {
            label: '# st',
            data: [bikesActiveBlg, bikesErrorBlg, bikesInActiveBlg],
            backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            options: {
                responsive: true
            }
        },
        ],
    };

    const dataVis = {
        labels: ['Uthyrda', 'Fungerar inte', 'Parkerade'],
        datasets: [
        {
            label: '# st',
            data: [bikesActiveVis, bikesErrorVis, bikesInActiveVis],
            backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            options: {
                responsive: true
            }
        },
        ],
    };

    
    const dataClient = {
        labels: ['Aldrig hyrt', 'Hyrt en gång', 'Regelbundna användare', 'Administratörer'],
        datasets: [
        {
            label: '# st',
            data: countedCustomers,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(238, 189, 55, 0.399)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(238, 189, 55, 0.629)',
            ],
            borderWidth: 1,
            options: {
                responsive: true
            }
        },
        ],
    };

    function setCity(city){
        if (city === "Visby"){
            navigate('stad/Visby');
        } else if (city === "Borlänge"){
            navigate('stad/Borlänge');
        } else if (city === "Lund"){
            navigate('stad/Lund');
        } else if (city === "Kund"){
            navigate('kund');
        }
    }

    return (
        <div>
            <div>
                <h1 className='cityname'>Administratör</h1>
                <div className='adminindex'>
                    <h1 className='clientdata'>Våra städer</h1>
                    <div className="citychart">
                        <h2 className='citynameh2'>Visby</h2>
                        <div className="chart-wrapper">
                            <Pie data={dataVis}/>
                        </div> 
                        <button onClick={() => setCity("Visby")} className="buttoncity">Mer data</button>
                    </div>
                    <div className="citychart">
                    <h2 className='citynameh2'>Borlänge</h2>
                        <div className="chart-wrapper">
                            <Pie data={dataBlg}/>
                        </div> 
                        <button onClick={() => setCity("Borlänge")} className="buttoncity">Mer data</button>  
                    </div>
                    <div className="citychart">
                    <h2 className='citynameh2'>Lund</h2>
                        <div className="chart-wrapper">
                            <Pie data={dataLun}/>
                        </div> 
                        <button onClick={() => setCity("Lund")} className="buttoncity">Mer data</button>
                    </div>
                    <div className="customerchart">
                        <h1 className='clientdata'>Våra kunder</h1>
                        <div className="chart-wrapper2">
                            <Pie data={dataClient}/>
                        </div> 
                        <button onClick={() => setCity("Kund")} className="buttonclient">Hantera kund</button>
                        <button onClick={() => setCity("Kund")} className="buttonclient">Hantera admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

