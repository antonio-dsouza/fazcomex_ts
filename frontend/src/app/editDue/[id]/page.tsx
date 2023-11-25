'use client'

import { formatDecimal } from "@/app/utils/FormatDecimal";
import NavBar from "@/components/NavBar";
import { useDueById } from "@/hooks/useDueById";
import { useDueUpdate } from "@/hooks/useDueUpdate";
import { Due } from "@/interface/Due";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from "@/services/ToastConfig";

export default function EditDue({ params }: { params: { id: string } }) {
  const [due, setDue] = useState<Due | undefined>(undefined);

  const [informacoes_complementares, setInformacoes_complementares] = useState(due?.informacoes_complementares);
  const tableHead = ['Item', 'Nota/Série/Item', 'Descrição Complementar', 'NCM', 'Enquadramento(s)', 'VMLE Moeda', 'VMCV Moeda', 'Peso Líquido']

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useDueById(params.id);
      setDue(response);
      setInformacoes_complementares(response.informacoes_complementares);
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      informacoes_complementares
    }
    
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useDueUpdate(params.id, formData);
      toast.info(`Due atualizada com sucesso!`, toastOptions);
    } catch (error) {
      toast.error(`Erro ao atualizar due: ${error}`, toastOptions);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-zinc-900 flex justify-center items-center w-12/12 h-auto">
        <h1></h1>
        <form className="w-8/12 h-auto flex flex-col justify-center mb-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="relative flex pt-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Dados Gerais</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <label htmlFor="declarante" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Declarante</label>
                <input value={`${due?.declarante_cpf_cnpj} - ${due?.declarante_razao_social}`} type="text" id="declarante" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
              <div className="w-full">
                <label htmlFor="identificacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificação</label>
                <input value={due?.identificacao} type="text" id="identificacao" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
              <div className="w-full">
                <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                <input value={due?.numero} type="text" id="numero" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
              <div className="w-full">
                <label htmlFor="moeda" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moeda</label>
                <input value={due?.moeda} type="text" id="moeda" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <label htmlFor="vmle_moeda" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VMLE Moeda</label>
                <input value={formatDecimal(due?.total_vmle_moeda)} type="text" id="vmle_moeda" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
              <div className="w-full">
                <label htmlFor="vmcv_moeda" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VMCV Moeda</label>
                <input value={formatDecimal(due?.total_vmcv_moeda)} type="text" id="vmcv_moeda" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
              <div className="w-full">
                <label htmlFor="peso_liquido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso Líquido</label>
                <input value={formatDecimal(due?.total_peso_liquido)} type="text" id="peso_liquido" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </div>
            </div>
            <div className="relative flex pt-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Informações Complementares</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div>
              <textarea onChange={(e) => {setInformacoes_complementares(e.target.value)}} value={informacoes_complementares || ''} id="informacoes_complementares" name="informacoes_complementares" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite..."></textarea>
            </div>
            <div className="relative flex pt-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Itens</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div>
              <div className="w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {tableHead.map((item) =>
                        <th key={item} scope="col" className="px-6 py-3">
                          {item}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {due?.due_itens.map((item: any) =>
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                          {item.item}
                        </td>
                        <td className="px-6 py-4">
                          {item.nfe_numero}/{item.nfe_serie}/{item.nfe_item}
                        </td>
                        <td className="px-6 py-4">
                          {item.descricao_complementar}
                        </td>
                        <td className="px-6 py-4">
                          {item.ncm}
                        </td>
                        <td className="px-6 py-4">
                          {[item.enquadramento1, item.enquadramento2, item.enquadramento3, item.enquadramento4].filter(value => value !== null).join(', ')}
                        </td>
                        <td className="px-6 py-4">
                          {item.vmle_moeda}
                        </td>
                        <td className="px-6 py-4">
                          {item.vmcv_moeda}
                        </td>
                        <td className="px-6 py-4">
                          {item.peso_liquido}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button type="submit" className="text-white w-full mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar</button>
        </form>
      </div>
    </>
  )
}