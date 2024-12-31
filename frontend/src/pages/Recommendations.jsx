import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "../api/axios";
import Survey from "../components/Survey";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [foods, setFoods] = useState([]);
  const [surveyRequired, setSurveyRequired] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPreferences, setNewPreferences] = useState({
    tastes: [],
    regions: [],
    foodType: "",
    excludedSpices: [],
  });
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get("/foods/foods/recommendations");
      if (response.data.surveyRequired) {
        setSurveyRequired(true);
      } else {
        setFoods(response.data);
      }
    } catch (error) {
      console.error("おすすめの取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data } = await axios.get("/users/users/preferences");
      setPreferences(data);
      setNewPreferences(data); // 初期値をフォームに設定
    } catch (error) {
      console.error("設定の取得エラー:", error);
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setNewPreferences((prev) => ({
      ...prev,
      [name]: Array.isArray(value) ? value : value.split(","), // 常に配列にする
    }));
  };

  const updatePreferences = async () => {
    try {
      await axios.put("/users/users/preferences", newPreferences);
      fetchPreferences();
      fetchRecommendations();
      setDialogOpen(false);
    } catch (error) {
      console.error("設定の更新エラー:", error);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const handleToDetail = (id) => {
    navigate(`/foods/${id}`);
  };

  if (surveyRequired) {
    return <Survey onPreferencesSaved={() => setSurveyRequired(false)} />;
  }

  return (
    <Box>
      <Box sx={{ mt: 5, px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          あなたにおすすめの料理
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{ mb: 3, backgroundColor: "#9ACD32" }}
        >
          設定を変更
        </Button>
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
                <Button>お気に入りに追加</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>設定を変更</DialogTitle>
        <DialogContent>
          <TextField
            label="料理の種類"
            select
            name="foodType"
            value={newPreferences.foodType || []}
            onChange={handlePreferenceChange}
            fullWidth
            sx={{ flex: 1, mb: 2 }}
          >
            <MenuItem value="">すべて</MenuItem>
            <MenuItem value="麺類">麺類</MenuItem>
            <MenuItem value="ご飯">ご飯</MenuItem>
            <MenuItem value="バインミー">バインミー</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </TextField>
          <TextField
            label="お好みの味"
            name="tastes"
            value={newPreferences.tastes || []} // 常に配列にする
            onChange={handlePreferenceChange}
            select
            SelectProps={{ multiple: true }}
            fullWidth
            sx={{ mb: 2 }}
          >
            {[
              "甘味", // "sweetness"
              "酸味", // "sourness"
              "塩味", // "saltiness"
              "苦味", // "bitterness"
              "旨味", // "savoriness"
              "辛味", // "spicy"
            ].map((taste) => (
              <MenuItem key={taste} value={taste}>
                {taste}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="お好みの地域"
            name="regions"
            value={newPreferences.regions || []} // 常に配列にする
            onChange={handlePreferenceChange}
            select
            SelectProps={{ multiple: true }}
            fullWidth
            sx={{ mb: 2 }}
          >
            {["北部", "中部", "南部"].map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="嫌いな調味料"
            name="excludedSpices"
            value={newPreferences.excludedSpices} // 常に配列にする
            onChange={handlePreferenceChange}
            fullWidth
            sx={{ mb: 2 }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            キャンセル
          </Button>
          <Button onClick={updatePreferences} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Recommendations;
