const formatDate = (dateString) => {
  let date = new Date(dateString);
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  const day = date.getDate().toString();
  const month = date.getMonth().toString();
  const year = date.getFullYear().toString();
  date = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
  return `${time}  ${date}`;
};

const OrdersListComponent = (props) => {
  const { orders, isAdmin } = props;
  return orders.map((order) => {
    // console.log(order);
    return (
      <tr key={order.id}>
        {isAdmin && (
          <>
            <td>{`${order.user.name} ${order.user.surname}`}</td>
            <td>{order.user.email}</td>
            <td>{order.user.phonenumber}</td>
          </>
        )}
        <td>
          {" "}
          {order.pizza.name} ({order.pizzasize.name}){" "}
        </td>
        <td> {order.bakestyle.name}</td>
        <td> {order.crust.crust}</td>
        <td> {order.cutstyle.name}</td>
        <td> {order.drink !== null ? order.drink.name : " - "}</td>
        <td> {order.sauce !== null ? order.sauce.name : " - "}</td>
        <td>
          {" "}
          {order.pizza.price * order.pizzasize.pizzacostfactor +
            order.crust.price +
            (order.drink !== null ? order.drink.price : 0) +
            (order.sauce !== null ? order.sauce.price : 0)}
          {"$"}
        </td>
        <td>{formatDate(order.date)}</td>
      </tr>
    );
  });
};

export default OrdersListComponent;
