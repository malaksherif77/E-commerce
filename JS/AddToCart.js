// Event Delegation: التحقق من مكان الضغط

document.addEventListener('click',function (e) {
    if(e.target.matches('[data-action="card-dec"]')||e.target.matches('[data-action="card-inc"]')){
       const countContainer = e.target.closest(".counter");
       const contValue=countContainer.querySelector("[data-card-qty]");
       let intContValue = parseInt(contValue.textContent);

        if(e.target.matches('[data-action="card-dec"]')&& intContValue>1){
            intContValue--;
        }else if(e.target.matches('[data-action="card-inc"]')){
            intContValue++;
        }

        contValue.textContent=intContValue;
    }
});


document.addEventListener('click', function(event) {

    if (event.target.matches('[data-action="card-add"]')) {
        
        const productCard = event.target.closest('.product-card');
        const counterValue = productCard.querySelector('[data-card-qty]');
        const quantity = parseInt(counterValue.textContent);

        const priceElement = productCard.querySelector('.price__current'); 
        const unitPrice = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, '')) || 0;

        const totalAmount = quantity * unitPrice;

        const productId = event.target.getAttribute('data-product-id');
        const productName = productCard.querySelector('.product-card__title').textContent;

        const isConfirmed = window.confirm(`Are you Sure You want to add (${quantity}) from "${productName}" in Your Cart \n The Total: ${totalAmount} $`);

        if (isConfirmed) {
            const currentUserId = localStorage.getItem('currentUser');
            let usersList = JSON.parse(localStorage.getItem('users')) || [];
            const activeUser = usersList.find(user => user.id == currentUserId);

            if (activeUser) {
                const cartItem = {
                    id: productId,
                    name: productName,
                    qty: quantity,
                    pricePerUnit: unitPrice,
                    totalPrice: totalAmount
                };

                if (!activeUser.cart) {
                    activeUser.cart = [];
                }

                activeUser.cart.push(cartItem);
                localStorage.setItem('users', JSON.stringify(usersList));

                Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: 'The product was added successfully 🛒',
                timer: 1500,
                showConfirmButton: false
            });
                console.log('Updated Users List:', usersList);
            }
        }else{
            Swal.fire({
            icon: 'info',
            title: 'Cancelled',
            text: 'The process was cancelled.',
            timer: 1500,
            showConfirmButton: false
        });
        }
    }
});

// const currentUser=localStorage.getItem('users')

// const logoutBtn = document.getElementById("logout-btn");
// if(logoutBtn){
//     logoutBtn.addEventListener("click", (e) => {
//         e.preventDefault(); 
    
    
//         localStorage.removeItem("currentUser");
    
      
//         window.location.href = "index.html";
//     });

// }