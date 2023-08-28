import { useRouteError } from "react-router-dom";
import "../styles/ErrorPage.css";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <>
      <div id="error-page" className="container">
        <div className="errorPage_container">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </>
  );
}
