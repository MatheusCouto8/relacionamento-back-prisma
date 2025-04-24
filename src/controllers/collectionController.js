import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar as coleções:", error);
      res.status(500).json({ error: "Erro ao buscar as coleções" });
    }
  }

  // GET /colecoes/:id
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /api/personagens
  async createCollection(req, res) {
    try {
      const { name, description, releaseYear } = req.body

      if (!name || !releaseYear) {
        return res.status(400).json({
          error:"Os campos nome e ano de lançamentos são obrigatorios"
        })
      }

      // Criar o novo personagem
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear,
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar coleção" });
      }

      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar personagem:", error);
      res.status(500).json({ error: "Erro ao criar personagem" });
    }
  }

  // PUT /api/personagens/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        releaseYear,
      } = req.body;

      // Atualizar o personagem
      const updatedCollection = await CollectionModel.update(
        id,
        name,
        description,
        releaseYear,
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json({ error: "Erro ao atualizar personagem" });
    }
  }

  // DELETE /api/personagens/:id
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await CollectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.status(201).json("Coleção apagada"); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CollectionController();
