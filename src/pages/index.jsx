import Head from "next/head";
import { Container } from "../component/Container.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Compas</title>
      </Head>
      <Container>
        <h1 className="heading text-6xl text-seagreen-700">Compas</h1>
        <h2 className="text-4xl text-steel-700">Unified backend tooling</h2>
      </Container>
    </>
  );
}
