const AuthFooter = (): JSX.Element => {
    return (
        <>
            <footer className="footer footer-alt">
                <span className="text-white-50">
                    <script>{new Date().getFullYear()}</script> © Jidox - Coderthemes.com
                </span>
            </footer>
        </>
    );
};

export default AuthFooter;