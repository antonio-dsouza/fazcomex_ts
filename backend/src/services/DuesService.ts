import { Due } from "../model/Due";
import { DueItem } from "../model/DueItem";
import { DuesRepository } from "../repositories/DuesRepository";
import { Util } from "../utils/Util";

class DuesService {
  async getDues(): Promise<Due[]> {
    const duesRepository = new DuesRepository();

    const dues = await duesRepository.getDues();

    return dues;
  }

  async getDueById(id: number): Promise<Due|null> {
    const duesRepository = new DuesRepository();

    const due = await duesRepository.getDueById(id);

    return due;
  }

  async updateDue(id: number, informacoes_complementares: string): Promise<void> {
    const duesRepository = new DuesRepository();

    await duesRepository.updateDue(id, informacoes_complementares);
  }

  async createDue(jsonObject: any): Promise<void> {
    const due: Due = {
      declarante_cpf_cnpj: jsonObject.declarante_cpf_cnpj,
      declarante_razao_social: jsonObject.declarante_razao_social,
      identificacao: jsonObject.identificacao,
      numero: jsonObject.numero,
      moeda: parseInt(jsonObject.moeda),
      incoterm: jsonObject.incoterm,
      informacoes_complementares: jsonObject.informacoes_complementares || null,
      total_vmle_moeda: jsonObject.due_itens.reduce((total: any, item: any) => total + item.vmle, 0),
      total_vmcv_moeda: jsonObject.due_itens.reduce((total: any, item: any) => total + item.vmcv, 0),
      total_peso_liquido: jsonObject.due_itens.reduce((total: any, item: any) => total + item.peso_liquido, 0),
    };

    const dueItens = jsonObject.due_itens.map((item: DueItem) => {
      const { nfe_serie, nfe_numero } = Util.extractDataNfe(item.nfe_chave);
      return {
        item: item.item,
        nfe_chave: item.nfe_chave,
        nfe_numero,
        nfe_serie,
        nfe_item: item.nfe_item,
        descricao_complementar: item.descricao_complementar,
        ncm: item.ncm,
        vmle_moeda: item.vmle || null,
        vmcv_moeda: item.vmcv || null,
        peso_liquido: item.peso_liquido || null,
        enquadramento1: item.enquadramento1 || null,
        enquadramento2: item.enquadramento2 || null,
        enquadramento3: item.enquadramento3 || null,
        enquadramento4: item.enquadramento4 || null,
      };
    });

    const duesRepository = new DuesRepository();
    
    await duesRepository.saveDue(due, dueItens);
  }
}

export { DuesService }