import ProfileComponent from "../../components/profile";
import NavBar from "../../components/NavBar";
import { NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <main><NavBar />
      <ProfileComponent />
    </main>
  );
}

export default Profile;