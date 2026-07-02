import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

export default function Home() {

    return (

        <main className="flex">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <h1 className="text-3xl font-bold">

                        Welcome to MemoryOps

                    </h1>

                    <p className="mt-3 text-gray-500">

                        Persistent Engineering Memory powered by Cognee.

                    </p>

                </div>

            </div>

        </main>

    );
}