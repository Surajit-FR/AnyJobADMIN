import useThemeSettings from "../../../hooks/useThemeSettings";


const ThemeSetting = (): JSX.Element => {
    const { settings, handleChange, handleResetTheme } = useThemeSettings();

    return (
        <>
            {/* <!-- Theme Settings --> */}
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="theme-settings-offcanvas">
                <div className="d-flex align-items-center bg-primary p-3 offcanvas-header">
                    <h5 className="text-white m-0">Theme Settings</h5>
                    <button type="button" className="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body p-0">
                    <div data-simplebar className="h-100">
                        <div className="card mb-0 p-3">
                            <div className="alert alert-warning" role="alert">
                                <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
                            </div>

                            <h5 className="my-3 fs-16 fw-bold">Color Scheme</h5>

                            <div className="d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-bs-theme"
                                        id="layout-color-light"
                                        value="light"
                                        checked={settings['data-bs-theme'] === 'light'}
                                        onChange={() => handleChange('data-bs-theme', 'light')}
                                    />
                                    <label className="form-check-label" htmlFor="layout-color-light">Light</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-bs-theme"
                                        id="layout-color-dark"
                                        value="dark"
                                        checked={settings['data-bs-theme'] === 'dark'}
                                        onChange={() => handleChange('data-bs-theme', 'dark')}
                                    />
                                    <label className="form-check-label" htmlFor="layout-color-dark">Dark</label>
                                </div>
                            </div>

                            <div id="layout-width">
                                <h5 className="my-3 fs-16 fw-bold">Layout Mode</h5>

                                <div className="d-flex flex-column gap-2">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="data-layout-mode"
                                            id="layout-mode-fluid"
                                            value="fluid"
                                            checked={settings['data-layout-mode'] === 'fluid'}
                                            onChange={() => handleChange('data-layout-mode', 'fluid')}
                                        />
                                        <label className="form-check-label" htmlFor="layout-mode-fluid">Fluid</label>
                                    </div>

                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="data-layout-mode"
                                            id="layout-mode-boxed"
                                            value="boxed"
                                            checked={settings['data-layout-mode'] === 'boxed'}
                                            onChange={() => handleChange('data-layout-mode', 'boxed')}
                                        />
                                        <label className="form-check-label" htmlFor="layout-mode-boxed">Boxed</label>
                                    </div>

                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="data-layout-mode"
                                            id="data-layout-detached"
                                            value="detached"
                                            checked={settings['data-layout-mode'] === 'detached'}
                                            onChange={() => handleChange('data-layout-mode', 'detached')}
                                        />
                                        <label className="form-check-label" htmlFor="data-layout-detached">Detached</label>
                                    </div>
                                </div>
                            </div>

                            <h5 className="my-3 fs-16 fw-bold">Topbar Color</h5>

                            <div className="d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-topbar-color"
                                        id="topbar-color-light"
                                        value="light"
                                        checked={settings['data-topbar-color'] === 'light'}
                                        onChange={() => handleChange('data-topbar-color', 'light')}
                                    />
                                    <label className="form-check-label" htmlFor="topbar-color-light">Light</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-topbar-color"
                                        id="topbar-color-dark"
                                        value="dark"
                                        checked={settings['data-topbar-color'] === 'dark'}
                                        onChange={() => handleChange('data-topbar-color', 'dark')}
                                    />
                                    <label className="form-check-label" htmlFor="topbar-color-dark">Dark</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-topbar-color"
                                        id="topbar-color-brand"
                                        value="brand"
                                        checked={settings['data-topbar-color'] === 'brand'}
                                        onChange={() => handleChange('data-topbar-color', 'brand')}
                                    />
                                    <label className="form-check-label" htmlFor="topbar-color-brand">Brand</label>
                                </div>
                            </div>

                            <h5 className="my-3 fs-16 fw-bold">Menu Color</h5>

                            <div className="d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-menu-color"
                                        id="leftbar-color-light"
                                        value="light"
                                        checked={settings['data-menu-color'] === 'light'}
                                        onChange={() => handleChange('data-menu-color', 'light')}
                                    />
                                    <label className="form-check-label" htmlFor="leftbar-color-light">Light</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-menu-color"
                                        id="leftbar-color-dark"
                                        value="dark"
                                        checked={settings['data-menu-color'] === 'dark'}
                                        onChange={() => handleChange('data-menu-color', 'dark')}
                                    />
                                    <label className="form-check-label" htmlFor="leftbar-color-dark">Dark</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-menu-color"
                                        id="leftbar-color-brand"
                                        value="brand"
                                        checked={settings['data-menu-color'] === 'brand'}
                                        onChange={() => handleChange('data-menu-color', 'brand')}
                                    />
                                    <label className="form-check-label" htmlFor="leftbar-color-brand">Brand</label>
                                </div>
                            </div>

                            <h5 className="my-3 fs-16 fw-bold">Sidebar Size</h5>

                            <div className="d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-sidenav-size"
                                        id="sidebar-size-default"
                                        value="default"
                                        checked={settings['data-sidenav-size'] === 'default'}
                                        onChange={() => handleChange('data-sidenav-size', 'default')}
                                    />
                                    <label className="form-check-label" htmlFor="sidebar-size-default">Default</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-sidenav-size"
                                        id="sidebar-size-compact"
                                        value="compact"
                                        checked={settings['data-sidenav-size'] === 'compact'}
                                        onChange={() => handleChange('data-sidenav-size', 'compact')}
                                    />
                                    <label className="form-check-label" htmlFor="sidebar-size-compact">Compact</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-sidenav-size"
                                        id="sidebar-size-small"
                                        value="condensed"
                                        checked={settings['data-sidenav-size'] === 'condensed'}
                                        onChange={() => handleChange('data-sidenav-size', 'condensed')}
                                    />
                                    <label className="form-check-label" htmlFor="sidebar-size-small">Condensed</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-sidenav-size"
                                        id="leftbar-size-small-hover"
                                        value="sm-hover"
                                        checked={settings['data-sidenav-size'] === 'sm-hover'}
                                        onChange={() => handleChange('data-sidenav-size', 'sm-hover')}
                                    />
                                    <label className="form-check-label" htmlFor="leftbar-size-small-hover">Hover View</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-sidenav-size"
                                        id="leftbar-size-fullscreen"
                                        value="fullscreen"
                                        checked={settings['data-sidenav-size'] === 'fullscreen'}
                                        onChange={() => handleChange('data-sidenav-size', 'fullscreen')}
                                    />
                                    <label className="form-check-label" htmlFor="leftbar-size-fullscreen">Fullscreen Layout</label>
                                </div>
                            </div>

                            <h5 className="my-3 fs-16 fw-bold">Layout Position</h5>

                            <div className="d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-layout-position"
                                        id="layout-position-fixed"
                                        value="fixed"
                                        checked={settings['data-layout-position'] === 'fixed'}
                                        onChange={() => handleChange('data-layout-position', 'fixed')}
                                    />
                                    <label className="form-check-label" htmlFor="layout-position-fixed">Fixed</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="data-layout-position"
                                        id="layout-position-scrollable"
                                        value="scrollable"
                                        checked={settings['data-layout-position'] === 'scrollable'}
                                        onChange={() => handleChange('data-layout-position', 'scrollable')}
                                    />
                                    <label className="form-check-label" htmlFor="layout-position-scrollable">Scrollable</label>
                                </div>
                            </div>

                            <div id="sidebar-user">
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <label className="fs-16 fw-bold m-0" htmlFor="sidebaruser-check">Sidebar User Info</label>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="data-sidenav-user"
                                            id="sidebaruser-check"
                                            checked={settings['data-sidenav-user'] === 'true'}
                                            onChange={(e) => handleChange('data-sidenav-user', e.target.checked ? 'true' : '')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="offcanvas-footer border-top p-3 text-center">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-light w-100" id="reset-layout" onClick={handleResetTheme}>
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThemeSetting;