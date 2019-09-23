export default function enter(state = {}, action) {
  switch(action.type) {
    case 'SHOP_ENTER': {
      const { categoryList } = action.payload
      const menu = categoryList.map(({ id, name }) => ({ id, name }))
      return { ...state, menu, category: categoryList }
    }
    // case CATE_SUB: {
    //   return {
    //     ...state,
    //     subMenu: action.payload.category.subCategoryList
    //   }
    // }
    // case CATE_SUB_LIST: {
    //   const { id, itemList } = action.payload
    //   return {
    //     ...state,
    //     subCategory: { ...state.subCategory, [id]: itemList }
    //   }
    // }
    default:
      return state
  }
}
