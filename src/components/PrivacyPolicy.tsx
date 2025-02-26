import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At News Mosaic, we respect your privacy and are committed to protecting
        your personal information. This policy explains how we collect, use, and
        protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p className="mb-4">
        We collect information such as name, email, and browsing data to improve
        our services.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use your information to personalize content, improve user experience,
        and analyze website traffic.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Data Security</h2>
      <p className="mb-4">
        We implement security measures to protect your data from unauthorized
        access or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy, please contact us.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
