"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupDTO } from "@/providers/dto/SignupDTO";

export default function SignUpPage() {
  const router = useRouter();

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState("");

  const avatars = [
    "/avatars/avatar1.jpg",
    "/avatars/avatar2.jpg",
    "/avatars/avatar3.jpg",
    "/avatars/avatar4.jpg",
    "/avatars/avatar5.jpg",
  ];

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      router.push("/Dashboard");
    }
  }, []);
  // Handle input changes
  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleBioChange = (e: any) => {
    setBio(e.target.value);
  };

  const handleAvatarSelect = (index: any) => {
    setSelectedAvatar(index);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword || selectedAvatar === null) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare form data
    const data : SignupDTO =
    {
      userName: username,
      email: email,
      password:  password,
      avatar: selectedAvatar,
      bio: bio
    } 

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // If sign-up is successful, redirect to Dashboard or another page
        router.push("/Dashboard");
      } else {
        // If sign-up fails, display error message
        const data = await response.json();
        setError(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };


  return (
    <div className="container mx-auto my-20">
      <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
      <form className="mt-10 mx-auto w-96" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-2 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Username"
          />
        </div>
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
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-2 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm Password"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleBioChange}
            className="mt-2 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Tell us about yourself"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Choose an Avatar
          </label>
          <div className="mt-2 flex space-x-4 items-center justify-center">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                  selectedAvatar === index
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleAvatarSelect(index)}
              />
            ))}
          </div>
        </div>
        {error && <div className="mb-6 text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">
            Already have an account?{" "}
          </span>
          <Link href="/">
            <h1 className="text-sm text-blue-500 hover:underline">Login</h1>
          </Link>
        </div>
      </form>
    </div>
  );
}
