# v2 additions flipzon

Categories (max 3 levels)
	= Electornics, Men, Women, Baby & Kids, Home & Furniture, Sports, Books,
	Sub-categories
		= Electronics -> Mobile, Mobile Accessories, Laptop, Camera, Speakers, etc
		Sub-sub-categories
			= Mobile -> Mi, Realme, Vivo, Oppo, etc.

add-functionalities-final
	- Add sub and sub-sub categories
	- product add offers
	- add reviews and rating
	- product add video link
	- add product Specifications
	- status - Pending, Confirm, Delivered, Cancel

changes in database
	- Specifications
		id, productId, Title, Details

	- categories add "parent" and images are optional
		1 for main, 2 for child 3 for sub-child

	- product table modifications/add-ones
		- discount(percentage),
		- isInOffer
		- description will be HTML ( no change in table )
		- video link

	- Reviews Table
		- id, review, rating, userId, productId
		
	- message table (future)
		- messageId, userId, message, seen?(bool), user?(bool)
			( userId is the id of user seding message,
			- seen will be false by default, becomes true while user/admin sees,
			- user will be boolen will be true if message is from user, false if message from admin )


# v1 flipzon


product_category--- id,name,description
product ---- id,name,price,category_id,main_image,stock
product_image ---- id,image,product_id
user-role --- id,name
user --- id,email,username,password,contact,address,role_id
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