import BounceLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "#3f7fe9",
};

const Loading = () => {
    return (
      <div className='loading-component'>
        <BounceLoader color={'yellow'} loading={true} cssOverride={override} size={150} />
      </div>
    )
  }
  
  export default Loading;