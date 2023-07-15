# library_API

https://libraryapi-hmmy.onrender.com

handle user routers :

/user/signup (POST)  ==>{name-email-password-confirmPassword-age-mobileNumber}

/user /verify/:token  (GET) 

/user /signIn (POST) ===>{email-password}

/user /update  (PUT) ==> {_id,mobileNumber,name , token}

/user /delete  (Delete) ==>{_id,token}

/user /softDeleted  (Delete)==>{_id,token}

/user /changePassword (PUT) ==> {email-password,token}

/user /forgetPassword (POST) ==>{email} ==>{newPassword,code}

/user /resetPassword/:token (GET)

/user /logout (PUT) ==>{token,_id}

Handle books routers :

/book/add  (POST)===>{bookName,description,writerName,token)

/book /search  (GET)===>{bookName,token)

/book /allBookIssued  (GET)  

/book /allBookReturned  (GET)

/book /issuedBook  (PUT)===>{bookId,returnData,token)

/book /returnedBook  (PUT)===>{bookId,token)
