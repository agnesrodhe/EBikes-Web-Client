import Register from './signup';

export default function StartRegister({setToken, setUserId, setUserRole}) {
    return (
        <>
            <Register setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />
        </>
    );
}
