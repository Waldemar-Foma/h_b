document.addEventListener('DOMContentLoaded', function() {
    // Фиксированный список приглашенных гостей
    const invitedGuests = [
        { firstName: "Татьяна", lastName: "Вдовиченко", message: "Любимая, очень жду тебя на празднике❤❤❤" },
        { firstName: "Макс", lastName: "Устинов", message: "Максимилиан, жду тебя на торжестве в честь моего 18-ти летия!" },
        { firstName: "Макс", lastName: "Медведев", message: "Дружище, жду тебя на празднике, в честь моего 18-ти летия" },
    ];

    // Сохраняем список в localStorage
    localStorage.setItem('birthdayGuests', JSON.stringify(invitedGuests));

    // Анимация загрузки
    setTimeout(() => {
        document.querySelectorAll('.typewriter').forEach(el => {
            el.style.whiteSpace = 'normal';
        });
    }, 7000);
    
    // Случайные эффекты в фоне
    setInterval(() => {
        const effect = document.querySelector('.hacker-effect');
        effect.style.background = repeatingLinearGradientWithRandom();
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
