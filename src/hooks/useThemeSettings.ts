import { useState, useEffect } from 'react';
import { DefaultSettings } from '../../types/common';

const defaultSettings: DefaultSettings = {
    'data-bs-theme': 'light',
    'data-layout-mode': 'fluid',
    'data-topbar-color': 'light',
    'data-menu-color': 'light',
    'data-sidenav-size': 'default',
    'data-layout-position': 'fixed',
    'data-sidenav-user': 'true',
};

const useThemeSettings = () => {
    const [settings, setSettings] = useState<DefaultSettings>(defaultSettings);

    useEffect(() => {
        const storedSettings = JSON.parse(sessionStorage.getItem('theme-settings') || '{}') as DefaultSettings;
        setSettings(prevSettings => ({
            ...prevSettings,
            ...storedSettings
        }));

        Object.entries(storedSettings).forEach(([key, value]) => {
            document.documentElement.setAttribute(key, value);
        });
    }, []);

    const handleChange = (name: string, value: string) => {
        setHtmlAttribute(name, value);
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: value
        }));
        sessionStorage.setItem('theme-settings', JSON.stringify({ ...settings, [name]: value }));
    };

    const handleResetTheme = () => {
        setSettings(defaultSettings);
        sessionStorage.removeItem('theme-settings');
        Object.entries(defaultSettings).forEach(([key, value]) => {
            document.documentElement.setAttribute(key, value);
        });
    };

    const setHtmlAttribute = (name: string, value: string) => {
        document.documentElement.setAttribute(name, value);
    };

    return {
        settings,
        handleChange,
        handleResetTheme
    };
};

export default useThemeSettings;