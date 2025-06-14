import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /personagens/:id - Obter um Personagem pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionById);

// POST /coleção - Criar um novo coleção
collectionRouter.post("/", CollectionController.createCollection);

// PUT /personagens/:id - Atualizar um Personagem
collectionRouter.put("/:id", CollectionController.updateCollection);

// DELETE /personagens/:id - Remover um Personagem
collectionRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionRouter;
