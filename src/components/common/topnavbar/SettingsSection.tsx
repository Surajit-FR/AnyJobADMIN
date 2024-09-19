import { Link } from "react-router-dom";

const SettingsSection = (): JSX.Element => {
    return (
        <>
            <li className="d-none d-sm-inline-block">
                <Link className="nav-link" data-bs-toggle="offcanvas" to="#theme-settings-offcanvas">
                    <i className="ri-settings-3-fill fs-22"></i>
                </Link>
            </li>
        </>
    );
};

export default SettingsSection;