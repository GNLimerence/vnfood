import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "../api/axios";

const Survey = ({ onPreferencesSaved }) => {
  const [preferences, setPreferences] = useState({
    tastes: [],
    regions: [],
    foodType: "",
    excludedSpices: [],
  });

  const handleChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const savePreferences = async () => {
    try {
      await axios.put("/users/users/preferences", preferences);
      onPreferencesSaved();
    } catch (error) {
      console.error("設定の保存エラー:", error);
    }
  };

  return (
    <Box>
      <h2>アンケート: お好みを入力してください</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>お好みの味</InputLabel>
        <Select
          multiple
          value={preferences.tastes}
          onChange={(e) => handleChange("tastes", e.target.value)}
        >
          <MenuItem value="甘い">甘い</MenuItem>
          <MenuItem value="酸っぱい">酸っぱい</MenuItem>
          <MenuItem value="塩辛い">塩辛い</MenuItem>
          <MenuItem value="苦い">苦い</MenuItem>
          <MenuItem value="旨味">旨味</MenuItem>
          <MenuItem value="辛い">辛い</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>お好みの地域</InputLabel>
        <Select
          multiple
          value={preferences.regions}
          onChange={(e) => handleChange("regions", e.target.value)}
        >
          <MenuItem value="北部">北部</MenuItem>
          <MenuItem value="中央部">中央部</MenuItem>
          <MenuItem value="南部">南部</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>お好みの料理タイプ</InputLabel>
        <Select
          value={preferences.foodType}
          onChange={(e) => handleChange("foodType", e.target.value)}
        >
          <MenuItem value="麺類">麺類</MenuItem>
          <MenuItem value="ご飯">ご飯</MenuItem>
          <MenuItem value="バインミー">バインミー</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>嫌いな調味料</InputLabel>
        <Select
          multiple
          value={preferences.excludedSpices}
          onChange={(e) => handleChange("excludedSpices", e.target.value)}
        >
          <MenuItem value="胡椒">胡椒</MenuItem>
          <MenuItem value="塩">塩</MenuItem>
          <MenuItem value="唐辛子">唐辛子</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={savePreferences} variant="contained" color="primary">
        保存
      </Button>
    </Box>
  );
};

export default Survey;
