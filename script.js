window.onload = function() {
    getMenu();
};

function getMenu() {
    fetch('menu.json')
        .then(response => response.json())
        .then(menuData => {
            const menuSection = document.getElementById('menuSection');
            
            menuData.forEach(item => {
                let menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                
                menuItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <button class="add-to-cart">+</button>
                `;
                
                menuSection.appendChild(menuItem);
            });
        })
        .catch(error => console.log('Error loading JSON:', error));
}

function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ['Burger A', 'Burger B', 'Burger C'];
            let selectedBurgers = [];
            for (let i = 0; i < 3; i++) {
                let randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }
            resolve(selectedBurgers);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

// Handling Promises
TakeOrder()
    .then(order => {
        console.log("Order:", order);
        return orderPrep();
    })
    .then(prep => {
        console.log("Order Prepared:", prep);
        return payOrder();
    })
    .then(payment => {
        console.log("Payment Status:", payment);
        if (payment.paid) {
            thankyouFnc();
        }
    });
