import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/bootstrap.custom.css";

const FoodCarousel = () => {
  const foods = [
    {
      id: 1,
      name: "バインミー",
      image:
        "https://www.andy-cooks.com/cdn/shop/articles/20230813061131-andy-20cooks-20-20roast-20pork-20banh-20mi.jpg?v=1691997210&width=1600",
    },
    {
      id: 2,
      name: "フォー",
      image:
        "https://fohlafood.vn/cdn/shop/articles/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.jpg?v=1712213789",
    },
    {
      id: 3,
      name: "ブンボーフエ",
      image:
        "https://t2.ex-cdn.com/crystalbay.com/resize/1860x570/files/news/2024/08/15/bun-bo-huemon-an-dac-san-noi-tieng-cua-vung-co-do-093837.jpg",
    },
  ];

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {foods.map((food) => (
        <Carousel.Item key={food.id}>
          <Link to={`/food/${food.id}`}>
            <Image
              src={food.image}
              alt={food.name}
              fluid
              style={{
                maxHeight: "500px", // Giới hạn chiều cao
                width: "100%",
                objectFit: "cover", // Cắt hình vừa khung
              }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white">{food.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FoodCarousel;
