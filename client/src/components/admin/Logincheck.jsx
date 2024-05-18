function Logincheck() { 
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-1/3 p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <p className="text-red-500 mb-4">Please login to continue.</p>
          <a href="/admin_login">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Login</button>
          </a>
        </div>
      </div>
    );
}

export default Logincheck