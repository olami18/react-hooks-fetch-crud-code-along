import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((r) => r.json())
    .then((items) => setItems(items));
  }, []);

  function handleAddItem(newItem) {
    setItems([...items ,newItem] )
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  function removeFromList(deletedItem){
    const remainingItems=items.filter((item)=>item.id!==deletedItem.id)
    setItems(remainingItems)
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onRemoveItem={removeFromList}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
