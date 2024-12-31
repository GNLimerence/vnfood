import mongoose from "mongoose";
import { Food } from "./models/Food.js";

const sampleFoods = [
  {
    name: "バインミー",
    description: "パテ、肉、そして新鮮な野菜を挟んだサクサクのバインミー。",
    region: "南部",
    tasteTags: ["塩味"],
    foodType: "バインミー",
    ingredients: ["バインミー", "パテ", "肉", "野菜"],
    spices: ["塩", "胡椒"],
    preparationTime: "10分",
    difficultyLevel: "簡単",
    imageUrl:
      "https://www.andy-cooks.com/cdn/shop/articles/20230813061131-andy-20cooks-20-20roast-20pork-20banh-20mi.jpg",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3", // MongoDB ObjectId
    stats: {
      likesCount: 123,
      commentsCount: 10,
      averageRating: 4.8,
      ratingsCount: 25,
    },
    isApproved: true,
  },
  {
    name: "フォー",
    description:
      "伝統的なフォーで、あっさりとしたスープに柔らかい麺と美味しい牛肉が入っています。",
    region: "北部",
    tasteTags: ["塩味", "辛味"],
    foodType: "ヌードル",
    ingredients: ["フォー", "牛肉", "玉ねぎ", "香草"],
    spices: ["塩", "胡椒", "唐辛子"],
    preparationTime: "45分",
    difficultyLevel: "中級",
    imageUrl:
      "https://fohlafood.vn/cdn/shop/articles/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.jpg",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3",
    stats: {
      likesCount: 200,
      commentsCount: 50,
      averageRating: 4.9,
      ratingsCount: 120,
    },
    isApproved: true,
  },
  {
    name: "バインセオ",
    description:
      "サクサクのバインセオを新鮮な野菜と甘酸っぱいソースで食べます。",
    region: "中部",
    tasteTags: ["塩味", "甘味"],
    foodType: "その他",
    ingredients: ["米粉", "エビ", "肉", "もやし"],
    spices: ["塩", "砂糖", "唐辛子"],
    preparationTime: "30分",
    difficultyLevel: "中級",
    imageUrl: "https://via.placeholder.com/300x200",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3",
    stats: {
      likesCount: 80,
      commentsCount: 15,
      averageRating: 4.2,
      ratingsCount: 30,
    },
    isApproved: true,
  },
  {
    name: "ゴイクオン",
    description:
      "新鮮なゴイクオンで、ライスペーパーに包んだ肉、エビ、野菜が入っています。",
    region: "南部",
    tasteTags: ["塩味", "酸味"],
    foodType: "その他",
    ingredients: ["ライスペーパー", "エビ", "肉", "香草"],
    spices: ["ナムヌム", "砂糖", "唐辛子"],
    preparationTime: "20分",
    difficultyLevel: "簡単",
    imageUrl: "https://heyyofoods.com/wp-content/uploads/2024/03/3-4.jpg",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3",
    stats: {
      likesCount: 150,
      commentsCount: 40,
      averageRating: 4.5,
      ratingsCount: 50,
    },
    isApproved: true,
  },
  {
    name: "コムタム",
    description:
      "伝統的なコムタムで、香ばしい焼き豚、ビ、チャーと甘酸っぱい魚醤を使っています。",
    region: "南部",
    tasteTags: ["塩味", "甘味"],
    foodType: "ライス",
    ingredients: ["コムタム", "焼き豚", "ビ", "チャー"],
    spices: ["魚醤", "砂糖", "唐辛子"],
    preparationTime: "30分",
    difficultyLevel: "簡単",
    imageUrl:
      "https://i.ytimg.com/vi/h__kLq8NG2I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDqn7vasJHB1JVJB8uobiB67rxztw",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3",
    stats: {
      likesCount: 180,
      commentsCount: 25,
      averageRating: 4.7,
      ratingsCount: 60,
    },
    isApproved: true,
  },
  {
    name: "ブンボーフエ",
    description:
      "スパイシーで香り高いスープにレモングラスと発酵した魚の香りが合わさった、ブンボーの名物料理。",
    region: "中部",
    tasteTags: ["辛味", "塩味"],
    foodType: "ヌードル",
    ingredients: ["ブン", "牛肉", "スネ肉", "玉ねぎ"],
    spices: ["レモングラス", "発酵魚", "唐辛子", "塩"],
    preparationTime: "60分",
    difficultyLevel: "難しい",
    imageUrl:
      "https://t2.ex-cdn.com/crystalbay.com/resize/1860x570/files/news/2024/08/15/bun-bo-huemon-an-dac-san-noi-tieng-cua-vung-co-do-093837.jpg",
    creator: "64f2a9e6e4b0a3d3e4b9a3d3",
    stats: {
      likesCount: 220,
      commentsCount: 55,
      averageRating: 4.9,
      ratingsCount: 100,
    },
    isApproved: true,
  },
];

async function seedDatabase() {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect(
      "mongodb+srv://phamhoanghainam203:Daihocbachkhoahanoi23102003@cluster0.rxlgp.mongodb.net/vnfood",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Xóa dữ liệu cũ (nếu cần)
    await Food.deleteMany({});

    // Thêm dữ liệu mới
    await Food.insertMany(sampleFoods);

    console.log("Dữ liệu mẫu đã được thêm thành công!");
    process.exit();
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu mẫu:", error);
    process.exit(1);
  }
}

seedDatabase();
