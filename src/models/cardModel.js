import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as coleções
  async findAll() {
    const cards = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: true,
      },
    });

    console.log(cards);

    return cards;
  }

  // Obter um coleção pelo ID
  async findById(id) {
    const card = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        collection: true,
      }
    });

    return card;
  }

  // Criar um novo personagem
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const newCard = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      },
    });

    return newCard;
  }

  // Atualizar um personagem
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
  ) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    // Atualize a coleção existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (rarity !== undefined) {
      data.rarity = rarity;
    }
    if (attackPoints !== undefined) {
      data.attackPoints = attackPoints;
    }
    if (defensePoints !== undefined) {
      data.defensePoints = defesePoints;
    }
    if (imageUrl !== undefined) {
      data.imageURL = imageUrl;
    }

    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return cardUpdated;
  }

  // Remover um personagem
  async delete(id) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
