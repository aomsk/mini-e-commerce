import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spin } from "antd";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser, user } = useAuthContext();
  const getUserData = async () => {
    // const email: string | null = localStorage.getItem("email");
    await axios
      .post("http://localhost:3000/api/user", { email: user?.email })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container" style={{ paddingTop: "10rem" }}>
        {/* {loadding && <Spin />} */}
        {loading ? (
          <Spin />
        ) : (
          <div>
            <h1>Profile</h1>
            <p>First Name : {userData?.first_name}</p>
            <p>Last Name : {userData?.last_name}</p>
            <p>Email : {userData?.email}</p>
            <h2>{currentUser === "admin" && <p>I'm Admin</p>}</h2>
            <h1>Orders</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
