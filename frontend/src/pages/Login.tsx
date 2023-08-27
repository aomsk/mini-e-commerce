import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-12 flex justify-center items-center h-full">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Top Right label</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          {/* <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </label> */}
        </div>
      </div>
    </>
  );
};
export default Login;
