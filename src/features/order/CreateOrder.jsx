import { useState } from "react";
import Button from "../../UI/Button";
import { Form,  redirect,  useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store'
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData();  
  
  const cart = useSelector(getCart);
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(state => state.user)

  const isLoadingAddress = addressStatus === 'loading'

  const dispatch = useDispatch();
  
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0
  const totalPrice = totalCartPrice + priorityPrice

  if(!cart.length) return <EmptyCart /> 

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>


      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input grow" defaultValue={username}required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
        <label className="sm:basis-40">Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input w-full"/>
          </div>
          {formErrors?.phone && <p className="mt-2 text-xs text-red-700 p-2 rounded-md bg-red-100">{formErrors.phone}</p>}
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
        <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" className="input w-full" disabled={isLoadingAddress} defaultValue={address} required />
            {addressStatus === 'error' && (
              <p className="mt-2 text-xs text-red-700 p-2 rounded-md bg-red-100">{errorAddress}</p>
            )}
          </div>
        {!position.latitude && !position.longitude && <span className="absolute right-[5px]">
      <Button type='small' onClick={(e)=>{
        e.preventDefault();
        dispatch(fetchAddress())}}>Get Position</Button>  
      </span>}
        </div>
        
        <div className="mb-12 flex items-center gap-5">  
          <input
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart"value={JSON.stringify(cart)} />
        <input type='hidden' name='position' value={position.longitude && position.latitude && `${position.latitufe},${position.longitude}`}/>
        <div>
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>Order now from {formatCurrency(totalPrice)}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  };
  const errors = {}
  if(!isValidPhone(order.phone)){
  errors.phone = "Please give us correct phone. We might need it to contact you." 
  }
  if(Object.keys(errors).length > 0) return errors

  // console.log(order)
  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
