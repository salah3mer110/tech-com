function Spinnner() {
  return (
    <div className="text-center">
      {/* <div id="spinner-container" className="space-y-10">
        <div className="flex justify-center">
          <div
            className="w-16 h-16 border-4 border-blue-500
                        border-t-transparent rounded-full 
                        animate-spin"
          ></div>
        </div>
      </div> */}
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71F8E4] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading hero images...</p>
      </div>
    </div>
  );
}

export default Spinnner;
