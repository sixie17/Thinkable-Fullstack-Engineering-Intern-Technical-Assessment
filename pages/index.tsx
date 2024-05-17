import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useCookies } from "react-cookie";
import { getCookie } from 'cookies-next';
// import { cookies } from 'next/headers'

export default async function LoginPage() {
  const router = useRouter();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // Handle input changes
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log(getCookie("token"));
    
    if (getCookie("token"))
      router.push("/Dashboard");
  }, []);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError("Email is required.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid.");
      return;
    } else if (!password) {
      setError("Password is required.");
      return;
    }

    // If validation passes, clear errors and navigate to the Dashboard
    const data = {email: email, password: password}
  //   try {
  //     const response = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       // If sign-up is successful, redirect to Dashboard or another page
  //       router.push("/Dashboard");
  //     } else {
  //       // If sign-up fails, display error message
  //       const data = await response.json();
  //       setError(data.message || "Sign-up failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Sign-up error:", error);
  //     setError("An unexpected error occurred. Please try again later.");
  //   }
  };

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-3xl font-semibold text-center">Login</h1>
      <form className="mt-10 mx-auto w-96" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-2 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-2 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        {error && <div className="mb-6 text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">Don't have an account? </span>
          <Link href="/signup">
            <h1 className="text-sm text-blue-500 hover:underline">Sign Up</h1>
          </Link>
        </div>
      </form>
    </div>
  );
}
