import { functions } from "./functions_index.js";
export const loadOrder = function(res) {
  // string to concat to. will hold the resulting html.
  let ordersHtml = ``;
  // html template for order
  // loop through items and add to orderHtml.
  const data = res.order;
  const orders = [];

  for (const item in data) {

    const orderId = data[item].orderid;

    if (orders[orderId]) {
      const dish = {
        name: '',
        qty: 0
      };
      dish.name = data[item].dishname;
      dish.qty = data[item].quantity;
      orders[orderId].dishes.push(dish)
    } else {

      orders[orderId] = {
        dishes: [],
        total: 0,
        username: data[item].username,
        estimated_completion: functions.formatTimeAmPm(data[item].estimated_completion) || null
      };
      const total = data[item].total / 100;

      const dish = {};
      dish.name = data[item].dishname;
      dish.qty = data[item].quantity;
      orders[orderId].dishes.push(dish);

      orders[orderId].total = total;

    }
  }

  for (const order in orders) {

    let orderHtml = `
    <article class="order">
    <div class="order-username">${orders[order].username}</div>
      <ul class="order-items">
      `;
    for (const item in orders[order].dishes) {

      const name = orders[order].dishes[item].name;
      const quantity = orders[order].dishes[item].qty;

      const string = `<li>${name} x ${quantity}</li>`;
      orderHtml += string;

    }
    let closingHtml = `
    </ul>
    <div class="order-total">Total: $${orders[order].total}</div>
    <form class="estimated-time">
      <label>Order ID:</label>
      <input value='${order}' name="orderID" type="text" class="orderID" readonly></input>
      <div class="time-input-container">`

      if (orders[order].estimated_completion) {
        const estimatedTimeDiv = `<div class="success-message">Estimated Completion Time: ${orders[order].estimated_completion}</div>`
        closingHtml += estimatedTimeDiv;

      }

      closingHtml += `
      <label for="time">New Estimated Completion Time:</label>
      <input type="time" name="timeInput" min="09:00" max="23:00" class="timeInput"></input>
      <button class="enter-time btn btn-primary">Enter</button>
      </div>
    </form>
    </article>
    `
    orderHtml += closingHtml;
    ordersHtml = orderHtml + ordersHtml;

  }

  return ordersHtml;
}

export const render_orders = function(html) {
  $("#orders-container-employee").append(html);
};
