export interface PropertyMock {
  id: string
  address: string
  cityState: string
  price: number
  beds: number
  baths: number
  sqft: number
  image: string
  mapIndex: number
  top: string
  left: string
}

export const propertiesData: PropertyMock[] = [
  {
    id: "p1",
    address: "123 Oak St",
    cityState: "Memphis, TN",
    price: 245000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
    mapIndex: 7,
    top: "30%",
    left: "75%",
  },
  {
    id: "p2",
    address: "876 Pine Ave",
    cityState: "Dallas, TX",
    price: 320000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
    mapIndex: 12,
    top: "35%",
    left: "60%",
  },
  {
    id: "p3",
    address: "221 Maple Dr",
    cityState: "Houston, TX",
    price: 275000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400",
    mapIndex: 9,
    top: "55%",
    left: "65%",
  },
  {
    id: "p4",
    address: "456 Elm St",
    cityState: "Nashville, TN",
    price: 350000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=400",
    mapIndex: 5,
    top: "35%",
    left: "40%",
  },
  {
    id: "p5",
    address: "980 Cedar Ln",
    cityState: "Austin, TX",
    price: 425000,
    beds: 5,
    baths: 4,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
    mapIndex: 11,
    top: "70%",
    left: "65%",
  },
  {
    id: "p6",
    address: "334 Birch Rd",
    cityState: "San Antonio, TX",
    price: 195000,
    beds: 2,
    baths: 1.5,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400",
    mapIndex: 3,
    top: "68%",
    left: "30%",
  },
  {
    id: "p7",
    address: "555 Walnut St",
    cityState: "Dallas, TX",
    price: 299000,
    beds: 3,
    baths: 2,
    sqft: 1950,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
    mapIndex: 8,
    top: "45%",
    left: "45%",
  },
  {
    id: "p8",
    address: "777 Spruce Ct",
    cityState: "Memphis, TN",
    price: 310000,
    beds: 4,
    baths: 2.5,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=400",
    mapIndex: 6,
    top: "58%",
    left: "50%",
  }
]
