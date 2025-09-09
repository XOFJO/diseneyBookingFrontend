import { useEffect, useState } from "react";
import { getThemes } from "../services/hotelService";

export default function useThemes() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getThemes()
      .then(list => setThemes(list))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  const themeOptions = [
    { id: "all", apiName: "all", name: "全部" },
    ...themes.map((apiName, idx) => ({ id: `theme-${idx + 1}`, apiName, name: apiName }))
  ];

  return { themeOptions, loading, error };
}
