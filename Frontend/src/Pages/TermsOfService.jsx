import React from "react";

const TermsOfService = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 text-center min-h-screen font-[Times-new-Roman]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-sans">Terms of Service</h2>

        <div className="text-left space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">1. Acceptance of Terms</h3>
          <p className="text-gray-600">By accessing and using this website, you agree to comply with these Terms of Service.</p>

          <h3 className="text-xl font-semibold text-gray-700">2. Use of Website</h3>
          <p className="text-gray-600">You agree to use this website for lawful purposes only and will not engage in any activity that disrupts or harms the website.</p>

          <h3 className="text-xl font-semibold text-gray-700">3. Intellectual Property</h3>
          <p className="text-gray-600">All content, logos, and graphics on this site are the property of the website owner and protected by copyright laws.</p>

          <h3 className="text-xl font-semibold text-gray-700">4. Limitation of Liability</h3>
          <p className="text-gray-600">We are not responsible for any damages resulting from the use of this website.</p>

          <h3 className="text-xl font-semibold text-gray-700">5. Modifications</h3>
          <p className="text-gray-600">We reserve the right to modify these Terms of Service at any time. Continued use of the site constitutes agreement to the updated terms.</p>

          <h3 className="text-xl font-semibold text-gray-700">6. Governing Law</h3>
          <p className="text-gray-600">These Terms of Service are governed by the laws of India.</p>

          <h3 className="text-xl font-semibold text-gray-700">7. Contact Us</h3>
          <p className="text-gray-600">If you have any questions about these Terms, contact us at.</p>
          <a type="email" className="text-gray-600">Email: contact@minorproject.com

</a><br />
          <a type="phone" className="text-gray-600">Phone: (123) 456-7890</a>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
