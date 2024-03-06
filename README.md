# Autotribe

The car collection management application for enthusiast collectors.

## Overview

The app allows you to keep track of currently and previously owned vehicles, as well as adding new vehicles with just a registration plate, and keeping track of up to date MOT and Tax information.

## Usage

The app is deployed live at https://auto-tribe.vercel.app/ where you can register for an account and start using the up to date build. 

One of the limitations of the app is that the UKVD API is on a trial account, so only registrations with the letter 'A' can be used. Here are some samples if you need:

AG09 AUJ | MA59 FJK | DN07 AMV | AF06 YRU | SA56 OZJ | AD09 XBY | SK63 AFZ | CA59 WZZ | AU13 WKB | MB54 DAS | NC06 SAX

## Features

Presently, the app can register new users, login, add, edit and remove vehicles, as well as entering diary information.

When adding a vehicle, the application queries the Vehicle Data API provided by https://ukvehicledata.co.uk/ to validate the VRM (registration plate) and fetch vehicle information (Make, Model, Year, Colour). The user can also upload an image (hosted by Cloudinary); if they do not, the application queries the Vehicle Image Data API provided by UKVD (above) to fetch a stock image.

In the Garage, when viewing currently owned vehicles in detail, the application queries the MOT And Tax Status API by UKVD to fetch number of Tax and MOT days left.

### Product roadmap
The app requires buckling down its authentication and authorisation, user profile settings, and general bug fixes. 

In the near future, I plan to add a social feature under /discover which allows users to view featured cars owned by other users as well as having a watchlist for cars that interest the user.

## Getting Started

### Tech Stack

Autotribe is built using Next.js 14 written in Typescript, with their new /App router.
The app is built server-less which means all components by default are server-side components unless explicitly stated as 'use client'. 

The DB of choice is Postgres SQL, and images are hosted on Cloudinary.

There is an example .env file if you would like to spin up a local version and use your own DB, UKVD API Key, and Cloudinary accounts.

For users new to Next.js but with a good understanding of React, I'd highly recommend this tutorial which is the general structure my application follows:

https://nextjs.org/learn/dashboard-app

### Installing
To run Autotribe locally, simply fork the repo and clone it, then: 

 You can run the install inside the root directory:
```
npm i
``` 

Generate a secret key for your application by running this in the terminal to use as AUTH_SECRET in the .env:
```
openssl rand -base64 32
```

Add the relevant fields to .env (using .env.example or below as a template):
```

POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

AUTH_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_BASE_URL=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

UKVD_API_KEY=
```

Then you need to populate the DB with some placeholder data by running the seed function:
```
npm run seed
```


### Executing program

```
npm run dev
```



## Authors

Arjun Gill


## License

Copyright 2024 ARJUN GILL

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments

Inspiration, code snippets, etc.
* [Next.js tutorial](https://nextjs.org/learn/dashboard-app)
* [kevin-sg image-uploader](https://github.com/kevin-sg/nextjs-image-uploader)
