'use client'

import QuestCard from "@/common/components/quest-card";
import TitleBar from "@/common/components/title-bar";
import { Provider } from "react-redux";
import store from "@/common/redux/store";

export default function Home() {

  return (
    <Provider store={store}>
      <main className="h-screen w-screen px-16 py-8">
        <div className="h-full w-full items-center flex flex-col justify-between font-mono text-sm lg:flex">
          <TitleBar />
          <QuestCard />
        </div>
      </main>
    </Provider>
  )
}
