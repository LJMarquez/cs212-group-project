// Menu Data Object
const menuData = {
    Appetizers: [
        {
            name: 'Mozzarella Sticks',
            description: 'Crispy fried mozzarella sticks served with marinara sauce',
            price: '$8.99',
            imageUrl: '../images/food/mozzarella-sticks.jpg',
            details: 'Made from premium mozzarella cheese, breaded and deep-fried until golden. Served hot with marinara sauce for dipping. Perfect appetizer for sharing or enjoying solo while bowling!'
        },
        {
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce with Caesar dressing and croutons',
            price: '$7.99',
            imageUrl: '../images/food/caesar-salad.jpg',
            details: 'Fresh romaine lettuce tossed with creamy Caesar dressing, parmesan cheese, and crispy croutons. Served chilled and refreshing. Great as a light appetizer or side dish.'
        },
        {
            name: 'Garlic Bread',
            description: 'toasted bread with garlic butter and parmesan cheese',
            price: '$5.99',
            imageUrl: '../images/food/garlic-bread.jpg',
            details: 'Freshly toasted bread brushed with garlic-infused butter and topped with melted parmesan cheese. Served warm and crispy on the outside, soft inside.'
        },
        {
            name: 'Chicken Wings',
            description: 'Spicy chicken wings served with ranch dressing',
            price: '$9.99',
            imageUrl: '../images/food/wings.jpg',
            details: 'Plump, meaty chicken wings tossed in our signature spicy sauce. Baked to perfection and served with cool ranch dressing to balance the heat.'
        },
        {
            name: 'Spinach Artichoke Dip',
            description: 'Warm spinach dip served with toasted pita chips',
            price: '$8.49',
            imageUrl: '../images/food/spinach-dip.jpg',
            details: 'Creamy spinach and artichoke dip baked until bubbling and golden, then served with crisp pita chips for easy sharing.'
        },
        {
            name: 'Pretzel Bites',
            description: 'Soft pretzel bites served with beer cheese dip',
            price: '$7.49',
            imageUrl: '../images/food/pretzel-bites.jpg',
            details: 'Warm, salted pretzel bites with a soft center and golden crust, paired with a rich beer cheese dip for a satisfying starter.'
        }
    ],
    Entrees: [
        {
            name: 'Cheeseburger',
            description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
            price: '$12.99',
            imageUrl: '../images/food/cheeseburger.jpg',
            details: 'A classic! Juicy beef patty grilled to order with melted American cheese, crisp lettuce, fresh tomato, onions, and our house-made special sauce on a toasted bun.'
        },
        {
            name: 'Pizza',
            description: 'Delicious pizza with your choice of toppings',
            price: '$14.99',
            imageUrl: '../images/food/pizza.jpg',
            details: 'Handmade dough with our signature tomato sauce and mozzarella cheese. Customize with your favorite toppings! Choose from pepperoni, sausage, vegetables, and more.'
        },
        {
            name: 'Philly Cheesesteak',
            description: 'Grilled steak with melted cheese, peppers, and onions on a hoagie roll',
            price: '$13.99',
            imageUrl: '../images/food/cheesesteak.jpg',
            details: 'Thinly sliced steak grilled with bell peppers and onions, topped with melted provolone cheese on a soft hoagie roll. Authentic and delicious!'
        },
        {
            name: 'Nachos',
            description: 'Crunchy tortilla chips topped with melted cheese, jalapeños, and sour cream',
            price: '$12.99',
            imageUrl: '../images/food/nachos.jpg',
            details: 'Crispy tortilla chips loaded with melted cheddar cheese, sliced jalapeños, sour cream, and salsa. A perfect shareable appetizer or snack!'
        },
        {
            name: 'Buffalo Chicken Sandwich',
            description: 'Crispy chicken breast tossed in buffalo sauce with lettuce and ranch',
            price: '$13.49',
            imageUrl: '../images/food/buffalo-chicken-sandwich.jpg',
            details: 'A crispy chicken breast coated in tangy buffalo sauce, topped with fresh lettuce and cool ranch dressing on a toasted bun.'
        },
        {
            name: 'Grilled Salmon',
            description: 'Seasoned salmon filet served with rice and vegetables',
            price: '$15.99',
            imageUrl: '../images/food/grilled-salmon.jpg',
            details: 'Lightly seasoned salmon grilled until flaky and tender, served with seasoned rice and fresh vegetables for a balanced entree.'
        }
    ],
    Desserts: [
        {
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with a molten center',
            price: '$6.99',
            imageUrl: '../images/food/chocolate-lava-cake.jpg',
            details: 'A rich chocolate cake baked until the outside is set and the inside stays molten, served warm for a decadent finish.'
        },
        {
            name: 'Cheesecake Slice',
            description: 'Classic creamy cheesecake with a graham cracker crust',
            price: '$6.49',
            imageUrl: '../images/food/cheesecake-slice.jpg',
            details: 'Smooth, creamy cheesecake on a buttery graham cracker crust. A simple dessert with a clean finish.'
        },
        {
            name: 'Ice Cream Sundae',
            description: 'Vanilla ice cream topped with chocolate sauce and whipped cream',
            price: '$5.99',
            imageUrl: '../images/food/ice-cream-sundae.jpg',
            details: 'A classic sundae built with creamy vanilla ice cream, chocolate sauce, whipped cream, and a cherry on top.'
        },
        {
            name: 'Funnel Cake Fries',
            description: 'Crispy fried dough dusted with powdered sugar',
            price: '$5.49',
            imageUrl: '../images/food/funnel-cake-fries.jpg',
            details: 'Golden funnel cake strips with a light, crispy texture and sweet powdered sugar on top for a fun carnival-style dessert.'
        }
    ]
};

const menuContainer = document.getElementById('menu-content');

if (menuContainer) {
    for (const category in menuData) {
        if (!Object.prototype.hasOwnProperty.call(menuData, category)) {
            continue;
        }

        const categoryTitle = category;
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'menu-category mb-5';

        const categoryHeading = document.createElement('h2');
        categoryHeading.className = 'menu-category-title';
        categoryHeading.textContent = categoryTitle;
        categoryContainer.appendChild(categoryHeading);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'row g-4';

        const categoryItems = menuData[category];
        for (let itemIndex = 0; itemIndex < categoryItems.length; itemIndex += 1) {
            const item = categoryItems[itemIndex];
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item col-12 col-md-6 col-xl-4';
            menuItem.setAttribute('data-name', item.name);
            menuItem.setAttribute('data-price', item.price);
            menuItem.setAttribute('data-description', item.description);

            menuItem.innerHTML = `
                    <div class="menu-card card h-100 border-0">
                        <span class="price-circle">${item.price}</span>
                        <div class="menu-image-wrap position-relative">
                            <div class="item-image card-img-top" style="background-image: url('${item.imageUrl}')"></div>
                        </div>
                        <div class="item-copy card-body">
                            <h3 class="card-title h5">${item.name}</h3>
                            <p class="card-text mb-0">${item.description}</p>
                        </div>
                    </div>
                `;

            gridContainer.appendChild(menuItem);
        }

        categoryContainer.appendChild(gridContainer);
        menuContainer.appendChild(categoryContainer);
    }

    const menuItems = document.querySelectorAll('.menu-item');

    for (let itemIndex = 0; itemIndex < menuItems.length; itemIndex += 1) {
        const item = menuItems[itemIndex];

        item.addEventListener('click', function () {
            const itemName = this.getAttribute('data-name');
            const itemDescription = this.getAttribute('data-description');
            const itemPrice = this.getAttribute('data-price');
            const expandedDetails = getDetailsFromData(itemName);

            openModal(itemName, itemDescription, itemPrice, expandedDetails);
        });

        item.style.cursor = 'pointer';
    }
}

const modal = document.getElementById('itemModal');
if (modal) {
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function getDetailsFromData(itemName) {
    const itemData = getItemDataByName(itemName);
    return itemData.details;
}

function getItemDataByName(itemName) {
    for (const category in menuData) {
        const foundItem = menuData[category].find(item => item.name === itemName);
        if (foundItem) {
            return foundItem;
        }
    }
}

function openModal(itemName, description, price, expandedDetails) {
    const modal = document.getElementById('itemModal');
    const modalContent = document.querySelector('.modal-content');

    const itemData = getItemDataByName(itemName);

    modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <div class="modal-body">
            <div class="modal-image" style="${`background-image: url('${itemData.imageUrl}')`}"></div>
            <div class="modal-details">
                <h2>${itemName}</h2>
                <p class="modal-price">Price: <strong>${price}</strong></p>
                <div class="modal-description">
                    <h3>Description</h3>
                    <p>${description}</p>
                </div>
                <div class="modal-expanded-details">
                    <h3>Details</h3>
                    <p>${expandedDetails}</p>
                </div>
                <button class="modal-btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
