# flipzon


product_category--- id,name,description
product ---- id,name,price,category_id,main_image,stock
product_image ---- id,image,product_id
role --- id,name
user --- id,email,username,password,contact,address,roleId
order -- id,user_id,order_date,total_price,status(placed,confirm,delivered)
order_details--- id,order_id,product_id,quantity,price



===> admin
login
edit profile
logout
category -crud
product,product_imgaes -crud
order -view

===> client
login
edit profile
logout
product -view(category wise,name wise)
order -view(cart,order history,order place)
cart


