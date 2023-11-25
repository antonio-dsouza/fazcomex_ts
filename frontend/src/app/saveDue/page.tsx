'use client'

import { useSendDue } from '@/hooks/useSendDue';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from "@/services/ToastConfig";
import NavBar from '@/components/NavBar';

export default function SaveDue() {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.error('Selecione um arquivo JSON.');
      return;
    }

    const formData = new FormData();
    formData.append('json', file);

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useSendDue(formData);

      toast.info(`JSON enviado com sucesso`, toastOptions);
    } catch (error) {
      toast.error(`Erro ao enviar JSON: ${error}`, toastOptions);
    }
  }

  return (
    <>
      <NavBar />
      <div className="bg-zinc-900 flex justify-center items-center w-12/12 h-screen">
        <form className="flex flex-col justify-center items-center gap-4" onSubmit={onSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Faça o envio do JSON</label>
            <input
              className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept=".json"
              onChange={onFileChange}
            />
          </div>
          <button className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Enviar</button>
        </form>
      </div>
    </>
  )
}