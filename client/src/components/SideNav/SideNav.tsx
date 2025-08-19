import styles from "./SideNav.module.scss";
import type { SortOptions } from "./SortOptions";

interface Props {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOptions;
  onSortChange: (value: SortOptions) => void;
}

export const SideNav = ({
  categories,
  selectedCategory,
  onCategoryChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}: Props) => {
  return (
    <div className={styles.sidenav}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.search}
      />

      <h4>Category</h4>
      <ul>
        <li
          className={!selectedCategory ? styles.active : ""}
          onClick={() => onCategoryChange(null)}
        >
          All
        </li>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? styles.active : ""}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      <h4>Sort By</h4>
      <div className={styles.selectWrapper}>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOptions)}
        >
          <option value="Date">Newest</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
};
