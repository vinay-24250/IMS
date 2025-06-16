import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 text-center min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h2>
        
        <div className="text-left space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">1. Information We Do Not Collect</h3>
          <p className="text-gray-600">We do not collect personal data such as names, emails, or payment details.</p>

          <h3 className="text-xl font-semibold text-gray-700">2. Data We May Collect</h3>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Cookies & Tracking Technologies</li>
            <li>Device & Browser Information</li>
            <li>Usage Data (pages visited, interactions, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700">3. How We Use Collected Data</h3>
          <p className="text-gray-600">We use data to improve website functionality, monitor traffic, and enhance user experience. No data is sold or shared.</p>

          <h3 className="text-xl font-semibold text-gray-700">4. Cookies & Tracking</h3>
          <p className="text-gray-600">We may use cookies or third-party analytics tools. You can disable cookies in your browser settings.</p>


          <h3 className="text-xl font-semibold text-gray-700">7. Changes to This Privacy Policy</h3>
          <p className="text-gray-600">We may update this policy. Changes will be posted here with an updated "Effective Date."</p>

          <h3 className="text-xl font-semibold text-gray-700">8. Contact Us</h3>
          <p className="text-gray-600">If you have any questions, contact us at <strong>[Your Contact Information]</strong>.</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
