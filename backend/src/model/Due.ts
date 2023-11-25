import { Decimal } from "@prisma/client/runtime/library";
import { DueItem } from "./DueItem";

interface Due {
  declarante_cpf_cnpj: string
  declarante_razao_social: string
  identificacao: string
  numero: string;
  moeda: number;
  incoterm: string;
  informacoes_complementares?: string | null;
  total_vmle_moeda?: Decimal | null;
  total_vmcv_moeda?: Decimal | null;
  total_peso_liquido?: Decimal | null;
}

export { Due }