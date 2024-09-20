import ProfileDetails from "../../components/core/profile/ProfileDetails";
import ProfileSettings from "../../components/core/profile/ProfileSettings";
import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Profile" }
];

const Profile = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Profile" breadcrumbs={breadcrumbs} />

            <div className="row">
                {/* ProfileDetails section */}
                <ProfileDetails />

                {/* ProfileSettings section */}
                <ProfileSettings />
            </div>
        </>
    );
};

export default Profile;