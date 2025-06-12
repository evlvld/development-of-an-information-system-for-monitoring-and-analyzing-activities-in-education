(function() {
    'use strict';

    // Функция для определения системной темы
    function getSystemTheme() {
        try {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (error) {
            console.warn('Не удалось определить системную тему:', error);
            return 'light';
        }
    }

    // Функция для проверки контраста текста
    function checkTextContrast() {
        const elements = document.querySelectorAll('body, p, span, div, h1, h2, h3, h4, h5, h6, a, button, input, select, textarea');
        elements.forEach(element => {
            const style = window.getComputedStyle(element);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            console.debug(`Element ${element.tagName}${element.className ? '.' + element.className : ''}: color=${color}, background=${backgroundColor}`);
        });
    }

    // Функция для установки темы
    function setTheme(themeName) {
        try {
            console.debug('Установка темы:', themeName);
            
            // Сохраняем тему
            localStorage.setItem('theme', themeName);
            
            // Добавляем класс для плавного перехода
            document.documentElement.classList.add('theme-transition');
            
            // Устанавливаем тему
            document.documentElement.setAttribute('data-theme', themeName);
            
            // Обновляем цвет фона body
            document.body.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary');
            
            // Обновляем мета-тег theme-color для мобильных браузеров
            const metaThemeColor = document.querySelector("meta[name=theme-color]");
            if (metaThemeColor) {
                metaThemeColor.setAttribute("content", themeName === 'light' ? '#ffffff' : '#1a1a1a');
            }
            
            // Обновляем иконку
            updateThemeIcon(themeName);
            
            // Проверяем контраст текста после небольшой задержки
            setTimeout(() => {
                checkTextContrast();
                console.debug('Текущие CSS переменные:', {
                    textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
                    textSecondary: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
                    bgPrimary: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'),
                    bgSecondary: getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary')
                });
            }, 300);
            
            // Удаляем класс перехода после анимации
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 300);

            console.debug('Тема успешно установлена:', themeName);
        } catch (error) {
            console.error('Ошибка при установке темы:', error);
        }
    }

    // Функция для обновления иконки темы
    function updateThemeIcon(theme) {
        try {
            const icon = document.getElementById('theme-icon');
            if (icon) {
                // Добавляем анимацию
                icon.style.animation = 'none';
                icon.offsetHeight; // Форсируем reflow
                icon.style.animation = 'scaleIn 0.3s ease-out';
                
                // Обновляем иконку
                icon.textContent = theme === 'light' ? '🌙' : '☀️';
                icon.setAttribute('title', theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему');
                
                console.debug('Иконка темы обновлена:', theme);
            }
        } catch (error) {
            console.error('Ошибка при обновлении иконки:', error);
        }
    }

    // Функция для переключения темы
    window.toggleTheme = function() {
        try {
            console.debug('Переключение темы...');
            const currentTheme = localStorage.getItem('theme') || getSystemTheme();
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        } catch (error) {
            console.error('Ошибка при переключении темы:', error);
        }
    };

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
        try {
            console.debug('Инициализация темы...');
            
            // Добавляем стили для плавного перехода
            const style = document.createElement('style');
            style.textContent = `
                .theme-transition,
                .theme-transition *,
                .theme-transition *:before,
                .theme-transition *:after {
                    transition: all 0.3s ease !important;
                }
                
                @keyframes scaleIn {
                    from {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                /* Отключение анимаций при предпочтении уменьшенного движения */
                @media (prefers-reduced-motion: reduce) {
                    .theme-transition,
                    .theme-transition *,
                    .theme-transition *:before,
                    .theme-transition *:after {
                        transition: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Устанавливаем начальную тему
            const savedTheme = localStorage.getItem('theme');
            const theme = savedTheme || getSystemTheme();
            setTheme(theme);
            
            // Слушаем изменения системной темы
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            });

            console.debug('Инициализация темы завершена');
        } catch (error) {
            console.error('Ошибка при инициализации темы:', error);
        }
    });
})(); 