import * as BABYLON from 'babylonjs'

export class sceneManager {
    scene: BABYLON.Scene;
    quad: BABYLON.Mesh;
    quadMaterial: BABYLON.StandardMaterial;
    constructor(engine: BABYLON.AbstractEngine, canvas: HTMLCanvasElement) {
        this.scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.FreeCamera(
            "mainCam",
            new BABYLON.Vector3(0, 2, 0),
        );

        camera.mode = 1;
        camera.orthoLeft = -1;
        camera.orthoRight = 1;
        camera.orthoBottom = -1;
        camera.orthoTop = 1;
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
        );

        light.intensity = 0.7;
        this.quad = BABYLON.MeshBuilder.CreateGround("plane", { width: 2, height: 2, subdivisionsX: 1, subdivisionsY: 1 });
        this.quadMaterial = new BABYLON.StandardMaterial("quadMat");

        this.quadMaterial.disableLighting = true;
        this.quad.material = this.quadMaterial;
        new BABYLON.AxesViewer();
    
    };

    
}