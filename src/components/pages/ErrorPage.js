import StickySearchBar from "../StickySearchBar";


// error page that appears 
// if user goes to unhandled route
const ErrorPage = () => {
  return (
    <>
      <StickySearchBar alwaysSticky />
      <h1 style={{textAlign: 'center'}}>Oops, nothing here!</h1>
    </>
  );
};

export default ErrorPage;
