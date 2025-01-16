import { Link } from "react-router-dom";
import sideNavbarMenuData from "./sideNavbar.json";
import sideNavbarAdmin from './sideNavbarAdmin.json'
import React, { useEffect, useState } from "react";
import { MenuItems } from "../../../types/common";
import SidebarItem from "./topnavbar/SidebarItem";

const SideNavbar = (): JSX.Element => {
    const role = localStorage.getItem("role") || ""
    const [navBarData, setNavbarData] = useState<any>([])

    useEffect(() => {
        if (role !== "SuperAdmin") {
            setNavbarData(sideNavbarAdmin)
        }
        else {
            setNavbarData(sideNavbarMenuData)
        }
    }, [role])
    return (
        <>
            {/* <!-- ========== Left Sidebar Start ========== --> */}
            <div className="leftside-menu">

                {/* <!-- Brand Logo Light --> */}
                <Link to="/dashboard" className="logo logo-light">
                    <span className="logo-lg">
                        <img src="/assets/images/AnyJobLogoW.png" alt="logo" />
                    </span>
                    <span className="logo-sm">
                        <img src="/assets/images/faviconW.png" alt="small logo" />
                    </span>
                </Link>

                {/* <!-- Brand Logo Dark --> */}
                <Link to="/dashboard" className="logo logo-dark">
                    <span className="logo-lg">
                        <img src="/assets/images/AnyJobLogo.png" alt="logo" />
                    </span>
                    <span className="logo-sm">
                        <img src="/assets/images/favicon.png" alt="small logo" />
                    </span>
                </Link>

                {/* <!-- Sidebar Hover Menu Toggle Button --> */}
                <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                    <i className="ri-checkbox-blank-circle-line align-middle"></i>
                </div>

                {/* <!-- Full Sidebar Menu Close Button --> */}
                <div className="button-close-fullsidebar">
                    <i className="ri-close-fill align-middle"></i>
                </div>

                {/* <!-- Sidebar -left --> */}
                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    {/* <!-- Leftbar User --> */}
                    <div className="leftbar-user p-3 text-white">
                        <Link to="/profile" className="d-flex align-items-center text-reset">
                            <div className="flex-shrink-0">
                                <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42"
                                    className="rounded-circle shadow" />
                            </div>
                            <div className="flex-grow-1 ms-2">
                                <span className="fw-semibold fs-15 d-block">Doris Larson</span>
                                <span className="fs-13">Founder</span>
                            </div>
                            <div className="ms-auto">
                                <i className="ri-arrow-right-s-fill fs-20"></i>
                            </div>
                        </Link>
                    </div>

                    {/* <!--- Sidemenu --> */}
                    <ul className="side-nav">
                        {navBarData && navBarData.length> 0 && navBarData?.map((menuItem: MenuItems, index: number) => (
                            <React.Fragment key={index}>
                                <li className="side-nav-title mt-1">{menuItem?.title}</li>
                                {menuItem?.items?.map((item, itemIndex) => (
                                    <SidebarItem
                                        key={itemIndex}
                                        item={item}
                                        level={0}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>
                    {/* <!--- End Sidemenu --> */}

                    <div className="clearfix"></div>
                </div>
            </div>
            {/* <!-- ========== Left Sidebar End ========== --> */}
        </>
    );
};

export default SideNavbar;