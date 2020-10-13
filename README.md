# v2 additions flipzon

Categories (max 3 levels) <br/>
	= Electornics, Men, Women, Baby & Kids, Home & Furniture, Sports, Books,<br/>
	Sub-categories<br/>
		= Electronics -> Mobile, Mobile Accessories, Laptop, Camera, Speakers, etc<br/>
		Sub-sub-categories<br/>
			= Mobile -> Mi, Realme, Vivo, Oppo, etc.<br/>

add-functionalities-final<br/>
	- Add sub and sub-sub categories<br/>
	- product add offers<br/>
	- add reviews and rating<br/>
	- product add video link<br/>
	- add product Specifications<br/>
	- status - Pending, Confirm, Delivered, Cancel<br/>

changes in database

	- Specifications <br/>
		- id, productId, Title, Details<br/>
	- categories add "parent" and images are optional<br/>
		- 0 for "parent" in main-category, chil	d-category had categoryId in "parent" field<br/>
	- product table modifications/add-ones<br/>
		- discount(percentage),<br/>
		- isInOffer<br/>
		- description will be HTML ( no change in table )<br/>
		- video link<br/>
	- Reviews Table<br/>
		- id, review, rating(1-5), userId, productId<br/>
	- message table (future)<br/>
		- messageId, userId, message, seen?(bool), user?(bool)<br/>
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
