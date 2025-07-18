document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.id = 'invitation-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div id="modal-message"></div>
        </div>
        <canvas id="fireworks-canvas"></canvas>
    `;
    document.body.appendChild(modal);

    // Функция для обновления списка гостей
    function updateGuestList() {
        try {
            const guests = JSON.parse(localStorage.getItem('birthdayGuests')) || [];
            const guestList = document.getElementById('guest-list');
            const guestCount = document.getElementById('guest-count');
            
            if (guests.length === 0) {
                guestList.innerHTML = '<p class="typewriter">$ Нет приглашенных гостей.</p>';
            } else {
                guestList.innerHTML = '';
                guests.forEach(guest => {
                    const guestItem = document.createElement('div');
                    guestItem.className = 'guest-item';
                    guestItem.innerHTML = `
                        <span class="guest-name clickable">${guest.firstName} ${guest.lastName}</span>
                    `;
                    
                    // Добавляем обработчик клика
                    const nameElement = guestItem.querySelector('.clickable');
                    nameElement.addEventListener('click', () => {
                        showInvitation(guest);
                    });
                    
                    guestList.appendChild(guestItem);
                });
            }
            
            // Обновляем счетчик гостей
            guestCount.textContent = `$ Всего приглашено: ${guests.length}`;
        } catch (error) {
            console.error('Ошибка загрузки гостей:', error);
            const guestList = document.getElementById('guest-list');
            guestList.innerHTML = '<p class="typewriter error">$ Ошибка загрузки списка гостей.</p>';
        }
    }

    // Функция показа приглашения с эффектом салюта
    function showInvitation(guest) {
        const modal = document.getElementById('invitation-modal');
        const message = document.getElementById('modal-message');
        
        message.innerHTML = `
            <h3>Приглашение для ${guest.firstName} ${guest.lastName}</h3>
            <p>${guest.message}</p>
            <p>Дата: 24.07.2025</p>
            <p>Место: ТРЦ Эпицентр, Боулинг</p>
            <p>Время: 15:30</p>
            <p>Дресс-код: Коктейльный</p>
        `;
        
        modal.style.display = 'block';
        startFireworks();
    }

    // Закрытие модального окна
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('invitation-modal').style.display = 'none';
        stopFireworks();
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('invitation-modal')) {
            document.getElementById('invitation-modal').style.display = 'none';
            stopFireworks();
        }
    });

    // Функции для эффекта салюта
    let fireworksInterval;
    function startFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const fireworks = [];
        
        function Firework() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height / 2;
            this.speed = 2 + Math.random() * 3;
            this.radius = 1 + Math.random() * 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.particles = [];
            this.exploded = false;
            
            this.update = function() {
                if (!this.exploded) {
                    this.y -= this.speed;
                    
                    if (this.y <= this.targetY) {
                        this.explode();
                    }
                }
                
                for (let i = 0; i < this.particles.length; i++) {
                    const p = this.particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.05;
                    p.alpha -= 0.01;
                    
                    if (p.alpha <= 0) {
                        this.particles.splice(i, 1);
                        i--;
                    }
                }
            };
            
            this.explode = function() {
                this.exploded = true;
                for (let i = 0; i < 100; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 5;
                    this.particles.push({
                        x: this.x,
                        y: this.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: this.color,
                        alpha: 1,
                        radius: Math.random() * 2
                    });
                }
            };
            
            this.draw = function() {
                if (!this.exploded) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
                
                for (let i = 0; i < this.particles.length; i++) {
                    const p = this.particles[i];
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            };
        }
        
        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if (Math.random() < 0.05) {
                fireworks.push(new Firework());
            }
            
            for (let i = 0; i < fireworks.length; i++) {
                fireworks[i].update();
                fireworks[i].draw();
                
                if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
                    fireworks.splice(i, 1);
                    i--;
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        fireworksInterval = setInterval(() => {
            fireworks.push(new Firework());
        }, 500);
    }
    
    function stopFireworks() {
        clearInterval(fireworksInterval);
        const canvas = document.getElementById('fireworks-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Первоначальная загрузка списка
    updateGuestList();
    
    // Анимация загрузки
    setTimeout(() => {
        document.querySelectorAll('.typewriter').forEach(el => {
            el.style.whiteSpace = 'normal';
        });
    }, 3000);
});