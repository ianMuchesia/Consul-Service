import { PropsWithChildren, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import store from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { toggleAnimation, toggleLayout, toggleLocale, toggleMenu, toggleNavbar, toggleRTL, toggleSemidark, toggleTheme } from './store/features/themeConfigSlice';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css';
import 'flatpickr/dist/flatpickr.css';
import { Toaster } from 'react-hot-toast';


function App({ children }: PropsWithChildren) {
    const themeConfig =  useAppSelector((state)=>state.themeConfig)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    return (
        <MantineProvider>
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
        <Toaster position='top-center'/>

        </MantineProvider>
    );
}

export default App;
