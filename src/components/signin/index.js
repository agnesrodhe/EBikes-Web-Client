import InSigner from './signin';

export default function Start({setToken, setUserId, setUserRole}) {
    return (
        <>
            <InSigner setToken={setToken} setUserId={setUserId} setUserRole={setUserRole}/>
        </>
    );
}