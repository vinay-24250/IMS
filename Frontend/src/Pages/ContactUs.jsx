import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400 py-12 px-6 text-center min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">We'd love to hear from you! Reach out to us using the details below.</p>

        <div className="text-left space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Our Address</h3>
          <p className="text-gray-600">1234 Fictional Street, Suite 567</p>
          <p className="text-gray-600">Imaginary City, FA 98765</p>

          <h3 className="text-xl font-semibold text-gray-700">Email</h3>
          <p className="text-gray-600">contact@minorproject.com</p>

          <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
