document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          
          // Toggle icon representation slightly based on state
          if (navMenu.classList.contains("active")) {
              mobileMenuBtn.innerHTML = "✕"; // Close icon
          } else {
              mobileMenuBtn.innerHTML = "☰"; // Hamburger icon
          }
      });
  }

  // Create overlay for modal
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);

  const orderBtns = document.querySelectorAll('.order-reveal-btn');
  let activeOptions = null;

  function closeModal() {
    if (activeOptions) {
      activeOptions.classList.remove('active');
      overlay.classList.remove('active');
      // Find the button that opened this to restore it if needed, though with popup we don't hide the button anymore
      activeOptions = null;
    }
  }

  overlay.addEventListener('click', closeModal);

  orderBtns.forEach(btn => {
    // Move the options element to the body to prevent CSS transform clipping issues
    const options = btn.parentElement.querySelector('.order-options');
    if (options) {
      document.body.appendChild(options);
      btn._optionsModal = options;
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const targetOptions = this._optionsModal;
      if (targetOptions) {
        targetOptions.classList.add('active');
        overlay.classList.add('active');
        activeOptions = targetOptions;

        // Add close button if not exists
        if (!targetOptions.querySelector('.close-modal')) {
          const closeBtn = document.createElement('span');
          closeBtn.innerHTML = '&times;';
          closeBtn.className = 'close-modal';
          closeBtn.onclick = closeModal;
          targetOptions.appendChild(closeBtn);
        }
      }
    });
  });
});
