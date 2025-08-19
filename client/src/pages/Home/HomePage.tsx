import { products as mockProducts } from "@repo/shared/src/mocks/products";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { SideNav } from "../../components/SideNav/SideNav";
import { SortOptions } from "../../components/SideNav/SortOptions";
import styles from "./HomePage.module.scss";
import { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  let filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category) {
    filtered = filtered.filter((p) => p.category.name === category);
  }

  if (sort === SortOptions.PriceAsc) {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === SortOptions.PriceDesc) {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === SortOptions.Date) {
    filtered.sort(
      (a, b) =>
        new Date(b.uploadedDate).getTime() -
        new Date(a.uploadedDate).getTime()
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidenav}>
          <SideNav
            categories={categories.map((cat) => cat.name)}
            selectedCategory={category}
            onCategoryChange={setCategory}
            search={search}
            onSearchChange={setSearch}
            sort={sort as SortOptions}
            onSortChange={setSort}
          />
        </div>

        <div className={styles.products}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
