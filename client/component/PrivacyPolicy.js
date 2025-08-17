export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-lg rounded-2xl mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">🔐 Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Last updated: May 22, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">✅ What We Collect</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Your <strong>name</strong></li>
            <li>Your <strong>email address</strong></li>
            <li>Your <strong>Google ID</strong> (used internally)</li>
            <li>Your <strong>login method</strong> (e.g., Google)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">❌ What We Don’t Collect</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li><strong>No access</strong> to your Google password</li>
            <li><strong>No access</strong> to Gmail, contacts, or files</li>
            <li><strong>No sharing</strong> of your data with third parties</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">🔐 How We Use Your Info</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>To <strong>identify your account</strong> on our platform</li>
            <li>To <strong>personalize your experience</strong></li>
            <li>To <strong>secure your login</strong> using Google authentication</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">🛡️ Security</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>We store your data securely</li>
            <li>We follow best practices for data protection</li>
            <li>Google OAuth 2.0 ensures secure login</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">📞 Questions?</h2>
          <p className="text-gray-600 mt-2">
            Contact us at <a href="mailto:you@example.com" className="text-blue-500 underline">you@example.com</a> if you have any concerns.
          </p>
        </div>
      </section>
    </div>
  );
}
