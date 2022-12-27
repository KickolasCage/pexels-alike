import { useSelector } from "react-redux";

// displayed if images didn't load due to 
// bad search query  or server-side error
const ImagesNotFound = () => {
  const error = useSelector(state => state.images.error)
  const state = useSelector(state => state)
  console.log(error, " - error state")
  return (
    <div style={{ textAlign: "center" }}>
     {(error.status) ?
      <>
      <h1>Error: code {error.code}</h1>
      <h2>{error.message}</h2>
      </> :
      <>
        <h1>We couldn't find anything.</h1>
        <h2>Please refine your search</h2>
      </>}
    </div>
  );
};

export default ImagesNotFound;
