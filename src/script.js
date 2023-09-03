import { createMarkup } from './templates/templatePLP'
import instruments from './products.json'

const selectors = {
    container: document.querySelector('.js-list')
}
const PRODUCT_LS_KEY = 'checkout';

selectors.container.insertAdjacentHTML('beforeend', createMarkup(instruments));
selectors.container.addEventListener('click', handlerAdd);

function handlerAdd(evt) {
    if (!evt.target.classList.contains('js-add')) {
        return;
    }

    const product = evt.target.closest('.js-product');
    const productId = Number(product.dataset.id);
    const currentProduct = instruments.find(({ id }) => id === productId);
    const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) ?? [];
    const idx = products.findIndex(({ id }) => id === productId);

    if (idx !== -1) {
        products[idx].qty += 1;
    } else {
        currentProduct.qty = 1;
        products.push(currentProduct);
    }

    localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(products))
}

