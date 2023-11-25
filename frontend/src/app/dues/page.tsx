'use client'

import NavBar from '@/components/NavBar';
import { useDues } from '@/hooks/useDues';
import { Due } from '@/interface/Due';
import { useState, useEffect } from 'react';
import { formatDecimal } from '../utils/FormatDecimal';

export default function Dues() {
  const [dues, setDues] = useState<Due[] | []>([]);
  const tableHead = ['Declarante', 'Identificação', 'Número', 'Moeda', 'VMCV Moeda', 'VMLE Moeda', 'Peso Líquido'];

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useDues();
      setDues(response);
    };

    fetchData();
  }, []);

  const handleClick = (id: string) => {
    window.location.href = `/editDue/${id}`;
  };

  return (
    <>
      <NavBar />
      <div className="bg-zinc-900 flex justify-center items-center w-12/12 h-screen">
        <table className="w-10/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            {dues.map((item) =>
              <tr onClick={() => handleClick(item.id)} key={item.id} className="cursor-pointer hover:dark:bg-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  {item.declarante_cpf_cnpj} - {item.declarante_razao_social}
                </td>
                <td className="px-6 py-4">
                  {item.identificacao}
                </td>
                <td className="px-6 py-4">
                  {item.numero}
                </td>
                <td className="px-6 py-4">
                  {item.moeda}
                </td>
                <td className="px-6 py-4">
                  {formatDecimal(item.total_vmle_moeda)}
                </td>
                <td className="px-6 py-4">
                  {formatDecimal(item.total_vmcv_moeda)}
                </td>
                <td className="px-6 py-4">
                  {formatDecimal(item.total_peso_liquido)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}