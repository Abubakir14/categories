import React, { useState } from "react";
import "./category.css";

interface CategoryProps {
  categoryName: string;
}

interface ChildItem {
  text: string;
  children: ChildItem[];
}

const Category: React.FC<CategoryProps> = ({ categoryName }) => {
  const [childItems, setChildItems] = useState<ChildItem[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddChild = () => {
    if (inputText.trim() !== "") {
      const newItem: ChildItem = {
        text: inputText,
        children: [],
      };
      setChildItems([...childItems, newItem]);
      setInputText("");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const updatedChildItems = [...childItems];
    updatedChildItems.splice(index, 1);
    setChildItems(updatedChildItems);
  };

  const handleSave = () => {
    if (inputText.trim() !== "") {
      if (editingIndex !== null) {
        // Если редактируется существующий элемент
        const updatedChildItems = [...childItems];
        updatedChildItems[editingIndex].text = inputText;
        setChildItems(updatedChildItems);
        setEditingIndex(null); // Завершение редактирования
      } else {
        // Если добавляется новый элемент
        const newItem: ChildItem = {
          text: inputText,
          children: [],
        };
        setChildItems([...childItems, newItem]);
      }
      setInputText("");
      setIsModalOpen(false);
    }
  };

  const renderChildItems = (items: ChildItem[]) => {
    return (
      <ul className="ul">
        {items.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {item.text}
                <button onClick={() => setIsModalOpen(true)}>+</button>
                <button onClick={() => handleDelete(index)}>✗</button>
                <button onClick={() => setEditingIndex(index)}>Edit</button>
              </div>
            )}
            {renderChildItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="categories">
      <div className="main-title-block">
        <div>
          <span className="title">{categoryName}</span>
        </div>
        <button className="button" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>
      {renderChildItems(childItems)}
      {isModalOpen && (
        <div className="modal">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={handleAddChild}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>✗</button>
        </div>
      )}
    </div>
  );
};

export default Category;
