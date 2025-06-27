// src/data/categoryFilters.ts

export const categoryFilters: {
  [category: string]: {
    [filterType: string]: string[];
  };
} = {
  "tops": {
    Color: ["Red", "Blue", "Black", "White"],
    Size: ["XS", "S", "M", "L", "XL"],
    Material: ["Cotton", "Polyester", "Linen"]
  },
  "smartphones": {
    Brand: ["Apple", "Samsung", "OnePlus", "Xiaomi"],
    Storage: ["64GB", "128GB", "256GB"],
    RAM: ["4GB", "6GB", "8GB"]
  },
  "womens-jewellery": {
    Type: ["Necklace", "Earrings", "Rings"],
    Material: ["Gold", "Silver", "Diamond"],
    Occasion: ["Casual", "Wedding", "Office"]
  },
  "beauty": {
    Type: ["Makeup", "Skincare", "Haircare"],
    Brand: ["Lakme", "Maybelline", "L'Oreal"]
  },
  "fragrances": {
    Gender: ["Men", "Women", "Unisex"],
    Type: ["Perfume", "Deodorant", "Body Mist"]
  },
  "furniture": {
    Room: ["Living Room", "Bedroom", "Office"],
    Material: ["Wood", "Metal", "Plastic"]
  },
  "groceries": {
    Category: ["Vegetables", "Fruits", "Dairy"],
    Organic: ["Yes", "No"]
  },
  "home-decoration": {
    Type: ["Wall Art", "Lamps", "Vases"],
    Style: ["Modern", "Classic", "Minimal"]
  },
  "kitchen-accessories": {
    Type: ["Utensils", "Storage", "Cookware"],
    Material: ["Steel", "Plastic", "Glass"]
  },
  "laptops": {
    Brand: ["HP", "Dell", "Apple", "Lenovo"],
    RAM: ["8GB", "16GB", "32GB"],
    Storage: ["256GB", "512GB", "1TB"]
  },
  "mens-shirts": {
    Color: ["White", "Blue", "Black", "Grey"],
    Size: ["S", "M", "L", "XL"],
    Fit: ["Slim", "Regular"]
  },
  "mens-shoes": {
    Type: ["Sneakers", "Formal", "Sandals"],
    Size: ["7", "8", "9", "10", "11"]
  },
  "mens-watches": {
    Brand: ["Casio", "Fossil", "Timex"],
    Strap: ["Leather", "Metal", "Silicone"]
  },
  "mobile-accessories": {
    Type: ["Cables", "Chargers", "Cases"],
    CompatibleWith: ["Android", "iPhone"]
  },
  "motorcycle": {
    Type: ["Helmet", "Gloves", "Jacket"],
    Brand: ["Royal Enfield", "KTM", "TVS"]
  },
  "skin-care": {
    Type: ["Moisturizer", "Sunscreen", "Face Wash"],
    SkinType: ["Oily", "Dry", "Normal"]
  },
  "sports-accessories": {
    Sport: ["Cricket", "Football", "Gym"],
    Type: ["Gloves", "Balls", "Bags"]
  },
  "sunglasses": {
    Gender: ["Men", "Women", "Unisex"],
    Frame: ["Metal", "Plastic"],
    Shape: ["Aviator", "Wayfarer", "Round"]
  },
  "tablets": {
    Brand: ["Apple", "Samsung", "Lenovo"],
    Storage: ["64GB", "128GB", "256GB"]
  },
  "vehicle": {
    Type: ["Scooter", "Bike", "Car Accessories"],
    FuelType: ["Petrol", "Electric"]
  },
  "womens-bags": {
    Type: ["Handbag", "Sling", "Backpack"],
    Material: ["Leather", "Canvas", "Synthetic"]
  },
  "womens-dresses": {
    Color: ["Red", "Pink", "Black"],
    Size: ["XS", "S", "M", "L", "XL"]
  },
  "womens-shoes": {
    Type: ["Heels", "Flats", "Boots"],
    Size: ["5", "6", "7", "8", "9"]
  },
  "womens-watches": {
    Brand: ["Titan", "Fastrack", "Daniel Wellington"],
    Strap: ["Leather", "Metal"]
  }
};
