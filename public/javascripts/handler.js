

var handler = StripeCheckout.configure({
    key: 'pk_test_i0mAS5A7uVZDTpDWkbNkAIt7',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token){
      //token ID to use for server-side
      var chargeData = {
          id: token.id,
          email: token.email,
          amount: $('#amount').val()*100
      }
      $.ajax({
          url: '/getCardToken',
          type: 'post',
          data: {chargeData},
          success: function(data){
              console.log('success')
             top.location.href = '/success'
          }
      })
  }
})

document.getElementById('pay').addEventListener('click', function(e){
    handler.open({
        name: 'Aria',
        description: "Therapy price",
        currency: 'cad',
        amount: $('#amount').val()*100, 
        zipCode: true,
        billingAddress: true
    });
    e.preventDefault();
});

window.addEventListener('popstate', function(){
    handler.close();
})