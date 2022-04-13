import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();
  async function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    if (!enteredEmail || !enteredEmail.includes("@")) {
      return;
    }
    let res;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });
    try {
      res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      notificationCtx.showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter!",
        status: "success",
      });
    } catch (err) {
      notificationCtx.showNotification({
        title: "Error!",
        message: err.message || "Something went wrong",
        status: "error",
      });
    }

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            ref={emailInputRef}
            aria-label="Your email"
            required
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
