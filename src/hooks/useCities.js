import { useEffect, useState } from "react";
import { getCities } from "../services/hotelService";

export default function useCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCities()
      .then(list => setCities(list))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  const cityOptions = [
    { id: "all", name: "全部" },
    ...cities.map((name, idx) => ({ id: `city-${idx + 1}`, name }))
  ];

  return { cityOptions, loading, error };
}
