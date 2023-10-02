import { useAuthContext } from "../hooks/useAuthContext";
export default function Admin() {
  const { user } = useAuthContext();
  return (
    <div className="container" style={{ paddingTop: "10rem" }}>
      Admin Page
      <h3>Admin Email : {user?.email}</h3>
      <p>Manage Products</p>
    </div>
  );
}
