interface DueItem {
  id: number;
  due_id: number;
  item: number;
  nfe_chave: string;
  nfe_numero: string;
  nfe_serie: string;
  nfe_item: number;
  descricao_complementar: string;
  ncm: string;
  vmle?: number;
  vmcv?: number;
  peso_liquido?: number;
  enquadramento1?: string;
  enquadramento2?: string;
  enquadramento3?: string;
  enquadramento4?: string;
}

export { DueItem }