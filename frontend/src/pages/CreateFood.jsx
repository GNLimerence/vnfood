import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import axios from "axios";

const CreateFoodPage = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    region: "",
    tasteTags: "",
    foodType: "",
    ingredients: "",
    spices: "",
    preparationTime: "",
    difficultyLevel: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 入力の変更を処理
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 画像のアップロードを処理
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // フォーム送信を処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("画像をアップロードしてください。");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("region", foodData.region);
    formData.append("tasteTags", foodData.tasteTags);
    formData.append("foodType", foodData.foodType);
    formData.append("ingredients", foodData.ingredients);
    formData.append("spices", foodData.spices);
    formData.append("preparationTime", foodData.preparationTime);
    formData.append("difficultyLevel", foodData.difficultyLevel);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/foods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      console.log("料理が作成されました:", response.data);
      // フォームのリセット
      setFoodData({
        name: "",
        description: "",
        region: "",
        tasteTags: "",
        foodType: "",
        ingredients: "",
        spices: "",
        preparationTime: "",
        difficultyLevel: "",
      });
      setImage(null);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || "エラーが発生しました");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        新しい料理を作成
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="料理名"
              variant="outlined"
              fullWidth
              required
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="説明"
              variant="outlined"
              fullWidth
              required
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="地域"
              variant="outlined"
              fullWidth
              required
              name="region"
              value={foodData.region}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="味のタグ"
              variant="outlined"
              fullWidth
              name="tasteTags"
              value={foodData.tasteTags}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="料理タイプ"
              variant="outlined"
              fullWidth
              required
              name="foodType"
              value={foodData.foodType}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="材料"
              variant="outlined"
              fullWidth
              name="ingredients"
              value={foodData.ingredients}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="スパイス"
              variant="outlined"
              fullWidth
              name="spices"
              value={foodData.spices}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="準備時間"
              variant="outlined"
              fullWidth
              name="preparationTime"
              value={foodData.preparationTime}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="難易度"
              variant="outlined"
              fullWidth
              name="difficultyLevel"
              value={foodData.difficultyLevel}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ backgroundColor: "#9ACD32" }}
            >
              画像をアップロード
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ backgroundColor: "#9ACD32" }}
            >
              {loading ? "作成中..." : "料理を作成"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateFoodPage;
