const demoForm = document.querySelector("#demo-form");
const formStatus = document.querySelector("#form-status");

demoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = demoForm.elements.name.value.trim();
  const email = demoForm.elements.email.value.trim();

  if (!name || !email || !demoForm.elements.email.checkValidity()) {
    formStatus.textContent = "Enter your name and a valid email address so we can reach you.";
    formStatus.className = "flash error";
    formStatus.hidden = false;
    return;
  }

  const submitButton = demoForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(demoForm.action, {
      method: "POST",
      body: new FormData(demoForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    formStatus.textContent = "Thanks. We'll contact you to book your 30-minute demo.";
    formStatus.className = "flash ok";
    demoForm.reset();
  } catch (error) {
    formStatus.textContent = "We couldn't send your request. Please try again.";
    formStatus.className = "flash error";
  } finally {
    formStatus.hidden = false;
    submitButton.disabled = false;
    submitButton.innerHTML = 'Request a demo <span aria-hidden="true">&#8594;</span>';
  }
});
