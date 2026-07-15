"use client";

import Script from "next/script";

declare global {
  interface Window {
    FlutterwaveCheckout: (payload: object) => null;
  }
}

export default function Checkout() {
  return (
    <div className="App">
      <Script src="https://checkout.flutterwave.com/v3.js"></Script>
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          window.FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-1ea28c499a322bc644a73047a2d9fd12-X",
            tx_ref: `tx-${Date.now()}`,
            amount: 2500,
            currency: "NGN",
            payment_options: "card",
            redirect_url: "localhost:8080/card-transfer",
            customer: {
              email: "user@example.com",
              name: "John Doe",
            },
            customizations: {
              title: "My Next.js Store",
            },
            callback: function (data: unknown) {
              console.log("Payment success details:", data);
              // Send data.transaction_id to your API route for verification
            },
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}

// FLWPUBK_TEST-1ea28c499a322bc644a73047a2d9fd12-X
