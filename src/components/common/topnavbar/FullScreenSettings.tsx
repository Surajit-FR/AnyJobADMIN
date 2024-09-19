import { useState } from 'react';
import { Link } from 'react-router-dom';

const FullScreenSettings = (): JSX.Element => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        const documentElement = document.documentElement; // Select the <html> element

        if (!document.fullscreenElement) {
            // Enter fullscreen mode
            if (documentElement.requestFullscreen) {
                documentElement.requestFullscreen();
            } else if (documentElement.requestFullscreen) { // Firefox
                documentElement.requestFullscreen();
            } else if (documentElement.requestFullscreen) { // Chrome, Safari and Opera
                documentElement.requestFullscreen();
            } else if (documentElement.requestFullscreen) { // IE/Edge
                documentElement.requestFullscreen();
            }
            setIsFullScreen(true); // Set fullscreen state to true
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullScreen(false); // Set fullscreen state to false
        }
    };

    return (
        <>
            <li className="d-none d-md-inline-block">
                <Link className="nav-link" to="" data-toggle="fullscreen" onClick={handleFullScreen}>
                    <i className={`fs-22 ${isFullScreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}`}></i>
                </Link>
            </li>
        </>
    );
};

export default FullScreenSettings;