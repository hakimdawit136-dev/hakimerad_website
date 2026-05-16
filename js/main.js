/**
 * HakimeRAD Website JavaScript
 * Main functionality for the HakimeRAD website
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initAccordions();
  initPricingToggle();
  initSmoothScrolling();
  initAnimations();
  initLazyLoading();
  initVideoBackground();
  initTestimonialCarousel();
  initThemeSwitcher();
  initStatsCounter();
  initBlogFilters();
  initForms();
  setActiveNavLink();
});

/**
 * Theme Switcher Functionality
 */
function initThemeSwitcher() {
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(event) {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.add(currentTheme + '-mode');

            if (currentTheme === 'dark') {
                themeSwitch.checked = true;
                document.body.classList.add('dark-mode');
            }
        }
    }
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.innerText, 10);
                    let current = 0;
                    const increment = Math.ceil(target / 100);

                    const update = () => {
                        current += increment;
                        if (current < target) {
                            el.innerText = current + (el.innerText.includes('%') || el.innerText.includes('+') ? el.innerText.slice(-1) : '');
                            requestAnimationFrame(update);
                        } else {
                            el.innerText = target + (el.innerText.includes('%') || el.innerText.includes('+') ? el.innerText.slice(-1) : '');
                        }
                    };
                    update();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
}

/**
 * Blog Filtering Functionality
 */
function initBlogFilters() {
    const searchInput = document.getElementById('blog-search');
    const categorySelect = document.getElementById('category-select');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput && categorySelect && blogCards.length > 0) {
        function filterPosts() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categorySelect.value;

            blogCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const category = card.querySelector('.blog-category').innerText.toLowerCase().replace(/ /g, '-');
                
                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        searchInput.addEventListener('keyup', filterPosts);
        categorySelect.addEventListener('change', filterPosts);
    }
}

/**
 * Mobile Menu Functionality with Accessibility Enhancements
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn button');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      const expanded = nav.classList.contains('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Update ARIA attributes
      mobileMenuBtn.setAttribute('aria-expanded', !expanded);
      
      // If menu is now open, focus on the first menu item
      if (!expanded) {
        setTimeout(() => {
          const firstNavLink = navLinks[0];
          if (firstNavLink) firstNavLink.focus();
        }, 100);
      }
    });
  }
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Update ARIA attributes
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Update ARIA attributes
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Add keyboard navigation support
  document.addEventListener('keydown', function(event) {
    // Close menu on Escape key
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Update ARIA attributes
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus();
      }
    }
  });
}

/**
 * FAQ Accordion Functionality with Accessibility Enhancements
 */
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      // Add ARIA attributes
      const id = `faq-answer-${index}`;
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('aria-controls', id);
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      
      answer.setAttribute('id', id);
      answer.setAttribute('aria-hidden', 'true');
      answer.setAttribute('role', 'region');
      
      // Handle click events
      question.addEventListener('click', function() {
        toggleAccordion(item, question, answer);
      });
      
      // Handle keyboard events
      question.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleAccordion(item, question, answer);
        }
      });
    }
  });
  
  function toggleAccordion(item, question, answer) {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Toggle current item
    item.classList.toggle('active');
    question.setAttribute('aria-expanded', !isExpanded);
    answer.setAttribute('aria-hidden', isExpanded);
    
    // Close other items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        
        otherItem.classList.remove('active');
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/**
 * Pricing Toggle Functionality with Accessibility Enhancements
 */
function initPricingToggle() {
  const pricingToggle = document.querySelector('.pricing-toggle input');
  const monthlyPrices = document.querySelectorAll('.amount.monthly');
  const annuallyPrices = document.querySelectorAll('.amount.annually');
  const monthlyLabel = document.querySelector('.pricing-toggle .monthly-label');
  const annuallyLabel = document.querySelector('.pricing-toggle .annually-label');
  
  if (pricingToggle) {
    // Add ARIA attributes
    pricingToggle.setAttribute('aria-labelledby', 'pricing-toggle-label');
    pricingToggle.setAttribute('role', 'switch');
    pricingToggle.setAttribute('aria-checked', pricingToggle.checked ? 'true' : 'false');
    
    // Add keyboard support
    pricingToggle.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pricingToggle.checked = !pricingToggle.checked;
        pricingToggle.dispatchEvent(new Event('change'));
      }
    });
    
    pricingToggle.addEventListener('change', function() {
      // Update ARIA attributes
      pricingToggle.setAttribute('aria-checked', pricingToggle.checked ? 'true' : 'false');
      
      // Update active state for labels
      if (monthlyLabel && annuallyLabel) {
        if (pricingToggle.checked) {
          monthlyLabel.classList.remove('active');
          annuallyLabel.classList.add('active');
        } else {
          monthlyLabel.classList.add('active');
          annuallyLabel.classList.remove('active');
        }
      }
      if (this.checked) {
        // Show annual prices
        monthlyPrices.forEach(price => price.style.display = 'none');
        annuallyPrices.forEach(price => price.style.display = 'block');
      } else {
        // Show monthly prices
        monthlyPrices.forEach(price => price.style.display = 'block');
        annuallyPrices.forEach(price => price.style.display = 'none');
      }
    });
  }
}

/**
 * Smooth Scrolling for Anchor Links with Accessibility Enhancements
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    // Add ARIA attributes
    const targetId = link.getAttribute('href').substring(1);
    link.setAttribute('aria-describedby', `desc-${targetId}`);
    
    // Create hidden description for screen readers
    const srDescription = document.createElement('span');
    srDescription.id = `desc-${targetId}`;
    srDescription.className = 'sr-only';
    srDescription.textContent = `Navigates to ${targetId.replace(/-/g, ' ')} section`;
    link.appendChild(srDescription);
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Set focus to the target element or a focusable child
        setTimeout(() => {
          // Try to find a focusable element within the target
          const focusableElement = targetElement.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
          
          if (focusableElement) {
            focusableElement.focus();
          } else {
            // Make the target temporarily focusable if it doesn't contain focusable elements
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            
            // Remove tabindex after blur
            targetElement.addEventListener('blur', function onBlur() {
              targetElement.removeAttribute('tabindex');
              targetElement.removeEventListener('blur', onBlur);
            });
          }
        }, 1000); // Wait for scroll to complete
      }
    });
  });
}

/**
 * Initialize Animations
 * Uses Intersection Observer for scroll-based animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate, .fade-in, .slide-in, .feature-card, .testimonial');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((element, index) => {
      // Add staggered delay for elements like feature cards
      if (element.classList.contains('feature-card') || element.classList.contains('testimonial')) {
        element.style.transitionDelay = `${index * 0.1}s`;
      }
      observer.observe(element);
    });
  }
}

/**
 * Initialize lazy loading for images and other media
 */
function initLazyLoading() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src], img:not([loading])');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // If using data-src attribute
          if (img.dataset.src) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
          }
          
          // Add loading="lazy" attribute if not present
          if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px' // Start loading images when they are 200px from viewport
    });
    
    lazyImages.forEach(function(img) {
      // Skip images that are already in the viewport
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // For images already in viewport, load immediately
        if (img.dataset.src) {
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
        }
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        img.classList.add('loaded');
      } else {
        // For images not in viewport, observe them
        imageObserver.observe(img);
      }
    });
    
    // Lazy load background images
    const lazyBackgrounds = document.querySelectorAll('[data-background]');
    
    const bgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.backgroundImage = `url(${element.dataset.background})`;
          element.classList.add('loaded');
          bgObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '200px'
    });
    
    lazyBackgrounds.forEach(function(bg) {
      bgObserver.observe(bg);
    });
    
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let lazyImages = document.querySelectorAll('img[data-src]');
    let lazyBackgrounds = document.querySelectorAll('[data-background]');
    let active = false;
    
    const lazyLoad = function() {
      if (active === false) {
        active = true;
        
        setTimeout(function() {
          // Handle images
          lazyImages.forEach(function(img) {
            if ((img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) && getComputedStyle(img).display !== 'none') {
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              if (!img.getAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
              }
              img.classList.add('loaded');
              
              lazyImages = Array.from(lazyImages).filter(function(image) {
                return image !== img;
              });
            }
          });
          
          // Handle background images
          lazyBackgrounds.forEach(function(bg) {
            if ((bg.getBoundingClientRect().top <= window.innerHeight && bg.getBoundingClientRect().bottom >= 0) && getComputedStyle(bg).display !== 'none') {
              bg.style.backgroundImage = `url(${bg.dataset.background})`;
              bg.classList.add('loaded');
              
              lazyBackgrounds = Array.from(lazyBackgrounds).filter(function(item) {
                return item !== bg;
              });
            }
          });
          
          if (lazyImages.length === 0 && lazyBackgrounds.length === 0) {
            document.removeEventListener('scroll', lazyLoad);
            window.removeEventListener('resize', lazyLoad);
            window.removeEventListener('orientationchange', lazyLoad);
          }
          
          active = false;
        }, 200);
      }
    };
    
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
    lazyLoad();
  }
  
  // Add loading="lazy" to all images that don't have it
  document.querySelectorAll('img:not([loading])').forEach(img => {
    if (!img.closest('.hero')) { // Skip hero images as they should load immediately
      img.setAttribute('loading', 'lazy');
    }
  });
}

/**
 * Initialize video background
 */
function initVideoBackground() {
  const videoBackground = document.querySelector('.hero-video-bg');
  
  if (videoBackground) {
    // Check if it's a mobile device with screen width less than 768px
    if (window.innerWidth < 768) {
      // On mobile, use a static image instead of video for better performance
      const videoElement = videoBackground.querySelector('video');
      if (videoElement) {
        const imgElement = document.createElement('img');
        imgElement.src = 'img/hero-bg-mobile.jpg'; // Fallback image for mobile
        imgElement.alt = 'Healthcare background';
        imgElement.classList.add('hero-img-bg');
        videoElement.parentNode.replaceChild(imgElement, videoElement);
      }
    } else {
      // On desktop, load the video
      const videoElement = videoBackground.querySelector('video');
      if (videoElement) {
        videoElement.play().catch(error => {
          console.log('Auto-play was prevented:', error);
          // Add a play button if autoplay is blocked
          const playButton = document.createElement('button');
          playButton.innerHTML = '<i class="fas fa-play"></i>';
          playButton.classList.add('video-play-btn');
          videoBackground.appendChild(playButton);
          
          playButton.addEventListener('click', () => {
            videoElement.play();
            playButton.style.display = 'none';
          });
        });
      }
    }
  }
}

/**
 * Testimonial Carousel
 * Initialize if testimonials section exists
 */
function initTestimonialCarousel() {
  const testimonialSlider = document.querySelector('.testimonials-slider');
  
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    // Only initialize carousel if there are more than 3 testimonials or on mobile
    if (testimonials.length > 3 || window.innerWidth < 768) {
      // Add navigation buttons
      const navButtons = document.createElement('div');
      navButtons.classList.add('testimonial-nav');
      navButtons.innerHTML = `
        <button class="prev-btn" aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
        <button class="next-btn" aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
      `;
      testimonialSlider.parentNode.appendChild(navButtons);
      
      // Add dots navigation
      const dotsContainer = document.createElement('div');
      dotsContainer.classList.add('testimonial-dots');
      
      for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
      }
      
      testimonialSlider.parentNode.appendChild(dotsContainer);
      
      // Add event listeners to buttons
      const prevBtn = navButtons.querySelector('.prev-btn');
      const nextBtn = navButtons.querySelector('.next-btn');
      
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
      
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
      
      // Function to go to a specific slide
      function goToSlide(index) {
        // Handle wrapping around
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;
        
        currentIndex = index;
        
        // Update the active dot
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
          if (i === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
        
        // On mobile, show only one testimonial at a time
        if (window.innerWidth < 768) {
          testimonials.forEach((testimonial, i) => {
            if (i === currentIndex) {
              testimonial.style.display = 'block';
              testimonial.style.opacity = '0';
              setTimeout(() => {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateY(0)';
              }, 50);
            } else {
              testimonial.style.opacity = '0';
              testimonial.style.transform = 'translateY(20px)';
              setTimeout(() => {
                testimonial.style.display = 'none';
              }, 300);
            }
          });
        } else {
          // On desktop, use CSS transform to slide the container
          testimonialSlider.style.transition = 'transform 0.5s ease';
          const slideAmount = currentIndex * -100 / testimonials.length;
          testimonialSlider.style.transform = `translateX(${slideAmount}%)`;
        }
      }
      
      // Initialize mobile view if needed
      if (window.innerWidth < 768) {
        testimonials.forEach((testimonial, i) => {
          if (i !== 0) testimonial.style.display = 'none';
        });
      }
      
      // Add CSS for the slider
      const style = document.createElement('style');
      style.textContent = `
        .testimonial-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .testimonial-nav button {
          background-color: white;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-nav button:hover {
          background-color: var(--primary-color);
          color: white;
        }
        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .testimonial-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .testimonial-dots .dot.active {
          background-color: var(--primary-color);
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .testimonials-slider {
            display: block;
          }
          .testimonial {
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Auto-advance the carousel every 5 seconds
      let autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
      
      // Pause autoplay on hover
      testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
          testimonials.forEach((testimonial, i) => {
            if (i === currentIndex) {
              testimonial.style.display = 'block';
            } else {
              testimonial.style.display = 'none';
            }
          });
        } else {
          testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
            testimonial.style.opacity = '1';
            testimonial.style.transform = 'translateY(0)';
          });
          const slideAmount = currentIndex * -100 / testimonials.length;
          testimonialSlider.style.transform = `translateX(${slideAmount}%)`;
        }
      });
    }
  }
}

/**
 * Form Validation
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      input.classList.add('error');
      
      // Add error message if it doesn't exist
      let errorMessage = input.nextElementSibling;
      if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'This field is required';
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
      }
    } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
      
      // Add error message if it doesn't exist
      let errorMessage = input.nextElementSibling;
      if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a valid email address';
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
      }
    } else {
      input.classList.remove('error');
      
      // Remove error message if it exists
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
      }
    }
  });
  
  return isValid;
}

/**
 * Validate Email
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
  const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Handle Form Submission
 * @param {HTMLFormElement} form - The form to handle
 */
function handleFormSubmit(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(form)) {
      // Show loading state
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        // Show success message
        form.reset();
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Your message has been sent successfully!';
        form.appendChild(successMessage);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 1500);
    }
  });
}

/**
 * Initialize all forms with validation
 */
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    handleFormSubmit(form);
  });
}

// Call initForms when DOM is loaded
document.addEventListener('DOMContentLoaded', initForms);

/**
 * Add active class to current page in navigation
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (currentPage === linkPage || 
        (currentPage === '' && linkPage === 'index.html') || 
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Set active nav link when DOM is loaded
document.addEventListener('DOMContentLoaded', setActiveNavLink);
