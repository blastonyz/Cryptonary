import Scene from "./components/home/scene/Scene";


export default function Home() {
  return (
    <main className="mainHome">

      <div className="heroContainer">
        <div className="mainTextContainer">
          <h1 className="mainText">Cryptonary</h1>
        </div>
        <div className="main3dContainer">
          <Scene modelUrl="./" />
        </div>
      </div>
    <div className="imgContainer">
        <img src={'/fondo-hero.jpg'} className="imgHero">
        </img>
    </div>
    </main>
  );
}
