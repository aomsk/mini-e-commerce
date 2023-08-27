import { useRouteError } from "react-router-dom";
import Navbar from "./Navbar";
export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar />
      <div id="error-page" className="container mx-auto px-10 py-12 h-full">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl font-bold">Oops!</h1>
          <p className="font-medium">Sorry, an unexpected error has occurred.</p>
          <p className="font-medium">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </>
  );
}
