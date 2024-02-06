import { functions } from "../functions/functions_index.js";

export const submitTimeListener = () => {
  $(".enter-time").on("click", function (e) {
    e.preventDefault();
    const orderId = $(this).parent().siblings(".orderID").attr("id")
    let time = $(this).siblings(".timeInput").val();
    time = functions.formatTimeAmPm(time);
    const data = { orderId, timeInput: time };
    console.log("data", data);

    const successMessage = `Estimated time submitted: ${time}`;
    const successMessageElement = $("<div>")
      .addClass("success-message")
      .text(successMessage);
    $.post({
      url: "/api/estimated-time",
      method: "POST",
      data,
      success: (result) => {
        // Clear the estimated time

        // Display success message at the top
        $(this).parent().prepend(successMessageElement);
        $(this).siblings(".timeInput").val("");

        $.ajax({
          url: "/api/estimated-time/send-twilio-estimated-time-text",
          method: "POST",
          data: { time },
          success: function (response) {
            console.log("Twilio text sent:", response);
          },
          error: function (error) {
            console.error("Error sending Twilio text:", error);
          },
        });
      },
      error: function (err) {
        console.log("Error posting estimated time. ", err.responseText);
      },
    });
  });
};
