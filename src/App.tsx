import Footer from "./components/common/Footer";
import SideNavbar from "./components/common/SideNavbar";
import TopNavbar from "./components/common/TopNavbar";
import AllRoutes from "./routes/AllRoutes";
import ThemeSetting from "./components/common/topnavbar/ThemeSetting";
import PreLoader from "./components/common/PreLoader";

const App = (): JSX.Element => {
  const LOADING = false;

  return (
    <>
      {/* PreLoader */}
      <PreLoader loading={LOADING} />

      <div className="wrapper">
        <TopNavbar />
        <SideNavbar />

        <div className="content-page">
          <AllRoutes />
          <Footer />
        </div>
      </div>

      <ThemeSetting />
    </>
  );
};

export default App;