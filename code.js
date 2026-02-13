const app = {
    config: {
        // Дата начала отношений (формат: ГГГГ-ММ-ДД)
        startDate: new Date('2022-06-21T00:00:00') 
    },

    init() {
        this.timer.start();
    },

    // 1. Таймер
timer: {
        // Функция для склонения слов (число, [1 форма, 2 форма, 3 форма])
        declension(number, titles) {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[
                (number % 100 > 4 && number % 100 < 20) 
                ? 2 
                : cases[(number % 10 < 5) ? number % 10 : 5]
            ];
        },

        start() {
            this.update();
            setInterval(() => this.update(), 1000);
        },

        update() {
            const now = new Date();
            const diff = now - app.config.startDate;

            // Вычисляем разницу
            const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(daysTotal / 365);
            const daysLeft = daysTotal % 365;
            
            // Исправленная логика: берем прошедшие часы/минуты, а не текущее время
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);

            const container = document.getElementById('timer');
            
            if (container) {
                // Получаем правильные окончания
                const yearLabel = this.declension(years, ['год', 'года', 'лет']);
                const dayLabel = this.declension(daysLeft, ['день', 'дня', 'дней']);
                const hourLabel = this.declension(hours, ['час', 'часа', 'часов']);
                const minLabel = this.declension(minutes, ['минута', 'минуты', 'минут']);

                container.innerHTML = `
                    <div class="timer-card"><div class="text-xl font-bold">${years}</div><div class="text-[10px] uppercase">${yearLabel}</div></div>
                    <div class="timer-card"><div class="text-xl font-bold">${daysLeft}</div><div class="text-[10px] uppercase">${dayLabel}</div></div>
                    <div class="timer-card"><div class="text-xl font-bold">${hours}</div><div class="text-[10px] uppercase">${hourLabel}</div></div>
                    <div class="timer-card"><div class="text-xl font-bold">${minutes}</div><div class="text-[10px] uppercase">${minLabel}</div></div>
                `;
            }
        }
    },

    // 2. Бумажный дом (Секретное досье)
    heist: {
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen;
            const content = document.getElementById('heist-content');
            if (this.isOpen) {
                content.style.maxHeight = "300px"; // Раскрыть
            } else {
                content.style.maxHeight = "0px"; // Скрыть
            }
        }
    },

    // 3. Озеро (Модальное окно с кольцом)
    lake: {
        openOverlay() {
            const overlay = document.getElementById('ring-overlay');
            const content = document.getElementById('ring-content');
            
            overlay.classList.remove('hidden');
            // Небольшая задержка для плавного появления
            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                content.classList.remove('scale-90');
                content.classList.add('scale-100');
            }, 50);

            this.spawnFireflies();
        },
        closeOverlay() {
            const overlay = document.getElementById('ring-overlay');
            const content = document.getElementById('ring-content');

            overlay.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-90');

            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 700);
        },
        spawnFireflies() {
            const container = document.getElementById('fireflies-container');
            if(!container) return;
            
            container.innerHTML = ''; 
            for(let i=0; i<30; i++) {
                const fly = document.createElement('div');
                fly.className = 'firefly';
                fly.style.left = Math.random() * 100 + '%';
                fly.style.top = Math.random() * 100 + '%';
                fly.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(fly);
            }
        }
    },

    // 4. Жабка-Кайдзю
    toad: {
        happiness: 10,
        feed(type) {
            this.happiness += (type === 'city' ? 30 : 15);
            if (this.happiness > 100) this.happiness = 100;
            this.updateUI();
            this.showSpeech(type === 'city' ? "ВКУСНО! РРАРР!" : "Ням-ням! ❤️");
        },
        pet() {
            this.happiness += 5;
            if (this.happiness > 100) this.happiness = 100;
            this.updateUI();
            this.showSpeech("Мур-квак!");
        },
        updateUI() {
            const bar = document.getElementById('happiness-bar');
            const status = document.getElementById('kaiju-status');
            const img = document.getElementById('toad-img');

            if(bar) bar.style.width = this.happiness + '%';
            
            if (!status) return;

            if (this.happiness < 30) {
                status.innerText = "Угроза разрушения Токио!";
                status.className = "text-xs font-bold text-red-600 uppercase animate-pulse";
                if(img) img.style.transform = "scale(0.9)";
            } else if (this.happiness >= 100) {
                status.innerText = "Счастливая булочка";
                status.className = "text-xs font-bold text-green-600 uppercase";
                if(img) img.style.transform = "scale(1.1)";
            } else {
                status.innerText = "Вроде спокоен...";
                status.className = "text-xs font-bold text-yellow-600 uppercase";
                if(img) img.style.transform = "scale(1)";
            }
        },
        showSpeech(text) {
            const el = document.getElementById('toad-speech');
            if(el) {
                el.innerText = text;
                el.style.opacity = 1;
                setTimeout(() => el.style.opacity = 0, 2000);
            }
        }
    },

    // 5. Кофе
    coffee: {
        fill() {
            const liquid = document.getElementById('coffee-liquid');
            const msg = document.getElementById('coffee-msg');
            const steam = document.getElementById('steam');

            if(liquid) liquid.style.height = '85%';
            if(steam) steam.querySelectorAll('span').forEach(s => s.style.opacity = 0.6);
            if(msg) msg.style.opacity = 1;
        }
    },
// 7. офис
office: {
        revealNote() {
            const note = document.getElementById('office-note');
            const spaSection = document.getElementById('spa-section');

            // 1. Показать записку
            if(note) {
                note.style.opacity = 1;
                note.style.zIndex = 20;  
                note.style.transform = "translate(-150%, -80%) rotate(-5deg)";
            }

            // 2. Раскрыть секцию Twin Peaks
            if(spaSection) {
                spaSection.classList.remove('hidden');
                
                // Небольшая задержка для плавности (чтобы сначала браузер отрендерил блок)
                setTimeout(() => {
                    spaSection.classList.remove('opacity-0');
                    
                }, 100);
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});