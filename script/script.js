const burgerAddButtons = document.querySelectorAll('.card__content_add');

const menu = {
    'beef200': {
        name: 'С ГОВЯДИНОЙ 200GR',
        desc: '200гр сочной говядины, огурцы, салат и лук, все на булочке с кунжутом',
        price: 15000
    },
    'beef250': {
        name: 'С ГОВЯДИНОЙ 250GR',
        desc: '250гр сочной говядины, огурцы, салат и лук, все на булочке с кунжутом',
        price: 18000
    },
    'beef300': {
        name: 'С ГОВЯДИНОЙ 300GR',
        desc: '300гр сочной говядины, огурцы, салат и лук, все на булочке с кунжутом',
        price: 21000
    },
    'chicken200': {
        name: 'С КУРИЦЕЙ 200GR',
        desc: '200гр сочной курицы, огурцы, салат и лук, все на булочке с кунжутом',
        price: 14000
    },
    'chicken250': {
        name: 'С КУРИЦЕЙ 250GR',
        desc: '250гр сочной курицы, огурцы, салат и лук, все на булочке с кунжутом',
        price: 16000
    },
    'chicken300': {
        name: 'С КУРИЦЕЙ 300GR',
        desc: '300гр сочной курицы, огурцы, салат и лук, все на булочке с кунжутом',
        price: 19000
    }
}

const cart = {

    button: document.querySelector('.main-menu__cart-btn'),
    panel: document.querySelector('.main-menu__cart-panel'),
    itemDesc: '',
    isVisible: false,
    orderList: [],

    init: () => {
        cart.button.addEventListener('click', function (e) {
            e.preventDefault();
            if (cart.isVisible == true) {
                cart.isVisible = false;
                cart.panel.style.opacity = 0;
            } else {
                cart.isVisible = true;
                cart.panel.style.opacity = 1;
            }
        })
    },

    repaint: () => {
        if (cart.orderList.length > 0) {
            let content = '<ul>';
            for (let i = 0; i < cart.orderList.length; i++) {
                content +=
                    `<li class="cart-panel__item" data-itemID="${i}">
                        <div class="cart-panel__item-name">${menu[cart.orderList[i]].name}</div>
                        <img src="img/deleteBtn.png" class="cart-panel__item_delete" alt="">
                    </li>`;
            }

            cart.panel.innerHTML = content + cart.itemDesc + '</ul>';

            let cart_items = document.querySelectorAll('.cart-panel__item_delete');
            for (let i = 0; i < cart_items.length; i++) {
                cart_items[i].addEventListener('click', () => {
                    let id = cart_items[i].closest('.cart-panel__item').getAttribute('data-itemID');
                    cart.orderList.splice(id, 1);
                    cart.repaint();
                });
            }
            let cart_hover = document.querySelectorAll('.cart-panel__item-name');
            for (let i = 0; i < cart_hover.length; i++) {
                cart_hover[i].addEventListener('mousemove', () => {
                    cart.showDescription(cart_hover[i]);
                    console.log('no')
                });
                cart_hover[i].addEventListener('mouseout', () => {
                    cart.itemDesc = '';
                    cart.repaint();
                    console.log('yeah');
                });
            }

        } else {
            cart.panel.innerHTML = 'Пусто';
        }
    },
    showDescription: (element) => {
        let id = element.closest('.cart-panel__item').getAttribute('data-itemID');
        cart.itemDesc = `<div class="main-menu__cart_item-description">
                                    ${menu[cart.orderList[id]].desc}
                                    <div>Цена: ${menu[cart.orderList[id]].price}</div>
                                </div>`
        cart.repaint();
    }
};

cart.init();

for (let i = 0; i < burgerAddButtons.length; i++) {
    burgerAddButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        let type = this.closest('.card').getAttribute('data-type');
        cart.orderList.push(type);
        cart.repaint();
    });
}

