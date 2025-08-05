// === Добавление товара в корзину ===
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Товар добавлен в корзину!');
}

// === Отображение корзины на cart.html ===
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const sum = item.price * item.quantity;
    total += sum;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price} MDL</td>
      <td>
        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>${sum} MDL</td>
      <td><button class="remove-btn" onclick="removeItem(${index})">Удалить</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotalElement.innerText = `${total} MDL`;
}

// === Обновление количества товара ===
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// === Удаление товара ===
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// === Очистка корзины ===
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// === Оформление заказа ===
document.getElementById('checkout-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.querySelector('input[name="name"]').value.trim();
  const phone = this.querySelector('input[name="phone"]').value.trim();
  const address = this.querySelector('input[name="address"]').value.trim();
  const payment = this.querySelector('input[name="payment"]:checked').value;
  const deliveryTime = this.querySelector('input[name="delivery_time"]:checked').value;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Ваша корзина пуста!');
    return;
  }

  let message = `<b>🛒 Новый заказ!</b>\n\n`;
  message += `👤 <b>Имя:</b> ${name}\n📞 <b>Телефон:</b> ${phone}\n📍 <b>Адрес:</b> ${address}\n`;
  message += `💳 <b>Оплата:</b> ${payment}\n⏰ <b>Доставка:</b> ${deliveryTime}\n\n`;
  message += `<b>Товары:</b>\n`;

  let total = 0;
  cart.forEach(item => {
    const sum = item.price * item.quantity;
    total += sum;
    message += `• ${item.name} — ${item.quantity} шт. (${sum} MDL)\n`;
  });

  message += `\n<b>Итого:</b> ${total} MDL`;

  const BOT_TOKEN = "8000082763:AAFMTdgLBqFJmM_FeCo6L-0E5xvucvWzdwA";
  const CHAT_ID = "617776567";
  const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const googleWebhookURL = "https://script.google.com/macros/s/AKfycbx2CDsiFWkJvIiQkO0IfmnvytP2q_s3DwaxQqXFYzQ4Y4V1XkthoKiT5yemG74EBrrPvg/exec";

  try {
    // 1. Отправка в Telegram
    const tgResponse = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });
    console.log('Telegram response:', await tgResponse.json());

    // 2. Отправка в Google Sheets (no-cors)
    fetch(googleWebhookURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, address, payment, deliveryTime, cart, total
      })
    })
    .then(() => console.log('✅ Данные отправлены в Google Sheets (через no-cors)'))
    .catch(err => console.warn('Ошибка Google Sheets:', err));

    alert('✅ Заказ принят! Мы свяжемся с вами для подтверждения.');
    clearCart();

  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error);
    alert('❌ Не удалось отправить заказ. Попробуйте снова.');
  }
});

// === Загружаем корзину при загрузке страницы ===
document.addEventListener('DOMContentLoaded', renderCart);
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    if (burger && navLinks) {
        // Создаем overlay для фона
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            navLinks.classList.toggle('show');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', function () {
            burger.classList.remove('active');
            navLinks.classList.remove('show');
            overlay.classList.remove('show');
        });
    }
});

