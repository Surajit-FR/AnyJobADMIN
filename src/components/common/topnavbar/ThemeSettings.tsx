import { MouseEvent } from "react";

const ThemeSettings = ({ toggleTheme }: { toggleTheme: (event: MouseEvent<HTMLDivElement>) => void }): JSX.Element => {
    return (
        <>
            <li className="d-none d-sm-inline-block">
                <div className="nav-link" id="light-dark-mode" onClick={toggleTheme}>
                    <i className="ri-moon-fill fs-22"></i>
                </div>
            </li>
        </>
    );
};

export default ThemeSettings;