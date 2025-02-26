import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to News Mosaic! By accessing this website, you agree to comply
        with and be bound by the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Use of the Website</h2>
      <p className="mb-4">
        You must use this website in accordance with all applicable laws and
        regulations. Unauthorized use may give rise to a claim for damages.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website, including articles, graphics, and logos, is
        owned by News Mosaic and protected under copyright laws.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms & Conditions at any time
        without prior notice. Your continued use of the website constitutes
        acceptance of any changes.
      </p>

      <p className="mt-6">If you have any questions, please contact us.</p>
    </div>
  );
};

export default Terms;
