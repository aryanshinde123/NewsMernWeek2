import React from 'react';

const SubscribePage = () => {
  return (
    <div className="container mx-auto py-3 h-fit">
      <h1 className="text-3xl font-bold text-center mb-4">Subscribe to The Daily News India</h1>
      
      <div className="flex justify-center px-10">
        {/* Subscription Plan */}
        <div className="border p-4 rounded-lg shadow-lg text-center max-w-xs">
          <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
          <p className="text-xl text-gray-700 mb-4">Access to everything, including premium content.</p>
          
          {/* Monthly Plan */}
          <div className="mb-6">
            <p className="text-3xl font-bold mb-4">₹199/month</p>
            <ul className="text-left mb-6">
              <li>Daily News Updates</li>
              <li>Access to National and International News</li>
              <li>Exclusive Premium Articles</li>
              <li>Early Access to Special Reports</li>
            </ul>
            <button className="w-full px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 mb-4">Subscribe Monthly</button>
          </div>

          {/* Yearly Plan with Discount */}
          <div>
            <p className="text-3xl font-bold mb-4">₹2,199/year <span className="text-sm text-gray-500">(Save ₹189)</span></p>
            <ul className="text-left mb-6">
              <li>All Benefits of Monthly Plan</li>
              <li>Additional Discounts and Offers</li>
            </ul>
            <button className="w-full px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">Subscribe Yearly</button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-600">
          Not sure which plan is right for you? <a href="/contact" className="text-blue-600">Contact us</a> for assistance.
        </p>
      </div>
    </div>
  );
};

export default SubscribePage;