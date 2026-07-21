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
        onClick={async () => {
          const tx_ref = await fetch(
            "http://localhost:8080/api/wallet/fund/initiate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                amount: 2500,
              }),
              credentials: "include",
            },
          );

          if (tx_ref.status !== 200) return;
          window.FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-1ea28c499a322bc644a73047a2d9fd12-X",
            tx_ref,
            amount: 2500.0,
            currency: "NGN",
            payment_options: "card",
            meta: {
              batter_id: "234000002746915",
              remember_me: true,
            },
            customer: {
              email: "user@example.com",
              name: "John Doe",
            },
            customizations: {
              title: "My Next.js Store",
            },
            callback: function (data: unknown) {
              console.log("Payment success details:", data);
              fetch(
                `http://localhost:8080/api/app/verify-card-deposit?transaction_id=${data.transaction_id}`,
              );
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
