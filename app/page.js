import Scene from "./components/home/Scene";


export default function Home() {
  return (
    <main className="mianHome">

<div className="heroContainer">
        <div className="mainTextContainer">
          <h1 className="mainText">Cryptonary</h1>
        </div>
        <div className="main3dContainer">
            <Scene modelUrl="./"/>
        </div>
</div>

    </main>
  );
}
