import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
<Toaster position="bottom-right" reverseOrder={false} />

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
        <Toaster position="top-bottom" reverseOrder={false} />
            {isLoggedIn ? (
                <Dashboard onLogout={() => setIsLoggedIn(false)} />
            ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )}
        </>
    );
};

export default App;

