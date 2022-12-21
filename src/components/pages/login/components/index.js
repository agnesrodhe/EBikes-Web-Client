//Import component
import InSigner from './signin';

/*
Multifunktion page, sign in form from component and
possibility to add more components to sign in page.
*/
export default function Start({setToken, setUserId, setUserRole}) {
    return (
        <>
            <InSigner setToken={setToken} setUserId={setUserId}
                setUserRole={setUserRole}/>
        </>
    );
}
