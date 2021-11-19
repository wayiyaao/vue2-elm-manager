import axios from "axios";

/**
 * 登陆
 */

export const login = data => axios.post('//elm.cangdu.org/admin/login', data);

/**
 * 退出
 */

export const signout = () => axios.get('//elm.cangdu.org/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => axios.get('//elm.cangdu.org/admin/info');

/**
 * api请求量
 */

export const apiCount = date =>axios.get('//elm.cangdu.org/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => axios.get('//elm.cangdu.org/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => axios.get('//elm.cangdu.org/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => axios.get('//elm.cangdu.org/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => axios('//elm.cangdu.org/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => axios.get('//elm.cangdu.org/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => axios.get('//elm.cangdu.org/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => axios.get('//elm.cangdu.org/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => axios.get('//elm.cangdu.org/v1/cities?type=guess');

/**
 * 添加商铺
 */

export const addShop = data => axios.post('//elm.cangdu.org/shopping/addShop', data);

/**
 * 获取搜索地址
 */

export const searchPlace = (cityid, value) => axios.get('https://elm.cangdu.org/v1/pois?city_id='+cityid+'&keyword='+value+'&type=search');

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => axios.get('//elm.cangdu.org/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => axios.post('//elm.cangdu.org/shopping/addcategory', data);


/**
 * 添加食品
 */

export const addFood = data => axios.post('//elm.cangdu.org/shopping/addfood', data);


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => axios.get('//elm.cangdu.org/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getRestaurants = data => axios.get('//elm.cangdu.org/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getRestaurantDetail = restaurant_id => axios.get('//elm.cangdu.org/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getRestaurantsCount = () => axios.get('//elm.cangdu.org/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateRestaurant = data => axios.post('//elm.cangdu.org/shopping/updateshop', data);

/**
 * 删除餐馆
 */

export const deleteRestaurant = restaurant_id => axios.delete('//elm.cangdu.org/shopping/restaurant/' + restaurant_id);

/**
 * 获取食品列表
 */

export const getFoods = (offset,limit,restaurant_id) => axios.get('//elm.cangdu.org/shopping/v2/foods?offset='+offset+'&limit='+limit+'&restaurant_id='+restaurant_id);

/**
 * 获取食品数量
 */

export const getFoodsCount = () => axios.get('https://elm.cangdu.org/shopping/v2/foods/count');


/**
 * 获取食品menu列表
 */

export const getMenu = restaurant_id => axios.get('//elm.cangdu.org/shopping/v2/menu?restaurant_id='+restaurant_id);

/**
 * 获取食品menu详情
 */

export const getMenuById = category_id => axios.get('//elm.cangdu.org/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => axios.post('//elm.cangdu.org/shopping/v2/updatefood', data);

/**
 * 删除食品
 */

export const deleteFood = food_id => axios.delete('//elm.cangdu.org/shopping/v2/food/' + food_id);

/**
 * 获取用户列表
 */

export const getUserList = (offset,limit) => axios.get('//elm.cangdu.org/v1/users/list?offset='+offset+'&limit='+limit);

/**
 * 获取用户数量
 */

export const getUserCount = () => axios.get('//elm.cangdu.org/v1/users/count');

/**
 * 获取订单列表
 */

export const getOrderList = (offset,limit) => axios.get('//elm.cangdu.org/bos/orders?offset='+offset+'&limit='+limit);

/**
 * 获取订单数量
 */

export const getOrderCount = () => axios.get('//elm.cangdu.org/bos/orders/count');

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => axios.get('//elm.cangdu.org/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => axios.get('//elm.cangdu.org/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => axios.get('//elm.cangdu.org/v1/user/city/count');
