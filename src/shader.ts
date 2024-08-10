export const computeShader = `
    @group(0) @binding(0) var texture: texture_storage_2d<rgba8unorm,write>;
    struct Params {
        time: f32
    }

    @group(0) @binding(1) var<uniform> params : Params; 
    
    @compute @workgroup_size(1, 1, 1)
    fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
        var x: f32 = 1024-f32(global_id.x);
        var y: f32 = f32(global_id.y);
        textureStore(texture, vec2<i32>(global_id.xy), vec4<f32>(fract(params.time), y/1024, 0.0, 1.0));
    }
`;