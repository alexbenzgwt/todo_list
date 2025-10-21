import React from 'react'

const Terms = () => {
  return (
     <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Terms of Service
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Last Updated: October 16, 2025
        </p>

        <ol className="list-decimal space-y-6 pl-6">
          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Acceptance of Terms
            </h2>
            <p>
              By creating an account or using this application, you agree to
              comply with and be legally bound by these Terms of Service and our
              Privacy Policy. If you do not agree, you must not use the service.
            </p>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description of Service
            </h2>
            <p>
              DNS ToDoList provides users with an online platform to create,
              manage, and organize daily tasks. The service is provided “as-is”
              and may be modified or discontinued at any time without notice.
            </p>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                You are responsible for maintaining the confidentiality of your
                account.
              </li>
              <li>
                You agree not to use the service for any illegal or unauthorized
                purpose.
              </li>
              <li>
                You must not attempt to gain unauthorized access to other users’
                data or the system.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              User Content
            </h2>
            <p>
              You retain full ownership of your tasks and data. We only store
              and process your data to provide app functionality and never share
              or sell it to others.
            </p>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Limitations of Liability
            </h2>
            <p>
              DNS ToDoList and its developers are not liable for any indirect or
              consequential damages resulting from the use or inability to use
              the service.
            </p>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Modifications to the Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the service at any time without notice. Continued use after
              updates means you accept the revised terms.
            </p>
          </li>

          <li>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a
                href="mailto:support@dnsevents.com"
                className="text-blue-500 hover:underline"
              >
                support@dnsevents.com
              </a>
              .
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};


export default Terms 