const ProfileComponent = () => {
       return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-5">Profile Page</h2>
            <div className="flex flex-col space-y-4">
                <div className="border p-2">
                    <h3 className="font-bold">Name:</h3>
                    <p>John Doe</p>
                </div>
                <div className="border p-2">
                    <h3 className="font-bold">Email:</h3>
                    <p>johndoe@example.com</p>
                </div>
                <div className="border p-2">
                    <h3 className="font-bold">Score:</h3>
                    <p>100</p>
                </div>
            </div>
            <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4">Logout</button>
            <button className="bg-red-500 text-white rounded px-4 py-2 mt-4">Delete Profile</button>
        </main>
    );
}

export default ProfileComponent;