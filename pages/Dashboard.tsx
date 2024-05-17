"use client"
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/allblogs", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <>
      <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {posts.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </main>
      <Pagination
        currentPage={currentPage}
        pageSize={5}
        setPage={(number: number) => setCurrentPage(number)}
      />
    </>
  );
}

