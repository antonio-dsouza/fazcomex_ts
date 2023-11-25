interface Due {
  id: string;
  declarante_cpf_cnpj: string
  declarante_razao_social: string
  identificacao: string
  numero: string;
  moeda: number;
  incoterm: string;
  informacoes_complementares?: string;
  total_vmle_moeda?: number;
  total_vmcv_moeda?: number;
  total_peso_liquido?: number;
  [key: string]: any;
}

export type { Due }