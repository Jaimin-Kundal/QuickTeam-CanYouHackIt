 document.addEventListener('DOMContentLoaded', function() {
      const typewriter = document.getElementById('typewriter-text');
      const words = [
        {text: "Find your team, Build Your Dream.", color: "highlight-black"},
        {text: "No more waiting, start creating.", color: "highlight-pink"},
        {text: "Your vision takes flight, with a team that's just right.", color: "highlight-black"},
        {text: "Ideas are lonely. Find them a crew.", color: "highlight-pink"},
        {text: "Find a mate, innovate.", color: "highlight-black"},
        {text: "Skill to skill, dream to thrill.", color: "highlight-pink"}
      ];

      let wordIndex = 0, charIndex = 0, isDeleting = false;

      function type() {
        const current = words[wordIndex];
        typewriter.style.setProperty('--caret-color', current.color === 'highlight-pink' ? '#fa3c65' : '#23272a');

        if (isDeleting) {
          typewriter.innerHTML = `<span class="${current.color}">${current.text.substring(0, charIndex - 1)}</span>`;
          charIndex--;
        } else {
          typewriter.innerHTML = `<span class="${current.color}">${current.text.substring(0, charIndex + 1)}</span>`;
          charIndex++;
        }

        let speed = isDeleting ? 50 : 70; // faster typing and deleting

        if (!isDeleting && charIndex === current.text.length) {
          isDeleting = true;
          setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 300);
        } else {
          setTimeout(type, speed);
        }
      }

      type();
    });