console.log("JS lastet ");

const api_url = "http://127.0.0.1:5000";

document.getElementById("booking-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const servicesSelect = document.getElementById("service");
  const services = Array.from(servicesSelect.selectedOptions).map(
    option => option.value
  );

  const booking = {
    name: document.getElementById("customer_name").value,
    phone: document.getElementById("customer_phone").value,
    barber: document.getElementById("barber_id").value,
    service: services,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    comment: document.getElementById("comment").value
  };

  console.log("Sender booking:", booking);

  try {
    const response = await fetch(api_url + "/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    const data = await response.json();

    document.getElementById("confirmation").textContent = data.message;

    if (response.ok) {
      event.target.reset();
    }

  } catch (error) {
    console.error("Feil ved sending:", error);
    document.getElementById("confirmation").textContent =
      "Kunne ikke koble til serveren";
  }
});
