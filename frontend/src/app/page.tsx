'use client'

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>();

  const handleButton = async (e: any) => {
    const id = parseInt(e.target.id, 10);
    e.target.id = id + 1;

    setText(String(id));
  };

  return (
    <main className="text-white bg-slate-900 flex min-h-screen flex-col items-center justify-between p-24">
      {text ? text : '0'}
      <button className="text-white border-2 p-2 w-40" id="1" onClick={e => handleButton(e)}>Add</button>
    </main>
  )
}
