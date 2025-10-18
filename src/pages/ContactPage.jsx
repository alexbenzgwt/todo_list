import React from "react";
import MailIcon from "../assets/mailbox.png";
import ChatIcon from "../assets/chat logo.png";
import CallIcon from "../assets/calls logo.png";
import InstaIcon from "../assets/Insta Logo.png";
import FBIcon from "../assets/FB Logo.png";
import PinterestIcon from "../assets/Pinterest Logo.png";
import YouTubeIcon from "../assets/YouTubeLogo.png";
import LinkedinIcon from "../assets/LinkdinLogo.png";
import TwitterIcon from "../assets/TwitterLogo.png";
import OperaIcon from "../assets/OperaMini.png";

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center py-10 px-5 sm:px-10 lg:px-10">
      {/* Heading */}
      <div className="text-left mb-5 relative bottom-12">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-800">
          Contact us
        </h1>
      </div>

      {/* Contact Options */}
      <div className="flex flex-wrap justify-start sm:justify-start gap-30 relative bottom-8">
        {/* Mail */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-5 bg-[#F2F2F2] px-6 py-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 w-[198] h-[62] justify-start">
            <img src={MailIcon} alt="Mail" className="w-8 h-8" />
            <p className="font-semibold text-lg ">Mail us</p>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center mr-5">
            24 hours response time
          </p>
        </div>

        {/* Chat */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-5 bg-[#F2F2F2] px-6 py-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 w-[198] h-[62] justify-start">
            <img src={ChatIcon} alt="Chat" className="w-8 h-8 " />
            <p className="font-semibold text-lg ml-2">Start Chat</p>
          </div>
          <p className="text-start text-gray-600 mt-2 mr-5"> 
            24 hours response time
          </p>
        </div>

        {/* Call */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-5 bg-[#F2F2F2] px-6 py-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 w-[198] h-[62] justify-start">
            <img src={CallIcon} alt="Call" className="w-8 h-8"/>
            <p className="font-semibold text-lg">Start Chat</p>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-start">
            9:00 am - 6:00 pm
          </p>
        </div>
      </div>

      {/* Community Section */}
      <div className="text-left mb-6">
        <h2 className="font-semibold text-2xl mb-1">Join Our Community</h2>
        <p className="text-gray-600 text-base font-medium">Choose your social network</p>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap gap-20 mb-8 ml-5">
        {[InstaIcon, FBIcon, PinterestIcon, YouTubeIcon, LinkedinIcon, TwitterIcon, OperaIcon].map(
          (icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Social Logo"
              className="w-8 h-8 sm:w-8 sm:h-8 hover:scale-110 transition-transform"
            />
          )
        )}
      </div>

      {/* Contact Form */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-5  max-w-5xl ml-5">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="Mobile"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="Subject"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          rows="4"
          placeholder="Care to tell us more"
          className="sm:col-span-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
        <div className="sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
