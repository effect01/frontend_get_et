
const initState = {
    items: [], 
    total:0,
    count:0
 };
export default function (state = initState, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            localStorage.setItem('cart-items', JSON.stringify( action.items)     );
           

          return { ...state, items: action.items };
        case "SUBTRACT_TO_CART":
            localStorage.setItem('cart-items', JSON.stringify( action.items)    );
            return { ...state, items: action.items };
        case "REMOVE_FROM_CART":
            localStorage.setItem('cart-items', JSON.stringify( action.items)   );
          return { ...state, items: action.items };
        case "CALCULATE_TOTAL_FROM_CART":
            localStorage.setItem('cart-count',  action.count );
            localStorage.setItem('cart-total',  action.total );
            console.log(JSON.parse( localStorage.getItem('cart-items'))  );
            return { ...state, total: action.total, count: action.count };
        case "CHANGE_RETIRO_ITEM_FROM_CART":
            localStorage.setItem('cart-items', JSON.stringify( action.items)    );
        
            return { ...state, items: action.items };
        case "CHANGE_COUNT_ITEM_FROM_CART":
            localStorage.setItem('cart-items', JSON.stringify( action.items)    );
            return { ...state, items: action.items };
        case 'CACHE_CART_LOAD_SUCCESS':
            return { ...state, items: action.items , count: action.count , total: action.total, };
        case 'INIT_STATE_CART':
            localStorage.setItem('cart-count', 0);
            localStorage.setItem('cart-total', 0);
            localStorage.setItem('cart-items', []);
            return initState;
        
        default:
          return state;
      }

}