/* eslint-disable @next/next/no-img-element */

import { FaEye, FaRegCircle } from "react-icons/fa";

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-20">
      <img src="/images/logo.png" alt="" className="mb-4 md:w-50 w-40" />
      <h1 className="md:text-4xl text-3xl font-semibold mb-2 text-center">
        Take{" "}
        <span className="text-[#9B4BC2] text-shadow-[0_0_8px_#9B4BC2]">
          Control
        </span>{" "}
        Of Your Finance
      </h1>
      <p className="text-center md:text-base text-sm">
        Sign up in seconds — manage money with confidence.
      </p>

      <form
        action=""
        className="lg:min-w-[60%] min-w-[90%] mt-5 flex flex-col gap-8"
      >
        <div className="input-container">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter email address"
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
            />

            <FaEye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          <div className="grid md:grid-cols-2 md:gap-4 gap-2 mt-2 text-sm text-gray-500">
            <p className="flex gap-2 items-center">
              <FaRegCircle className="text-xs" />
              Must be at least 8 characters long
            </p>
            <p className="flex gap-2 items-center">
              <FaRegCircle className="text-xs" />
              Must include at least 1 uppercase
            </p>
            <p className="flex gap-2 items-center">
              <FaRegCircle className="text-xs" />
              Must include at least 1 lowercase
            </p>
            <p className="flex gap-2 items-center">
              <FaRegCircle className="text-xs" />
              Must include at least 1 number
            </p>
            <p className="flex gap-2 items-center">
              <FaRegCircle className="text-xs" />
              Must include at least 1 special character
            </p>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="confirm password" className="input-label">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirm password"
              className="form-input"
              placeholder="Confirm your password"
            />

            <FaEye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between gap-x-4 gap-y-8">
          <div className="input-container w-full">
            <label htmlFor="first name" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="first name"
              className="form-input"
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-container w-full">
            <label htmlFor="last name" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="last name"
              className="form-input"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#9B4BC2] p-4 text-white font-medium hover:bg-[#9B4BC2]/90 transition duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-[#9B4BC2] font-medium underline">
          Log in
        </a>
      </p>
    </div>
  );
}
