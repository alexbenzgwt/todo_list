import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.mobile.trim()) newErrors.mobile = "Please enter your mobile number.";
    else if (formData.mobile.length < 10)
      newErrors.mobile = "Mobile number must be at least 10 digits.";

    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Your message has been sent successfully!");
      console.log("Form Data:", formData);
      handleReset();
    } else {
      alert("❌ Please fill the above details before submitting.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  const handleMailUs = () => {
    window.location.href = "mailto:support@truedoit.com?subject=Contact%20Support&body=Hi%20Team,";
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center py-10 px-5 sm:px-10 lg:px-10">
      <div className="text-left mb-5 relative bottom-12">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-800">Contact us</h1>
      </div>

      <div className="flex flex-wrap justify-start gap-28 relative bottom-8">
        {[
          {
            icon: MailIcon,
            title: "Mail us",
            note: "24 hours response time",
            action: handleMailUs,
          },
          {
            icon: ChatIcon,
            title: "Start Chat",
            note: "24 hours response time",
            action: () => alert("💬 Chat feature coming soon!"),
          },
          {
            icon: CallIcon,
            title: "Call us",
            note: "9:00 am - 6:00 pm",
            action: () => (window.location.href = "tel:+919999999999"),
          },
        ].map(({ icon, title, note, action }, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              onClick={action}
              className="flex items-center gap-5 bg-[#F2F2F2] px-6 py-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 w-[200px] justify-start cursor-pointer hover:bg-[#1312121e]"
            >
              <img src={icon} alt={title} className="w-8 h-8" />
              <p className="font-semibold text-lg">{title}</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">{note}</p>
          </div>
        ))}
      </div>

      <div className="text-left mb-6">
        <h2 className="font-semibold text-2xl mb-1">Join Our Community</h2>
        <p className="text-gray-600 text-base font-medium">Choose your social network</p>
      </div>

      <div className="flex flex-wrap gap-19 mb-8 ml-5">
        {[
          { icon: InstaIcon, link: "https://www.instagram.com/" },
          { icon: FBIcon, link: "https://www.facebook.com/" },
          { icon: PinterestIcon, link: "https://www.pinterest.com/" },
          { icon: YouTubeIcon, link: "https://www.youtube.com/" },
          { icon: LinkedinIcon, link: "https://www.linkedin.com/" },
          { icon: TwitterIcon, link: "https://x.com/" },
          { icon: OperaIcon, link: "https://www.opera.com/" },
        ].map(({ icon, link }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img src={icon} alt="Social Logo" className="w-8 h-8" />
          </a>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl ml-5"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div className="sm:col-span-2">
          <textarea
            name="message"
            rows="4"
            placeholder="Care to tell us more"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div className="sm:col-span-2 flex justify-end gap-4">
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
