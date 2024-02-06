// Event listener for the complete order button
//WIP
export function completeOrderListener() {
  $('#orders-container-employee').on('click', '.complete-order', function() {
    const orderId = $(this).closest('.order').attr('id');
    const order = $(this).closest('.order');
    console.log('orderId', orderId);
    $.ajax({
      url: `/api/orders/${orderId}`,
      method: 'PUT',
      success: function() {
        order.remove();
      },
      error: function(err) {
        console.log('Error in Complete Order', err);
      },
    });
  });
}
