(function () {
  function createModal() {
    const wrapper = document.createElement("div");
    wrapper.id = "payment-wrapper";
    wrapper.style = `
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display:flex; justify-content:center; align-items:center;
      z-index: 999999;
    `;

    wrapper.innerHTML = `
      <div style="background:white; padding:20px; border-radius:8px; width:300px;">
        <h3>Enter Card Details</h3>
        <input id="card-number" placeholder="Card Number" style="width:100%; margin-bottom:10px;" />
        <input id="expiry" placeholder="MM/YY" style="width:100%; margin-bottom:10px;" />
        <input id="cvv" placeholder="CVV" style="width:100%; margin-bottom:10px;" />
        <button id="payBtn" style="width:100%; background:green; color:white;">
          Pay
        </button>
      </div>
    `;

    document.body.appendChild(wrapper);
    return wrapper;
  }

  async function startPayment(options) {
    const modal = createModal();

    document.getElementById("payBtn").onclick = async () => {
      const payload = {
        amount: options.amount,
        email: options.email,
        cardNumber: document.getElementById("card-number").value,
        expiry: document.getElementById("expiry").value,
        cvv: document.getElementById("cvv").value,
      };

      // const res = await fetch(options.apiUrl, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // const json = await res.json();
      // alert(json.message);

      // alert(payload); // Placeholder for actual payment processing
      alert("Payment processed for " + payload.amount);

      modal.remove();
    };
  }

  // Expose it globally
  window.PaymentWidget = {
    pay: startPayment,
  };
})();
