import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../context/AuthContext";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const { auth } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    region: "",
    tasteTags: [],
    foodType: "",
    ingredients: "",
    spices: "",
  });
  const navigate = useNavigate();

  // Fetch foods từ API
  const fetchFoods = async (filterParams = {}) => {
    try {
      const response = await axios.get("/foods/foods", {
        params: filterParams,
      });
      setFoods(response.data);
    } catch (error) {
      console.error("食品の取得中にエラーが発生しました:", error);
    }
  };

  // Fetch tất cả món ăn khi component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  // Xử lý khi filter thay đổi
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi hương vị (multi-select)
  const handleTasteTagsChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      tasteTags: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Áp dụng filter
  const applyFilters = () => {
    const filterParams = {
      ...filters,
      tasteTags: filters.tasteTags.join(","),
    };
    fetchFoods(filterParams);
  };

  const handleToDetail = (id) => {
    navigate(`/foods/${id}`);
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post(`/interactions/foods/${id}/like`);
      if (res) {
        fetchFoods();
      }
    } catch (error) {}
  };

  const tasteOptions = [
    "甘味", // "sweetness"
    "酸味", // "sourness"
    "塩味", // "saltiness"
    "苦味", // "bitterness"
    "旨味", // "savoriness"
    "辛味", // "spicy"
  ];

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        すべての料理
      </Typography>

      {/* Filter Form */}
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="地域"
          select
          name="region"
          value={filters.region}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: 1 }}
        >
          <MenuItem value="">すべて</MenuItem>
          <MenuItem value="北部">北部</MenuItem>
          <MenuItem value="中部">中部</MenuItem>
          <MenuItem value="南部">南部</MenuItem>
        </TextField>
        <TextField
          label="料理の種類"
          select
          name="foodType"
          value={filters.foodType}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: 1 }}
        >
          <MenuItem value="">すべて</MenuItem>
          <MenuItem value="ヌードル">ヌードル</MenuItem>
          <MenuItem value="ライス">ライス</MenuItem>
          <MenuItem value="バインミー">バインミー</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </TextField>

        {/* Multi-select for Taste Tags */}
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="taste-tags-label">味</InputLabel>
          <Select
            labelId="taste-tags-label"
            id="taste-tags-select"
            multiple
            value={filters.tasteTags}
            onChange={handleTasteTagsChange}
            input={<OutlinedInput label="味" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {tasteOptions.map((taste) => (
              <MenuItem key={taste} value={taste}>
                {taste}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="材料"
          name="ingredients"
          value={filters.ingredients}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: 1 }}
          placeholder="肉、野菜"
        />
        <TextField
          label="スパイス"
          name="spices"
          value={filters.spices}
          onChange={handleFilterChange}
          fullWidth
          sx={{ flex: 1 }}
          placeholder="塩、胡椒"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#9ACD32" }}
          onClick={applyFilters}
        >
          フィルター
        </Button>
      </Box>

      {/* Food List */}
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
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleToDetail(food._id)}
                  sx={{ backgroundColor: "#9ACD32" }}
                >
                  詳細を見る
                </Button>
                {auth?.user?.favoriteFood?.includes(food._id) ? (
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleLike(food._id)}
                    disabled
                  >
                    お気に入り済み
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleLike(food._id)}
                  >
                    お気に入り
                  </Button>
                )}
                <div>
                  {food.stats.likesCount}{" "}
                  <FavoriteIcon sx={{ color: "#e31b23" }} />
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodList;
