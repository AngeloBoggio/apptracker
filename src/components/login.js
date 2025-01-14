import { useState } from "react";
import { auth } from "/Users/gelo/Desktop/SQ/apptracker/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged in");
    } catch (error) {
      let errormsg = "Incorrect credentials.";
      setErrorMessage(errormsg);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      {errorMessage && (
        <p className="text-red-500 text-sm flex justify-center">
          {errorMessage}
        </p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded h-auto"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
