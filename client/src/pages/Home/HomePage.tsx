import { useMemo, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { SideNav } from "../../components/SideNav/SideNav";
import { SortOptions } from "../../components/SideNav/SortOptions";
import styles from "./HomePage.module.scss";

import { useProductsControllerGetActiveProducts } from "../../api/generated/endpoints";


const Home = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");

  const { data: products = [], isLoading, error } = useProductsControllerGetActiveProducts();

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.flatMap((p) => p.categories?.map((c) => c.name) ?? [])
      ),
    ];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category) {
      result = result.filter((p) =>
        p.categories?.some((c) => c.name === category)
      );
    }

    if (sort === SortOptions.PriceAsc) {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === SortOptions.PriceDesc) {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === SortOptions.Date) {
      result.sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    }

    return result;
  }, [products, category, search, sort]);


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidenav}>
          <SideNav
            categories={categories}
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
