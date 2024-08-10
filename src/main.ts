import * as BABYLON from "babylonjs";
import { sceneManager } from "./scene";
import {computeShader as shaderSource} from "./shader"

const canvas = document.getElementById("renderCanvas") as unknown as HTMLCanvasElement;
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
const sceneMan = new sceneManager(engine, canvas);

const compShader = new BABYLON.ComputeShader(
    "compShader", 
    engine, 
    {computeSource:shaderSource},
    {bindingsMapping:{
        "texture": { group: 0, binding: 0 },
    }}
)

const texture = BABYLON.RawTexture.CreateRGBAStorageTexture(null, 1024, 1024, engine);
sceneMan.quadMaterial.emissiveTexture = texture;
compShader.setStorageTexture("texture", texture);
compShader.dispatchWhenReady(1024, 1024, 1);
const paramsBuffer = new BABYLON.UniformBuffer(engine);
compShader.setUniformBuffer("params", paramsBuffer)

engine.runRenderLoop(function () {
   paramsBuffer.updateFloat("time", performance.now()/1000);
   paramsBuffer.update();
   sceneMan.scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
