import Navbar from "./Navbar";
import SearchBar from "./StickySearchBar";
import ImageGrid from "./ImageGrid";

const CategoryPage = () => {
    return (<>
    <SearchBar alwaysSticky/>
        <ImageGrid/>
    </>)
}

export default CategoryPage;