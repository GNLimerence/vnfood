import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Chip,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const FoodDetail = () => {
  const { id } = useParams(); // URLからIDを取得
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(""); // 新しいコメントの状態
  const [newRating, setNewRating] = useState(""); // 新しい評価の状態
  const navigate = useNavigate();

  // コメントと評価のダミーデータ
  const fakeComments = [
    {
      username: "Nguyen Thi Mai",
      comment: "この料理は素晴らしい、味がとても特徴的です！",
      date: "2024-12-28",
    },
    {
      username: "Trung Anh",
      comment: "おいしい！すぐにこの料理を作り直します！",
      date: "2024-12-27",
    },
    {
      username: "Linh Hoang",
      comment: "この料理はとても香り高く、風味豊かです！",
      date: "2024-12-26",
    },
  ];

  const fakeRatings = [
    { username: "Minh Tu", rating: 5, date: "2024-12-28" },
    { username: "Phuong Lam", rating: 4, date: "2024-12-27" },
    { username: "Kien Vo", rating: 4, date: "2024-12-26" },
  ];

  useEffect(() => {
    // APIから料理詳細を取得
    const fetchFoodDetail = async () => {
      try {
        const response = await axios.get(`/foods/foods/${id}`);
        // ダミーデータをレスポンスデータに追加
        const foodWithFakeData = {
          ...response.data,
          comments: fakeComments,
          ratings: fakeRatings,
        };
        setFood(foodWithFakeData);
        setLoading(false);
      } catch (error) {
        console.error("料理情報の取得中にエラーが発生しました:", error);
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    // 新しいコメントをリストに追加
    const updatedComments = [
      ...food.comments,
      {
        username: "Admin",
        comment: newComment,
        date: new Date().toISOString(),
      },
    ];
    setFood({ ...food, comments: updatedComments });
    setNewComment(""); // コメント追加後に入力をクリア
  };

  const handleAddRating = () => {
    const ratingValue = parseInt(newRating, 10);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) return;
    // 新しい評価をリストに追加
    const updatedRatings = [
      ...food.ratings,
      { username: "User", rating: ratingValue, date: new Date().toISOString() },
    ];
    setFood({ ...food, ratings: updatedRatings });
    setNewRating(""); // 評価追加後に入力をクリア
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!food) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        料理が見つかりませんでした。
      </Typography>
    );
  }

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <IconButton onClick={handleBackToHome}>
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={4}>
        {/* 料理の画像 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={food.imageUrl || "https://via.placeholder.com/400"}
              alt={food.name}
            />
          </Card>
        </Grid>

        {/* 料理の詳細 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {food.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {food.region === "north"
              ? "北部"
              : food.region === "mid"
              ? "中央部"
              : "南部"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {food.description}
          </Typography>

          {/* 味の特徴 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              味の特徴:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {food.tasteTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          {/* 材料 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              材料:
            </Typography>
            <Typography variant="body2">
              {food.ingredients.join(", ") || "不明"}
            </Typography>
          </Box>

          {/* スパイス */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              スパイス:
            </Typography>
            <Typography variant="body2">
              {food.spices.join(", ") || "不明"}
            </Typography>
          </Box>

          {/* 準備時間と難易度 */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              準備時間:
            </Typography>
            <Typography variant="body2">
              {food.preparationTime || "不明"}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              難易度:
            </Typography>
            <Typography variant="body2">
              {food.difficultyLevel || "不明"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 統計情報 */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          統計情報:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body1">いいね数:</Typography>
            <Typography variant="h6">{food.stats.likesCount}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1">コメント数:</Typography>
            <Typography variant="h6">{food.stats.commentsCount}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1">平均評価:</Typography>
            <Typography variant="h6">{food.stats.averageRating}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1">評価数:</Typography>
            <Typography variant="h6">{food.stats.ratingsCount}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* コメントセクション */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          コメント:
        </Typography>
        <Box>
          {food.comments.map((comment, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {comment.username}:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {comment.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(comment.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* コメント追加フォーム */}
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="コメントを追加"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            sx={{ mt: 2, backgroundColor: "#9ACD32" }}
          >
            コメントを追加
          </Button>
        </Box>
      </Box>

      {/* 評価セクション */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          評価:
        </Typography>
        <Box>
          {food.ratings.map((rating, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {rating.username}:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {`⭐ ${rating.rating}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(rating.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 評価追加フォーム */}
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="評価 (1-5)"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Button
            variant="contained"
            onClick={handleAddRating}
            sx={{ mt: 2, backgroundColor: "#9ACD32" }}
          >
            評価を追加
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FoodDetail;
