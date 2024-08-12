import { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      setImages(response.data.results);
    } catch (err) {
      setError("Failed to fetch images.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages();
    }
  };

  return (
    <div className="image-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="image-gallery">
        {images.length > 0 &&
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              style={{ margin: "5px", borderRadius: "5px", width: "200px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSearch;
