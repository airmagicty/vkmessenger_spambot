// Конфиг
var textMessage = ""; // Что отправляем в чат

// Список чатов
var chatList = ["",""]; 

// Время, в которое отправлять
var hoursTime = 12; // Часы
var minutesTime = 10; // Минуты

var countMessages = 10; // Количество сообщений, которое надо отправить
var speedSend = 1000; // Скорость отправки, оптимально = 1сек/сообщ
var speedOpen = speedSend * (countMessages + 1); // Скорость смены чатов, оптимально = кол-во*(скорость+1)

// Отправка сообщений
function sendMessage() {
    console.log("sendMessage");
    
    // Найти элемент <div> для хранения сообщений
    var messageDiv = document.querySelector('div.Composer__input[placeholder="Напишите сообщение..."][contenteditable="true"]'); // Замените '#yourMessageDiv' на селектор вашего элемента

    // Проверить, найден ли элемент, прежде чем продолжить
    if (messageDiv) {
        // Установить текст в элементе
        messageDiv.innerText = textMessage;

        // Создать событие ввода
        var inputEvent = new Event('input', { bubbles: true, cancelable: true });

        // Диспетчеризовать событие в элементе <div>
        messageDiv.dispatchEvent(inputEvent);
    }

    // Найти элемент <div> с классом "Composer__send"
    var sendButton = document.querySelector('button.Composer__button.Composer__button--submit');

    // Если элемент найден, нажать на него
    if (sendButton) {
        sendButton.click(); // Нажать на элемент
    }
}

// Проходимся по всем чатам из массива
function openChats() {
    console.log("openChats");
    
    // Шаг 1: Заданный массив

    // Шаг 2: Найти все элементы с классом "ConvoListItem" и записать их в массив
    const convoListItems = document.querySelectorAll('.ConvoListItem');

    // Шаг 3: Фильтровать элементы, которые содержат нужный заголовок, и записать их в массив Zakrep
    const Zakrep = [];
    convoListItems.forEach((item) => {
        const titleElement = item.querySelector('.ConvoTitle__title');
        if (titleElement && chatList.includes(titleElement.textContent.trim())) {
            Zakrep.push(item);
        }
    });

    // Шаг 4: Пройтись по массиву Zakrep и сделать .click() с задержкой 2 секунды перед каждым .click()
    Zakrep.forEach((item, index) => {
        setTimeout(() => {
            item.click();
            
            // Отправляемм сообщения в чат
            for (let i = 0; i < countMessages; i++) {
                setTimeout(() => {
                    console.log('Sending message...');
                    sendMessage();
                }, i * speedSend);
            }
            
        }, index * speedOpen);
    });
}

// Функция для проверки времени и вызова событий
function checkTime() {
    console.log("checkTime");
    
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Проверка времени (13:45)
    if (hours === hoursTime && minutes === minutesTime) {
        console.log("currentTime");
        openChats();
    }
}

// Установка интервала для вызова функции каждую минуту
setInterval(checkTime, 60000); // 60000 миллисекунд = 1 минута