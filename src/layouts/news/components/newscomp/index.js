// C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\news\components\newscomp\index.js

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  // Define custom styles here (if needed)
  categoryButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  categoryButton: {
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    color: "white", // Text color set to white
  },
  breakingNewsCard: {
    backgroundColor: "white",
    color: "white",
    marginBottom: "1rem",
    textAlign: "center",
    padding: "1rem 0",
  },
  newsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  newsTitle: {
    fontWeight: "bold", // Titles set to bold
    color: "white", // Text color set to white
  },
  newsDescription: {
    color: "white", // Text color set to white
    fontSize: "10px", // Adjust the font size for the news description
  },
}));

const NewsComp = () => {
  const classes = useStyles();
  const apiKey = "b18b25b65a8e481397ba2ebefd7835e6";
  const [news, setNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState(null);
  const [category, setCategory] = useState("general");

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    fetchBreakingNews();
    fetchNews();
  }, [category]);

  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=2`
      );
      setBreakingNews(response.data.articles[0]);
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=20`
      );
      // Filter out the breaking news article from the news feed
      const filteredNews = response.data.articles.filter(
        (article) => article.title !== breakingNews?.title
      );
      setNews(filteredNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div>
      <div className={classes.categoryButtonsContainer}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === category ? "contained" : "outlined"}
            color="primary"
            className={classes.categoryButton}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Card className={classes.breakingNewsCard}>
        <CardContent>
          <Typography variant="h1" component="h1" className={classes.newsTitle}>
            Breaking News
          </Typography>
          {breakingNews && (
            <a href={breakingNews.url} target="_blank" rel="noopener noreferrer">
              <Card key={breakingNews.title} className={classes.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={breakingNews.urlToImage}
                  alt={breakingNews.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom className={classes.newsTitle}>
                    {breakingNews.title}
                  </Typography>
                  <Typography variant="body2" color="white" className={classes.newsDescription}>
                    {breakingNews.description}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          )}
        </CardContent>
      </Card>

      <div className={classes.newsContainer}>
        {news.map((article) => (
          <a key={article.title} href={article.url} target="_blank" rel="noopener noreferrer">
            <Card className={classes.card}>
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage || "/placeholder.jpg"}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom className={classes.newsTitle}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="white" className={classes.newsDescription}>
                  {article.description || article.content || article.source.name}
                </Typography>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsComp;
