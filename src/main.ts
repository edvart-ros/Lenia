import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera(
        "mainCam",
        new BABYLON.Vector3(0, 5, -10),
    );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
    );
    light.intensity = 0.7;
    BABYLON.MeshBuilder.CreateGround("plane", {width: 10, height: 10});
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
