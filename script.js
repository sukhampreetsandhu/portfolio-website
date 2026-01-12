let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

(function () {
  emailjs.init("ZuvrCPIwsufChqZWG");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_h3vfbym",
    "template_6og8v1d",
    this
  ).then(
    function () {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    },
    function (error) {
      alert("Failed to send message. Please try again.");
      console.log(error);
    }
  );
});
