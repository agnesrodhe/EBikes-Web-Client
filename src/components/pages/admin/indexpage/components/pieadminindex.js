import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import bikesModel from '../../../../../models/bikes';
import userModel from '../../../../../models/users';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieAdminIndex() {
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
    const countedUsers = useRef(0);

    useEffect(() => {
        updateandsetbikes();
        // eslint-disable-next-line
    }, []);

    //Count users and set count for pie diagram.
    function clienthandler() {
        userModel.getAllCustomers().then(function(result) {
            let countzerotimes = 0;

            let countonetimes = 0;

            let countmanytimes = 0;

            let countadmin = 0;

            bikesModel.getAllBikes().then(function(result2) {
                result.forEach((customer) => {
                    if (customer.role === "admin") {
                        countadmin = countadmin + 1;
                    } else if (customer.history.length === 0) {
                        let check = false;

                        result2.forEach((bike) => {
                            if (customer._id === bike.active) {
                                countonetimes = countonetimes + 1;
                                check = true;
                            }
                        });
                        if (check === false) {
                            countzerotimes = countzerotimes + 1;
                        }
                    } else if (customer.history.length === 1) {
                        countonetimes = countonetimes + 1;
                    } else if (customer.history.length > 1) {
                        countmanytimes = countmanytimes + 1;
                    }
                });
                setCountedCustomers([countzerotimes, countonetimes, countmanytimes, countadmin]);
                countedUsers.current = countzerotimes + countonetimes + countmanytimes + countadmin;
            });
        });
    }

    //Set counted variables for bikes in each city.
    function updateandsetbikes() {
        bikesModel.getCityZones().then(function(result) {
            result.forEach((place) => {
                if ("Borl??nge" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result) {
                        const working = [];
                        const notworking = [];

                        if (result === "Only active bikes in this city") {
                            setBikesInActiveBlg(0);
                            setBikesErrorBlg(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike);
                                } else {
                                    notworking.push(bike);
                                }
                            });
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
                    });
                    bikesModel.getAllActiveBikes(place._id).then(function(result) {
                        if (result === "No active bikes in this city") {
                            setBikesActiveBlg(0);
                        } else {
                            setBikesActiveBlg(result.length);
                        }
                    });
                } else if ("Visby" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result) {
                        const working = [];
                        const notworking = [];

                        if (result === "Only active bikes in this city") {
                            setBikesInActiveVis(0);
                            setBikesErrorVis(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike);
                                } else {
                                    notworking.push(bike);
                                }
                            });
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
                    });
                    bikesModel.getAllActiveBikes(place._id).then(function(result) {
                        if (result === "No active bikes in this city") {
                            setBikesActiveVis(0);
                        } else {
                            setBikesActiveVis(result.length);
                        }
                    });
                } else if ("Lund" === place.name) {
                    bikesModel.getAllInActiveBikes(place._id).then(function(result) {
                        const working = [];
                        const notworking = [];

                        if (result === "Only active bikes in this city") {
                            setBikesInActiveLun(0);
                            setBikesErrorLun(0);
                        } else {
                            result.forEach((bike) => {
                                if (bike.status === "working") {
                                    working.push(bike);
                                } else {
                                    notworking.push(bike);
                                }
                            });
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
                    });
                    bikesModel.getAllActiveBikes(place._id).then(function(result) {
                        if (result === "No active bikes in this city") {
                            setBikesActiveLun(0);
                        } else {
                            setBikesActiveLun(result.length);
                        }
                    });
                }
            });
            clienthandler();
        });
    }

    //Navigate to routes.
    function setCity(route) {
        if (route === "Visby") {
            navigate('stad/Visby');
        } else if (route === "Borl??nge") {
            navigate('stad/Borl??nge');
        } else if (route === "Lund") {
            navigate('stad/Lund');
        } else if (route === "Kund") {
            navigate('kund');
        } else if (route === "price") {
            navigate('kostnader');
        }
    }

    //Options to set pie variables and colors.
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
        labels: ['Aldrig hyrt', 'Hyrt en g??ng', 'Regelbundna anv??ndare', 'Administrat??rer'],
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

    return (
        <div className='adminindex'>
            <h1 className='clientdata'>V??ra st??der</h1>
            <div className="citychart">
                <h2 className='citynameh2'>Visby</h2>
                <div className="chart-wrapper">
                    <Pie data={dataVis}/>
                </div>
                <div>
                    <h5 className='h5tot'>Totalt antal cyklar: {
                        bikesActiveVis + bikesErrorVis + bikesInActiveVis}</h5>
                </div>
                <button onClick={() => setCity("Visby")} className="buttoncity">
                    Se mer data fr??n Visby</button>
            </div>
            <div className="citychart">
                <h2 className='citynameh2'>Borl??nge</h2>
                <div className="chart-wrapper">
                    <Pie data={dataBlg}/>
                </div>
                <div>
                    <h5 className='h5tot'>Totalt antal cyklar: {
                        bikesActiveBlg + bikesErrorBlg + bikesInActiveBlg}</h5>
                </div>
                <button onClick={() => setCity("Borl??nge")} className="buttoncity">
                    Se mer data fr??n Borl??nge</button>
            </div>
            <div className="citychart">
                <h2 className='citynameh2'>Lund</h2>
                <div className="chart-wrapper">
                    <Pie data={dataLun}/>
                </div>
                <div>
                    <h5 className='h5tot'>Totalt antal cyklar: {
                        bikesActiveLun + bikesErrorLun + bikesInActiveLun}</h5>
                </div>
                <button onClick={() => setCity("Lund")} className="buttoncity">
                    Se mer data fr??n Lund</button>
            </div>
            <div className="customerchart">
                <h1 className='clientdata'>Kunder och kostnader</h1>
                <div className="chart-wrapper2">
                    <Pie data={dataClient}/>
                </div>
                <div>
                    <h5 className='h5admin'>Antal anv??ndare: {
                        countedUsers.current}</h5>
                </div>
                <button onClick={() => setCity("Kund")} className="buttonclient">
                    Hantera kund</button>
                <button onClick={() => setCity("price")} className="buttonclient">
                    Kostnader och prisjusteringar</button>
            </div>
        </div>
    );
}
