import '../../styles/LoadingSpinner.css'

// a spinner that's displayed during the loading of the page
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingSpinner