"use client";
import { useState } from "react";
import Image from "next/image";

const Page = ()=> {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    // Here, you'd typically send the form data to your server or an email service
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Location Image with Link */}
      <div className="relative mb-8 w-full h-60 md:h-80">
        <a
          href="https://www.google.com/maps/place/Sri+SK+Home+Appliances/@11.0358762,76.9733407,17z/data=!4m6!3m5!1s0x3ba8594c09d98b1d:0x1c4b37879883ee5!8m2!3d11.0358762!4d76.9759156!16s%2Fg%2F11k3qvvwf9?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          title="Get Directions"
        >
          <Image
            src="/company.webp" // Replace with your image
            alt="Location"
            layout="fill"
            objectFit="cover"
            className="rounded-lg cursor-pointer shadow-lg hover:opacity-90 transition-opacity duration-300"
          />
        </a>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Contact Us</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Get in Touch</h2>
            <p>Feel free to reach out for any inquiries or assistance.</p>
            <p><strong>Address:</strong> 123 Your Street, Your City, Your Country</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Email:</strong> contact@yourcompany.com</p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Page;