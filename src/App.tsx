import Footer from "./components/common/Footer";
import SideNavbar from "./components/common/SideNavbar";
import TopNavbar from "./components/common/TopNavbar";
import AllRoutes from "./routes/AllRoutes";
import ThemeSetting from "./components/common/topnavbar/ThemeSetting";
import PreLoader from "./components/PreLoader";
import { useSelector } from "react-redux";
import { RootState } from "./store/Store";
import {
  isCategoryLoading,
} from "./utils/loading";

const App = (): JSX.Element => {
  const category = useSelector((state: RootState) => state.categorySlice);
  // const question = useSelector((state: RootState) => state.questionSlice);

  const LOADING = isCategoryLoading(category)
  // || isQuestionLoading(question)

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