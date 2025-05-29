import React from 'react';

const AuthLoader = () => {
    return (
        <div className="  fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] flex flex-col items-center justify-center gap-2 animate__animated ">
            <img src="/lutta-logo.png" alt="logo" className="w-40 h-32" />
            <h1 className="text-center text-2xl dark:text-white-light">Lutta & Associates</h1>
        </div>
    );
};

export default AuthLoader;
