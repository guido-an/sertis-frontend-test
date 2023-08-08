import React, { useState } from 'react';
import { Card, Status, Category, Author } from '../types';
import DeleteCardButton from './DeleteCardButton';
interface CardItemProps {
  card: Card;
  loggedInUser: Author;
  updateCard: (card: Card) => void,
  deleteCard: (cardId: string) => void,  
}

const CardItem: React.FC<CardItemProps> = ({ card, loggedInUser, updateCard, deleteCard }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState<Card>({ ...card });

  const handleEditClick = () => {
    // Check if the logged-in user is the author of the card
    if (loggedInUser.id === card.author.id) {
      setIsEditMode(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCard({ ...editedCard, name: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCard({ ...editedCard, content: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedCard({ ...editedCard, status: e.target.value as Status });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedCard({ ...editedCard, category: e.target.value as Category });
  };

  const handleSaveClick = () => {
    updateCard(editedCard);
    setIsEditMode(false);
  };

  return (
    <div>
      <h2>{editedCard.name}</h2>
      <div>Status: {editedCard.status}</div>
      <div>Content: {editedCard.content}</div>
      <div>Category: {editedCard.category}</div>
      <div>Author: {card.author.name}</div>
      {!isEditMode && loggedInUser.id === card.author.id && (
        <button onClick={handleEditClick} data-testid="edit">Edit</button>
      )}
      {isEditMode && (
        <div>
          <label htmlFor='name'>Name:</label>
          <input id="name" type="text" value={editedCard.name} onChange={handleNameChange} />
          <label htmlFor='content'>Content:</label>
          <textarea id="content" value={editedCard.content} onChange={handleContentChange} />
          <label htmlFor='status'>Status:</label>
          <select id="status" value={editedCard.status} onChange={handleStatusChange}>
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <label htmlFor='category'>Category:</label>
          <select id="category" value={editedCard.category} onChange={handleCategoryChange}>
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={handleSaveClick}>Save</button>
          <DeleteCardButton deleteCard={() => deleteCard(card.id)} />
        </div>
      )}
    </div>
  );
};

export default CardItem;
