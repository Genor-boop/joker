document.addEventListener('DOMContentLoaded', () => {
    let coins = 0;
    let miningSpeed = 1;
    let efficiency = 1;

    const coinsElement = document.getElementById('coins');
    const miningSpeedElement = document.getElementById('mining-speed');
    const mineButton = document.getElementById('mine-button');
    const leaderboardList = document.getElementById('leaderboard-list');

    // Обновление интерфейса
    function updateUI() {
        coinsElement.textContent = coins.toFixed(2);
        miningSpeedElement.textContent = (miningSpeed * efficiency).toFixed(2);
    }

    // Майнинг монет
    mineButton.addEventListener('click', () => {
        coins += miningSpeed * efficiency;
        updateUI();
    });

    // Улучшения
    document.querySelectorAll('.upgrade').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            if (type === 'speed' && coins >= 10) {
                miningSpeed += 1;
                coins -= 10;
            } else if (type === 'efficiency' && coins >= 20) {
                efficiency *= 1.05;
                coins -= 20;
            }
            updateUI();
        });
    });

    // Лидерборд (пример)
    function loadLeaderboard() {
        // Загрузка данных из сервера или локального хранилища
        const leaderboardData = [
            { username: 'Player1', coins: 100 },
            { username: 'Player2', coins: 80 },
            { username: 'Player3', coins: 60 }
        ];

        leaderboardList.innerHTML = '';
        leaderboardData.forEach((player, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${player.username} - ${player.coins} GenorCoin`;
            leaderboardList.appendChild(li);
        });
    }

    loadLeaderboard();

    // Инициализация Mini App
    if (window.Telegram?.WebApp) {
        Telegram.WebApp.ready(); // Сообщаем Telegram, что приложение загружено
    }
});