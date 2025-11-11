document.getElementById("booking-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const booking = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    const data = await response.json();
    document.getElementById("confirmation").textContent = data.message;
    event.target.reset();
  } catch (error) {
    console.error("Feil ved sending:", error);
  }
});
