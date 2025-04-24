import CardModel from "../models/cardModel.js";

class CardController {
  // GET /colecoes
  async getAllCards(req, res) {
    try {
      const cards = await CardModel.findAll();
      res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /colecoes/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const card = await CardModel.findById(id);

      if (!card) {
        return res.status(404).json({ error: "Cartas não encontrado" });
      }

      res.json(card);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar cartas" });
    }
  }

  // POST /api/personagens
  async createCard(req, res) {
    try {
      const { name, rarity, attackPoints, defensePoints, imageUrl, collectionId } = req.body

      if (!name || !rarity || !attackPoints || !defensePoints ) {
        return res.status(400).json({
          error:"Todos os campos são obrigatorios"
        })
      }

      // Criar o novo personagem
      const newCard = await CardModel.create(
        name,
        rarity, 
        attackPoints, 
        defensePoints, 
        imageUrl,
        collectionId
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar card" });
      }

      res.status(201).json(newCard);
    } catch (error) {
      console.error("Erro ao criar card:", error);
      res.status(500).json({ error: "Erro ao criar card" });
    }
  }

  // PUT /api/personagens/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
      } = req.body;

      // Atualizar o personagem
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar card:", error);
      res.status(500).json({ error: "Erro ao atualizar card" });
    }
  }

  // DELETE /api/personagens/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      res.status(201).json("Card apagada"); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CardController();
