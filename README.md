# Medblood

## Background Context
Medblood is a blood bank application API. It aims to remove obstacles in checking, receiving and donating matching blood with little or no hassle.
This application API will be implemented using NodeJS, The database will be a relational database which is Postgresql and an ORM prisma will be used to query the database. Prisma is being used because it works very well with NodeJS and helps to simplify the querying process of SQL i.e instead of writing raw SQL which can be daunting in most cases.

This application enables users who are searching for blood types, enables donors to donate blood. The receivers of blood will be users and will have it's own schema while the donors of blood samples will be donors and have it's own schema as well.

This application also entails protected route to ensure the following:
- Users can see all blood types
- Users(donors) can donate blood sample information
- Users/Donors can update blood sample information sent initially to the database
- Users(Donors) can delete his offer because of his/her health conditions