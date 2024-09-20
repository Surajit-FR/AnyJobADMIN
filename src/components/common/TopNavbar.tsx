import { Link } from "react-router-dom";
import { toggleHtmlAttribute, toggleHtmlClass } from "../../utils/utility";
import useThemeSettings from "../../hooks/useThemeSettings";
// import SearchBar from "./topnavbar/SearchBar";
// import LanguageDropdown from "./topnavbar/LanguageDropdown";
// import NotificationDropdown from "./topnavbar/NotificationDropdown";
// import ApplicationDropdown from "./topnavbar/ApplicationDropdown";
// import SearchSuggestionSection from "./topnavbar/SearchSuggestionSection";
import SettingsSection from "./topnavbar/SettingsSection";
import ThemeSettings from "./topnavbar/ThemeSettings";
import FullScreenSettings from "./topnavbar/FullScreenSettings";
import UserDropdown from "./topnavbar/UserDropdown";

const TopNavbar = (): JSX.Element => {
    const { settings, handleChange } = useThemeSettings();

    const toggleTheme = () => {
        const newTheme = settings['data-bs-theme'] === 'dark' ? 'light' : 'dark';
        handleChange('data-bs-theme', newTheme);
    };

    const toggleSidenavSize = (): void => {
        toggleHtmlAttribute('data-sidenav-size', 'default', 'condensed');
        toggleHtmlClass('menuitem-active sidebar-enable');
    };

    return (
        <>
            {/* <!-- ========== Topbar Start ========== --> */}
            <div className="navbar-custom">
                <div className="topbar container-fluid">
                    <div className="d-flex align-items-center gap-lg-2 gap-1">

                        {/* <!-- Topbar Brand Logo --> */}
                        <div className="logo-topbar">
                            {/* <!-- Logo light --> */}
                            <Link to="/dashboard" className="logo-light">
                                <span className="logo-lg">
                                    <img src="/assets/images/AnyJobLogoW.png" alt="logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src="/assets/images/faviconW.png" alt="small logo" />
                                </span>
                            </Link>

                            {/* <!-- Logo Dark --> */}
                            <Link to="/dashboard" className="logo-dark">
                                <span className="logo-lg">
                                    <img src="/assets/images/AnyJobLogo.png" alt="logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src="/assets/images/favicon.png" alt="small logo" />
                                </span>
                            </Link>
                        </div>

                        {/* <!-- Sidebar Menu Toggle Button --> */}
                        <button className="button-toggle-menu" onClick={toggleSidenavSize}>
                            <i className="ri-menu-2-fill"></i>
                        </button>

                        {/* <!-- Horizontal Menu Toggle Button --> */}
                        <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>

                        {/* <!-- Topbar Search Form --> */}
                        {/* <SearchSuggestionSection /> */}
                    </div>

                    <ul className="topbar-menu d-flex align-items-center gap-3">
                        {/* SearchBar Section */}
                        {/* <SearchBar /> */}

                        {/* LanguageDropdown Section */}
                        {/* <LanguageDropdown /> */}

                        {/* NotificationDropdown Section */}
                        {/* <NotificationDropdown /> */}

                        {/* ApplicationDropdown Section */}
                        {/* <ApplicationDropdown /> */}

                        {/* Settings Section */}
                        <SettingsSection />

                        {/* ThemeSetting Section */}
                        <ThemeSettings toggleTheme={toggleTheme} />

                        {/* FullScreenSettings Section */}
                        <FullScreenSettings />

                        {/* UserDropdown Section */}
                        <UserDropdown />
                    </ul>
                </div>
            </div>
            {/* <!-- ========== Topbar End ========== --> */}
        </>
    );
};

export default TopNavbar;