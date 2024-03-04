const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    first_name: 'Arjun',
    last_name: 'Gill',
    username: '@gillsbmw',
    email: 'user@example.com',
    password: 'password',
    profile_pic:
      'https://scontent.cdninstagram.com/v/t51.2885-19/311030754_863920138352176_7083972161174976267_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-lhr6-2.cdninstagram.com&_nc_cat=104&_nc_ohc=mwg8Cj5RMpsAX_yu0MW&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBTIcRMmYjUkkXno8aIHgZ5mqaXB7emyixZepVwTnR6OQ&oe=65E7908C&_nc_sid=8b3546',
  },
];

const vehicles = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'AB12 CDE',
    make: 'BMW',
    model: '3 Series',
    colour: 'Black',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/364958952_1862319434216151_7971310154656326421_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=YqovWLNvsLgAX9xIVCU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE2MjcwMzYxMTI3ODk2NTQ3Mg%3D%3D.2-ccb7-5&oh=00_AfDZumGAZMzpLRjJ-F1qEMHUZiyaEn27S5QrVjaDgzl6xw&oe=65E43272&_nc_sid=10d13b',
    ],
    description:
      'A sleek black BMW 3 Series, known for its smooth handling and elegant design.',
    current: true,
  },
  {
    id: '765ef344-9d85-4d26-aeda-a56731c8b9a7',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'EF34 GHJ',
    make: 'BMW',
    model: 'X5',
    colour: 'White',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/387268357_997461054926556_5310280274974821083_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=w2QncawRQ8YAX9HQLT3&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzIwOTE1NDQyNzc1MzgzNDUxMA%3D%3D.2-ccb7-5&oh=00_AfCKeMDmUuuWVWXKYQxS5J68vz37eE2k-RP0JVInJretPw&oe=65E3A214&_nc_sid=10d13b',
    ],
    description:
      'A luxurious white BMW X5, perfect for those who value comfort and style in an SUV.',
    current: false,
  },
  {
    id: '24ee3f0a-4dac-45e9-9550-67516b1f4154',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'IJ45 KLM',
    make: 'BMW',
    model: 'M4',
    colour: 'Red',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/163577715_190432079274085_3894011626656277302_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=VxunZuDZ1W8AX_5_4S1&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MjUzNTk4OTQzNzcwNDYwOTY3Mg%3D%3D.2-ccb7-5&oh=00_AfCFLyWndsaucDXgH3CAtzCZ2h8wCaqct5DlbeicTVqjlg&oe=65E3D5E6&_nc_sid=10d13b',
    ],
    description:
      'A vibrant red BMW M4, offering an exhilarating driving experience with top performance.',
    current: true,
  },
  {
    id: 'c430f421-20d4-4bd5-b9a7-12421c1bdaf1',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'NO67 PQRS',
    make: 'BMW',
    model: '5 Series',
    colour: 'Blue',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/41595640_702506756780242_8903159143821150016_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=Jis-J_8Fhp8AX8bVs7j&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MTg2OTA3MTA1MDUwOTY0NDIzMA%3D%3D.2-ccb7-5&oh=00_AfBIkNtDTnjlEwss_OY2i2-Yx3uRNJhjv0gkinapca9YjQ&oe=65E678A0&_nc_sid=10d13b',
    ],
    description:
      'An elegant blue BMW 5 Series, known for its luxury and advanced technology features.',
    current: false,
  },
  {
    id: 'bd6bc0f6-e95d-4762-88af-2b0ef1d99c06',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'TU78 VWX',
    make: 'BMW',
    model: 'Z4',
    colour: 'Silver',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/275895655_538768201012110_686068700618018927_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=dA6HBJ8q5nkAX_aLIfm&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=Mjc5NjU2MTk0ODM3OTA3NzU3NA%3D%3D.2-ccb7-5&oh=00_AfBGlXjeh7hzl23FB8AsV5uCAuJJK3_ffBvtH8cdYqeBUA&oe=65E3C42B&_nc_sid=10d13b',
    ],
    description:
      'A sleek silver BMW Z4, combining sporty performance with a refined, convertible design.',
    current: true,
  },
  {
    id: '75bd73f5-a2f9-43fb-9342-1568fed10961',
    owner_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    vrm: 'YZ12 ABC',
    make: 'BMW',
    model: 'i8',
    colour: 'Green',
    images: [
      'https://scontent.cdninstagram.com/v/t51.2885-15/364958952_1862319434216151_7971310154656326421_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=YqovWLNvsLgAX9xIVCU&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE2MjcwMzYxMTI3ODk2NTQ3Mg%3D%3D.2-ccb7-5&oh=00_AfDZumGAZMzpLRjJ-F1qEMHUZiyaEn27S5QrVjaDgzl6xw&oe=65E43272&_nc_sid=10d13b',
    ],
    description:
      'A futuristic green BMW i8, showcasing innovative design and hybrid technology.',
    current: false,
  },
];

const entries = [
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2023-04-27',
    date_completed: '2023-08-02',
    entry: 'Transmission fluid replacement',
    complete: true,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2021-10-22',
    date_completed: null,
    entry: 'Air conditioning system check',
    complete: false,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2021-07-03',
    date_completed: null,
    entry: 'Battery inspection and replacement',
    complete: false,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2022-03-29',
    date_completed: null,
    entry: 'Oil change and filter replacement',
    complete: false,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2020-09-03',
    date_completed: '2022-06-14',
    entry: 'Tire rotation and alignment',
    complete: true,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2021-05-01',
    date_completed: '2022-03-24',
    entry: 'Radiator flush and fill',
    complete: true,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2021-04-08',
    date_completed: null,
    entry: 'Engine diagnostic and tune-up',
    complete: false,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2022-08-21',
    date_completed: '2023-12-11',
    entry: 'Tire rotation and alignment',
    complete: true,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2024-01-09',
    date_completed: '2024-02-14',
    entry: 'Radiator flush and fill',
    complete: true,
  },
  {
    vehicle_id: '7a6350a4-9a0e-4575-b6b1-1372af02f345',
    date_added: '2024-02-23',
    date_completed: null,
    entry: 'Headlight and taillight inspection',
    complete: false,
  },
];

module.exports = {
  vehicles,
  users,
  entries,
};
