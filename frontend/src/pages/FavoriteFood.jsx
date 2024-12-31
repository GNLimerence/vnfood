import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const FavoriteFood = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const fetchFavoriteFood = async () => {
    try {
      const res = await axios.get("/foods/favorite");
      if (res) {
        setFoods(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchFavoriteFood();
  }, []);

  const handleToDetail = (id) => {
    navigate(`/foods/${id}`);
  };

  return (
    <Box>
      <Box sx={{ mt: 5, px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          あなたのお気に入りの料理
        </Typography>
        <Grid container spacing={3}>
          {foods.map((food) => (
            <Grid item xs={12} sm={6} md={4} key={food._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={food.imageUrl || food.image}
                  alt={food.name}
                />
                <CardContent>
                  <Typography variant="h6">{food.name}</Typography>
                </CardContent>
                <Button
                  onClick={() => handleToDetail(food._id)}
                  variant="contained"
                  sx={{ backgroundColor: "#9ACD32" }}
                >
                  詳細を見る
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FavoriteFood;
