import { signOut } from "firebase/auth";
import { auth } from "/Users/gelo/Desktop/SQ/apptracker/firebase";

export default function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Use the correct signOut function
      console.log("Successfully signed out.");
    } catch (error) {
      console.error("Error signing out:", error); // Pass the error for debugging
    }
  };

  return (
    <div className="w-1/6 mb-7 flex justify-right ">
      <button
        onClick={handleSignOut}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Sign Out"
      >
        Sign Out
      </button>
    </div>
  );
}
