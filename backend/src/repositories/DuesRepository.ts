import { Due } from "../model/Due";
import { DueItem } from "../model/DueItem";
import prismaClient from "./prisma";

class DuesRepository {
  async getDues(): Promise<Due[]> {
    const dues = await prismaClient.dues.findMany();

    return dues;
  }

  async getDueById(id: number): Promise<Due|null> {
    const due = await prismaClient.dues.findUnique({
      where: {
        id,
      },
      include: {
        due_itens: {
        }
      }
    });

    return due;
  }

  async saveDue(due: Due, dueItens: DueItem[]): Promise<Due> {
    const result = await prismaClient.dues.create({
      data: { 
        ...due,
        due_itens: {
          create: dueItens.map((due) => ({
            ...due
          })),
        },
      }
    });

    return result;
  }

  async updateDue(id: number, informacoes_complementares: string): Promise<void> {
    await prismaClient.dues.update({
      data: {
        informacoes_complementares
      },
      where: {
        id
      }
    });
  }
}

export { DuesRepository }