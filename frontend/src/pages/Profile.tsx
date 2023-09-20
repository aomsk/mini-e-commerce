import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<User>();
  const { isAdmin } = useAuthContext();
  const getUserData = async () => {
    const email: string | null = localStorage.getItem("email");

    await axios
      .post("http://localhost:3000/api/user", { email })

      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="container" style={{ paddingTop: "10rem" }}>
        <h1>Profile</h1>
        <div>{userData?.first_name}</div>
        <div>{userData?.last_name}</div>
        <div>{userData?.email}</div>
        <div>{isAdmin && <p>I'm Admin</p>}</div>
        <h1>Orders</h1>
      </div>
    </>
  );
};

export default Profile;
