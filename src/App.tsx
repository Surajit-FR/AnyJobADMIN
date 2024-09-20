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
        {/* Topbar */}
        <TopNavbar />
        {/* Left Sidebar */}
        <SideNavbar />

        {/* Start Page Content */}
        <div className="content-page">
          <div className="content">
            {/* Start Content */}
            <div className="container-fluid">
              <AllRoutes />

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* ThemeSetting */}
      <ThemeSetting />
    </>
  );
};

export default App;