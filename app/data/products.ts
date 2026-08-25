export type Product = {
    id: number;
    code: string;
    name: string;
    description: string;
    price: string;
    category: "تیشرت" | "شلوار" | "کلاه";
    badge?: string;
    image: string;
  };
  
  export const products: Product[] = [
    {
      id: 1,
      code: "TS001",
      name: "تیشرت مینیمال",
      description: "تیشرت راحت و شیک",
      price: "۸۹۰,۰۰۰ تومان",
      category: "تیشرت",
      badge: "ویژه",
      image: "/media/تیشرت.png",
    },
  
    {
      id: 2,
      code: "TS002",
      name: "تیشرت کلاسیک",
      description: "سادگی همیشه جذابه",
      price: "۷۹۰,۰۰۰ تومان",
      category: "تیشرت",
      image: "/media/تیشرت.png",
    },
  
    {
      id: 3,
      code: "PA001",
      name: "شلوار کژوال",
      description: "استایل راحت روزمره",
      price: "۱,۲۵۰,۰۰۰ تومان",
      category: "شلوار",
      badge: "جدید",
      image: "/media/شلوار.png",
    },
  
    {
      id: 4,
      code: "PA002",
      name: "شلوار کتان",
      description: "نرم و مناسب استفاده روزانه",
      price: "۱,۴۹۰,۰۰۰ تومان",
      category: "شلوار",
      image: "/media/شلوار.png",
    },
  
    {
      id: 5,
      code: "HA001",
      name: "کلاه مینیمال",
      description: "کلاه شیک و مناسب استایل روزمره",
      price: "۵۹۰,۰۰۰ تومان",
      category: "کلاه",
      badge: "ویژه",
      image: "/media/کلاه.png",
    },
  
    {
      id: 6,
      code: "HA002",
      name: "کلاه سبز پاستیلی",
      description: "استایل خاص و متفاوت",
      price: "۶۹۰,۰۰۰ تومان",
      category: "کلاه",
      badge: "محبوب",
      image: "/media/کلاه.png",
    },
  ];