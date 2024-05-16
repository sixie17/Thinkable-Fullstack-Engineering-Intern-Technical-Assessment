import Featured from  "@/components/featured/Featured"
import CategoryList from "@/components/categoryList/CategoryList"
import CardList from "@/components/cardList/CardList"
import Menu from "@/components/Menu/Menu"
export default function Home() {
  return (
    <div>
      <div>
       <Featured/>
      </div>
       <div>
        <CategoryList/>
       </div>
       <div>
        <CardList/>
        <Menu/>
       </div>
    </div>
  );
}
