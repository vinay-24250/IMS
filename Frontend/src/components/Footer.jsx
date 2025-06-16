import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-800 h-20">
        <footer class="bg-gray-800 text-white text-center p-6 ">
          <div class="max-w-4xl mx-auto">
            <p class="text-sm mb-2">
              <strong>About Us:</strong> Our Inventory Management System helps
              businesses track stock, manage suppliers, and optimize operations
              efficiently.
            </p>
            <p class="text-sm">
              <a href="/About" class="hover:underline">
                About
              </a>{" "}
              |
              <a href="/PrivacyPolicy" class="hover:underline">
                Privacy Policy
              </a>{" "}
              |
              <a href="/TermsOfService" class="hover:underline">
                Terms of Service
              </a>{" "}
              |
              <a href="/ContactUs" class="hover:underline">
                Contact Us
              </a>
            </p>
            <p class="text-xs mt-2">
              &copy; 2025 Inventory Management System. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
