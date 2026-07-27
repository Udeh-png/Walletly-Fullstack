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
          const tx_refReq = await fetch(
            "http://localhost:8080/api/wallet/generate-tx_ref",
            {
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
            },
          );

          if (tx_refReq.status !== 200) return;

          const tx_ref = (await tx_refReq.json()).txRef;

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
            callback: function (data: {
              transaction_id: string;
              tx_ref: string;
            }) {
              console.log("Payment success details:", data);
              fetch(
                `http://localhost:8080/api/wallet/deposit/initiate?transaction_id=${data.transaction_id}&tx_ref=${tx_ref}`,
                {
                  credentials: "include",
                },
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
// 4187427415564246
