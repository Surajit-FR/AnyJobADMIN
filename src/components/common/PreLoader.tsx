const PreLoader = ({ loading }: { loading: boolean }): JSX.Element => {
    return (
        <>
            {
                loading &&
                <div id="preloader">
                    <div id="status">
                        <div className="bouncing-loader"><div ></div><div ></div><div ></div></div>
                    </div>
                </div>
            }
        </>
    );
};

export default PreLoader;