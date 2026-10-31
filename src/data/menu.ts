// Grana menu.
//
// Items tagged `// listed` appear on Grana's public listings (Zomato, District,
// press). Prices tagged `// listed price` come from Zomato. Everything else is a
// placeholder written to match the restaurant's style: check names, prices and
// veg/non-veg marks against the in-store menu before going live.

export type Diet = "veg" | "non-veg";
export type Badge = "signature" | "guest-favourite" | "chef-special";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  diet: Diet;
  image: string;
  badge?: Badge;
}

export interface MenuCategory {
  id: string;
  title: string;
  script: string;
  blurb: string;
  items: MenuItem[];
}

const img = (slug: string) => `/images/menu/${slug}.jpg`;

export const menu: MenuCategory[] = [
  {
    id: "pizza-rossa",
    title: "Pizza Rossa",
    script: "tomato base",
    blurb: "Neapolitan-style bases with a bright tomato sauce, opened by hand and fired until the rim blisters.",
    items: [
      {
        id: "margherita", // listed
        name: "Margherita",
        description: "Tomato, fior di latte, fresh basil and olive oil. The classic we judge ourselves by.",
        price: 550,
        diet: "veg",
        image: img("margherita"),
        badge: "guest-favourite",
      },
      {
        id: "olive-spinaci",
        name: "Olive e Spinaci",
        description: "Tomato, fior di latte, baby spinach, black olives and blistered cherry tomatoes.",
        price: 650,
        diet: "veg",
        image: img("olive-spinaci"),
      },
      {
        id: "ortolana",
        name: "Ortolana",
        description: "Tomato, mozzarella, ribbons of zucchini, sweet peppers and a pinch of chilli.",
        price: 650,
        diet: "veg",
        image: img("ortolana"),
      },
      {
        id: "pepperoni",
        name: "Pepperoni",
        description: "Tomato, fior di latte and a generous layer of pepperoni that crisps at the edges in the fire.",
        price: 850,
        diet: "non-veg",
        image: img("pepperoni"),
      },
      {
        id: "pollo-piccante",
        name: "Pollo Piccante",
        description: "Tomato, mozzarella, spiced chicken, red onion and chilli flakes.",
        price: 780,
        diet: "non-veg",
        image: img("pollo-piccante"),
      },
      {
        id: "carne-macinata", // listed, listed price
        name: "Carne Macinata",
        description: "Tomato, mozzarella and a slow-cooked minced meat ragù with herbs.",
        price: 1050,
        diet: "non-veg",
        image: img("carne-macinata"),
      },
      {
        id: "pancetta-rucola", // listed, listed price
        name: "Pancetta e Rucola",
        description: "Tomato, fior di latte, cured pancetta, wild rocket and shaved grana.",
        price: 1200,
        diet: "non-veg",
        image: img("pancetta-rucola"),
      },
    ],
  },
  {
    id: "pizza-bianca",
    title: "Pizza Bianca",
    script: "no tomato, all heart",
    blurb: "White bases where the cheese, the toppings and that airy crust do all the talking.",
    items: [
      {
        id: "grana-rucola", // listed, listed price
        name: "Grana e Rucola",
        description: "Fior di latte, peppery rocket and a snowfall of grana. Our namesake.",
        price: 700,
        diet: "veg",
        image: img("grana-rucola"),
        badge: "signature",
      },
      {
        id: "white-funghi", // listed
        name: "White Funghi",
        description: "Fior di latte, roasted mushrooms and a slow drizzle of truffle oil.",
        price: 750,
        diet: "veg",
        image: img("white-funghi"),
        badge: "guest-favourite",
      },
      {
        id: "bianca-spinaci",
        name: "Bianca Spinaci",
        description: "Fior di latte, spinach, olive tapenade, ricotta and torn basil.",
        price: 680,
        diet: "veg",
        image: img("bianca-spinaci"),
      },
      {
        id: "quattro-formaggi",
        name: "Quattro Formaggi",
        description: "Mozzarella, ricotta, gouda and parmesan. Four cheeses, zero regrets.",
        price: 800,
        diet: "veg",
        image: img("quattro-formaggi"),
      },
      {
        id: "white-brisket", // listed
        name: "White Brisket",
        description: "Smoky, tender brisket on a white base with fior di latte and fresh greens.",
        price: 1100,
        diet: "non-veg",
        image: img("white-brisket"),
        badge: "guest-favourite",
      },
      {
        id: "burrata-crudo",
        name: "Burrata e Crudo",
        description: "Cherry tomatoes, rocket, cured ham and a whole burrata, torn open at the table.",
        price: 1250,
        diet: "non-veg",
        image: img("burrata-crudo"),
        badge: "chef-special",
      },
    ],
  },
  {
    id: "antipasti",
    title: "Antipasti",
    script: "to start",
    blurb: "Small plates for the table while the oven does its thing.",
    items: [
      {
        id: "fried-ravioli", // listed, listed price
        name: "Fried 3 Cheese Ravioli",
        description: "Golden, crisp ravioli stuffed with three cheeses, with marinara for dipping.",
        price: 480,
        diet: "veg",
        image: img("fried-ravioli"),
        badge: "guest-favourite",
      },
      {
        id: "truffle-fries", // listed
        name: "Truffle Parmesan Fries",
        description: "Hot fries tossed with truffle oil, grated parmesan and parsley.",
        price: 320,
        diet: "veg",
        image: img("truffle-fries"),
      },
      {
        id: "garlic-bread",
        name: "Garlic Bread",
        description: "Our dough, brushed with garlic butter and herbs and finished with mozzarella.",
        price: 260,
        diet: "veg",
        image: img("garlic-bread"),
      },
      {
        id: "polpette", // listed
        name: "Polpette al Sugo",
        description: "Meatballs braised in tomato sugo with basil, with warm bread to mop it up.",
        price: 390,
        diet: "non-veg",
        image: img("polpette"),
      },
      {
        id: "chicken-wings", // listed, listed price
        name: "Chicken Wings",
        description: "Crispy wings in a sticky, spicy glaze.",
        price: 460,
        diet: "non-veg",
        image: img("chicken-wings"),
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    script: "twirl & repeat",
    blurb: "Comforting bowls of pasta, made to order.",
    items: [
      {
        id: "truffle-mushroom-spaghetti", // listed
        name: "Truffle Mushroom Spaghetti",
        description: "Spaghetti in a silky mushroom and truffle sauce, finished with parmesan.",
        price: 620,
        diet: "veg",
        image: img("truffle-mushroom-spaghetti"),
        badge: "guest-favourite",
      },
      {
        id: "three-cheese-ravioli", // listed
        name: "3 Cheese Ravioli",
        description: "Ravioli filled with gouda, ricotta and Belper Knolle in a light butter sauce.",
        price: 590,
        diet: "veg",
        image: img("three-cheese-ravioli"),
      },
      {
        id: "spinach-ricotta-tortellini", // listed
        name: "Spinach & Ricotta Tortellini",
        description: "Tortellini with spinach and ricotta, served with marinara and fresh mozzarella.",
        price: 560,
        diet: "veg",
        image: img("spinach-ricotta-tortellini"),
      },
      {
        id: "aglio-olio",
        name: "Aglio e Olio",
        description: "Spaghetti, garlic, olive oil, chilli and parsley. Simple, done right.",
        price: 420,
        diet: "veg",
        image: img("aglio-olio"),
      },
      {
        id: "pomodoro",
        name: "Spaghetti Pomodoro",
        description: "Slow-cooked tomato sauce, fresh basil and parmesan.",
        price: 450,
        diet: "veg",
        image: img("pomodoro"),
      },
      {
        id: "spaghetti-polpette",
        name: "Spaghetti & Polpette",
        description: "Our meatballs in tomato sugo, piled over spaghetti.",
        price: 640,
        diet: "non-veg",
        image: img("spaghetti-polpette"),
      },
    ],
  },
  {
    id: "insalate",
    title: "Insalate",
    script: "fresh & green",
    blurb: "Bright, simple salads to keep things light.",
    items: [
      {
        id: "caprese",
        name: "Caprese",
        description: "Tomato, fior di latte, basil, olive oil and a pinch of sea salt.",
        price: 420,
        diet: "veg",
        image: img("caprese"),
      },
      {
        id: "panzanella",
        name: "Panzanella",
        description: "Toasted bread, ripe tomatoes, cucumber, red onion and basil.",
        price: 360,
        diet: "veg",
        image: img("panzanella"),
      },
      {
        id: "rucola-crudo",
        name: "Rucola e Crudo",
        description: "Rocket, cured ham, cherry tomatoes and shaved parmesan.",
        price: 540,
        diet: "non-veg",
        image: img("rucola-crudo"),
      },
    ],
  },
  {
    id: "panini",
    title: "Panini",
    script: "between bread",
    blurb: "Warm, pressed sandwiches for a quick lunch.",
    items: [
      {
        id: "caprese-panino",
        name: "Caprese Panino",
        description: "Mozzarella, tomato, pesto and rocket, pressed warm.",
        price: 380,
        diet: "veg",
        image: img("caprese-panino"),
      },
      {
        id: "pollo-panino",
        name: "Pollo Panino",
        description: "Grilled chicken, greens, tomato and garlic aioli.",
        price: 420,
        diet: "non-veg",
        image: img("pollo-panino"),
      },
      {
        id: "cotto-panino",
        name: "Cotto e Formaggio",
        description: "Ham, cheese and greens in a crusty roll.",
        price: 440,
        diet: "non-veg",
        image: img("cotto-panino"),
      },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    script: "save room",
    blurb: "A very good reason to save the dessert.",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        description: "Coffee-soaked savoiardi, mascarpone cream and a heavy dusting of cocoa, served in a glass.",
        price: 320,
        diet: "veg",
        image: img("tiramisu"),
        badge: "signature",
      },
      {
        id: "panna-cotta", // listed
        name: "Panna Cotta",
        description: "Silky vanilla cream with a bright berry compote.",
        price: 280,
        diet: "veg",
        image: img("panna-cotta"),
      },
      {
        id: "chocolate-mousse", // listed
        name: "Chocolate Mousse",
        description: "Dark, airy and just bitter enough.",
        price: 300,
        diet: "veg",
        image: img("chocolate-mousse"),
      },
    ],
  },
  {
    id: "bevande",
    title: "Bevande",
    script: "something to sip",
    blurb: "Coffee, coolers and the odd cherry on top.",
    items: [
      {
        id: "shirley-temple", // listed
        name: "Shirley Temple",
        description: "Ginger ale, grenadine and a cherry on top.",
        price: 220,
        diet: "veg",
        image: img("shirley-temple"),
      },
      {
        id: "tiramisu-latte", // listed
        name: "Tiramisu Latte",
        description: "Espresso and milk with mascarpone cream, dusted with cocoa.",
        price: 260,
        diet: "veg",
        image: img("tiramisu-latte"),
        badge: "signature",
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Double shot, velvety foam.",
        price: 180,
        diet: "veg",
        image: img("cappuccino"),
      },
      {
        id: "caffe-latte",
        name: "Caffè Latte",
        description: "Espresso with plenty of steamed milk.",
        price: 190,
        diet: "veg",
        image: img("caffe-latte"),
      },
      {
        id: "arancia-spritz",
        name: "Arancia Spritz",
        description: "Alcohol-free: orange, cherry and soda over ice.",
        price: 220,
        diet: "veg",
        image: img("arancia-spritz"),
      },
      {
        id: "mint-lemonade",
        name: "Mint Lemonade",
        description: "Fresh lemon, mint and a little sugar, shaken cold.",
        price: 160,
        diet: "veg",
        image: img("mint-lemonade"),
      },
      {
        id: "fresh-lime-soda",
        name: "Fresh Lime Soda",
        description: "Sweet, salted or both. The Kerala way.",
        price: 120,
        diet: "veg",
        image: img("fresh-lime-soda"),
      },
    ],
  },
];

export const allItems = menu.flatMap((c) => c.items);

export function findItem(id: string): MenuItem | undefined {
  return allItems.find((i) => i.id === id);
}

export const badgeLabel: Record<Badge, string> = {
  signature: "Signature",
  "guest-favourite": "Guest favourite",
  "chef-special": "Chef's special",
};

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
