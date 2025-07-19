document.addEventListener('DOMContentLoaded', function() {
    const invitedGuests = [
        { firstName: "Татьяна", lastName: "Вдовиченко", message: "Любимая, очень жду тебя на празднике❤❤❤" },
        { firstName: "Макс", lastName: "Устинов", message: "Максимилиан, жду тебя на торжестве в честь моего 18-ти летия!" },
        { firstName: "Макс", lastName: "Медведев", message: "Дружище, жду тебя на празднике, в честь моего 18-ти летия" },
    ];

    localStorage.setItem('birthdayGuests', JSON.stringify(invitedGuests));

    function pluralize(number, one, few, many) {
        number = Math.abs(number) % 100;
        const n = number % 10;
        if (number > 10 && number < 20) return many;
        if (n > 1 && n < 5) return few;
        if (n === 1) return one;
        return many;
    }

    function updateCountdown() {
        const birthday = new Date(2025, 6, 24);
        const now = new Date();
        
        if (now > birthday) {
            document.getElementById('countdown').innerHTML = '$ До дня рождения осталось: <span class="highlight">Уже прошел!</span>';
            return;
        }
        
        const diff = birthday - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysText = `${days} ${pluralize(days, 'день', 'дня', 'дней')}`;
        const hoursText = `${hours} ${pluralize(hours, 'час', 'часа', 'часов')}`;
        const minutesText = `${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')}`;
        const secondsText = `${seconds} ${pluralize(seconds, 'секунда', 'секунды', 'секунд')}`;
        
        document.getElementById('countdown').innerHTML = `$ До дня рождения осталось: <span class="highlight">${daysText}, ${hoursText}, ${minutesText}, ${secondsText}</span>`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    setTimeout(() => {
        document.querySelectorAll('.typewriter').forEach(el => {
            el.style.whiteSpace = 'normal';
        });
    }, 7000);
    
    setInterval(() => {
        const effect = document.querySelector('.hacker-effect');
        if (effect) {
            effect.style.background = repeatingLinearGradientWithRandom();
        }
    }, 3000);
});

function repeatingLinearGradientWithRandom() {
    const angle = Math.floor(Math.random() * 360);
    const opacity1 = (Math.random() * 0.2).toFixed(2);
    const opacity2 = (Math.random() * 0.2).toFixed(2);
    const color1 = `rgba(0, 255, 65, ${opacity1})`;
    const color2 = `rgba(0, 255, 65, ${opacity2})`;
    
    return `repeating-linear-gradient(
        ${angle}deg,
        ${color1},
        ${color1} ${Math.floor(Math.random() * 2) + 1}px,
        transparent ${Math.floor(Math.random() * 2) + 1}px,
        transparent ${Math.floor(Math.random() * 3) + 2}px
    )`;
}