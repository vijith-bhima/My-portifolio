
//--Some background animations and some effects are developed eith help of AI 

// ===== CUSTOM CURSOR =====
      const cursorDot = document.querySelector(".cursor-dot");
      const cursorOutline = document.querySelector(".cursor-outline");

      let mouseX = 0,
        mouseY = 0;
      let outlineX = 0,
        outlineY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
      });

      function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + "px";
        cursorOutline.style.top = outlineY + "px";

        requestAnimationFrame(animateOutline);
      }
      animateOutline();

      // Expand cursor on hover
      document.querySelectorAll("a, button, .portfolio-item").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursorDot.style.transform = "scale(2)";
          cursorOutline.style.transform = "scale(1.5)";
        });
        el.addEventListener("mouseleave", () => {
          cursorDot.style.transform = "scale(1)";
          cursorOutline.style.transform = "scale(1)";
        });
      });

      // ===== TYPING ANIMATION =====
      const typingName = document.querySelector(".typing-name");
      const text = "Bhima Vijith";
      let index = 0;

      function typeWriter() {
        if (index < text.length) {
          typingName.textContent = text.substring(0, index + 1);
          index++;
          setTimeout(typeWriter, 150);
        } else {
          setTimeout(() => {
            typingName.style.borderRight = "none";
          }, 500);
        }
      }

      setTimeout(() => {
        typingName.textContent = "";
        typingName.style.borderRight = "3px solid #667eea";
        typingName.style.opacity = "1";
        typeWriter();
      }, 1000);

      // ===== PARALLAX SCROLLING =====
      let scrollY = 0;

      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;

        // Parallax for hero photo
        const heroPhoto = document.querySelector(".photo-frame");
        if (heroPhoto) {
          heroPhoto.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Parallax for portfolio items
        document.querySelectorAll(".portfolio-item").forEach((item, index) => {
          const speed = index % 2 === 0 ? 0.1 : -0.1;
          const rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.style.transform = `translateY(${scrollY * speed}px)`;
          }
        });

        // Parallax for background
        const canvas = document.getElementById("canvas3d");
        canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
      });

      // ===== MOUSE TRAIL PARTICLES =====
      const trailParticles = [];
      const maxTrailParticles = 20;

      class TrailParticle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 5 + 2;
          this.speedX = (Math.random() - 0.5) * 2;
          this.speedY = (Math.random() - 0.5) * 2;
          this.life = 1;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.life -= 0.02;
          this.size *= 0.95;
        }

        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(102, 126, 234, ${this.life})`;
          ctx.fill();
        }
      }

      document.addEventListener("mousemove", (e) => {
        if (trailParticles.length < maxTrailParticles) {
          trailParticles.push(new TrailParticle(e.clientX, e.clientY));
        }
      });

      // 3D Canvas Animation
      const canvas = document.getElementById("canvas3d");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.z = Math.random() * 1500;
          this.size = Math.random() * 2 + 1;
          this.speedZ = Math.random() * 2 + 1;
          this.speedX = 0;
          this.speedY = 0;
        }

        update() {
          this.z -= this.speedZ;
          if (this.z <= 0) this.reset();

          this.x += this.speedX;
          this.y += this.speedY;
        }

        draw() {
          const scale = 1500 / this.z;
          const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
          const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
          const size2d = this.size * scale;
          const opacity = (1500 - this.z) / 1500;

          ctx.beginPath();
          ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(102, 126, 234, ${opacity * 0.8})`;
          ctx.fill();
        }
      }

      const particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }

      // Mouse interaction with particles
      document.addEventListener("mousemove", (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        particles.forEach((particle) => {
          particle.speedX = mouseX * 0.5;
          particle.speedY = mouseY * 0.5;
        });
      });

      function animate() {
        ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        // Draw trail particles
        for (let i = trailParticles.length - 1; i >= 0; i--) {
          trailParticles[i].update();
          trailParticles[i].draw(ctx);
          if (trailParticles[i].life <= 0) {
            trailParticles.splice(i, 1);
          }
        }

        requestAnimationFrame(animate);
      }

      animate();

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            // Page transition effect
            document.body.style.overflow = "hidden";
            const overlay = document.createElement("div");
            overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.3s;
                    `;
            document.body.appendChild(overlay);

            setTimeout(() => (overlay.style.opacity = "1"), 10);

            setTimeout(() => {
              target.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => {
                overlay.style.opacity = "0";
                setTimeout(() => {
                  document.body.removeChild(overlay);
                  document.body.style.overflow = "auto";
                }, 300);
              }, 500);
            }, 300);
          }
        });
      });

      // Form submission
      document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Success animation
          const btn = this.querySelector(".btn-primary");
          btn.textContent = "✓ Sending...";
          btn.style.background = "linear-gradient(135deg, #00c853, #64dd17)";

          setTimeout(() => {
            alert(
              "Thank you for your message! I will get back to you within 24 hours.",
            );
            btn.textContent = "Send Message";
            btn.style.background =
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            this.reset();
          }, 1500);
        });

      // Portfolio item interactions with 3D tilt
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.addEventListener("mousemove", (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
        });

        item.addEventListener("mouseleave", () => {
          item.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
        });

        item.addEventListener("click", function () {
          const title = this.querySelector("h3").textContent;

          // Add click animation
          this.style.transform = "scale(0.95)";
          setTimeout(() => {
            this.style.transform = "";
          }, 200);

          alert(
            `source code for "${title}" will open in GitHub.`,
          );
        });
      });

      // Magnetic effect for buttons
      document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "translate(0, 0)";
        });
      });

      // Scroll reveal animation
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, observerOptions);

      // Observe about section
      const aboutContent = document.querySelector(".about-content");
      if (aboutContent) {
        aboutContent.style.opacity = "0";
        aboutContent.style.transform = "translateY(30px)";
        aboutContent.style.transition = "all 0.8s ease";
        observer.observe(aboutContent);
      }

      // Hide loading screen on page load
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.querySelector(".page-transition").style.display = "none";
        }, 1500);
      });