const burgerAddButtons = document.querySelectorAll('.card__content_add');


const cart = {

    button: document.querySelector('.main-menu__cart-btn'),
    panel: document.querySelector('.main-menu__cart-panel'),
    isVisible: false,
    orderList: [],

    init: () => {
        cart.button.addEventListener('click', function (e) {
            e.preventDefault();
            if (cart.isVisible == true) {
                cart.isVisible = false;
                cart.panel.style.display = 'none';
            } else {
                cart.isVisible = true;
                cart.panel.style.display = 'inline';
            }
        })
    },
    
    repaint: () => {
        if (cart.orderList.length > 0) {
            let content = '';
            for (let i = 0; i < cart.orderList.length; i++) {
                content += `<div>${cart.orderList[i]}</div>`;
            }
            cart.panel.innerHTML = content;
            console.log(content);
        } else {
            cart.panel.innerHTML = 'Пусто';
        }
    }
};

cart.init();

for (let i = 0; i < burgerAddButtons.length; i++) {
    burgerAddButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        let type = this.closest('.card').getAttribute('data-type');

        cart.orderList.push(type);
        cart.repaint();
        console.log(cart.orderList);
    });
}

