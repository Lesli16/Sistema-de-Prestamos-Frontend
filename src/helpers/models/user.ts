export interface User{
  "id":string
  "userName":string
  "name":string
  "lastNames":string
  "email":string
  "phoneNumber":string
  "ci":string
  "password":string
  "role":Role
}

export interface Role{
  "id":number,
  "roleName":string
}
