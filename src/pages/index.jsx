import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Compas</title>
      </Head>
      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <div className="h-4" />

        <h1 className="heading text-6xl text-seagreen-700">Compas</h1>
        <h2 className="text-4xl text-steel-700">Unified backend tooling</h2>
        <div className="h-16" />
      </div>
    </>
  );
}
