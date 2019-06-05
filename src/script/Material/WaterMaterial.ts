export default class NoAlphaWaterMaterial extends Laya.BaseMaterial {
    public static ShaderName : string = "NoAlphaWaterShader";
    public static MainTxture: number =  Laya.Shader3D.propertyNameToID("u_texture");
    public static Textue_ST: number = Laya.Shader3D.propertyNameToID("u_texturest");
    public static WaterColor: number = Laya.Shader3D.propertyNameToID("u_WaterColor");
    public static ColorPower:number = Laya.Shader3D.propertyNameToID("u_Power");
    public static DeepColor: number = Laya.Shader3D.propertyNameToID("u_DeepColor");
    
    public static WaveSpeed: number = Laya.Shader3D.propertyNameToID("u_WaveSpeed");
    public static WaveHeight: number = Laya.Shader3D.propertyNameToID("u_WaveHeight");
    public static WaveFrequency: number = Laya.Shader3D.propertyNameToID("u_WaveFrequency");

    public static UVWaveSpeed: number = Laya.Shader3D.propertyNameToID("u_UVWaveSpeed");
    public static UVWaveAmplitude: number = Laya.Shader3D.propertyNameToID("u_UVWaveAmplitude");
    public static UVWaveFrequency: number = Laya.Shader3D.propertyNameToID("u_UVWaveFrequency");


    private static isInitShader = false;
    public static InitShader(){
        if(NoAlphaWaterMaterial.isInitShader) return;
        NoAlphaWaterMaterial.isInitShader = true;

        var attributeMap:Object = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0, 
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0, 
            'a_Texcoord': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        var uniformMap:Object = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE, 
            'u_ITWorldMat': Laya.Shader3D.PERIOD_SPRITE, 
            'u_CameraPos': Laya.Shader3D.PERIOD_CAMERA, 
            'u_texture': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_texturest': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaterColor': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_Power': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_DeepColor': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveSpeed': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveHeight': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveFrequency': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveSpeed': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveAmplitude': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveFrequency': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_Time':Laya.Shader3D.PERIOD_SCENE,
            'u_Bend': Laya.Shader3D.PERIOD_SCENE, 
            'u_Bias': Laya.Shader3D.PERIOD_SCENE, 
        };
        var vs:string = `
        #include "Lighting.glsl";
        attribute vec4 a_Position;
        attribute vec2 a_Texcoord;
        attribute vec3 a_Normal;

        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        uniform mat4 u_ITWorldMat;
        uniform vec3 u_CameraPos;
        uniform vec4 u_texturest;
        uniform float u_WaveSpeed;
        uniform float u_WaveHeight;
        uniform float u_WaveFrequency;
        uniform float u_UVWaveSpeed;
        uniform float u_UVWaveFrequency;
        uniform float u_Time;
        uniform vec3 u_Bend;
        uniform vec3 u_Bias;

        varying vec2 v_Texcoord;
        //varying vec3 v_Normal;
        varying vec2 v_sinAni;

        void main()
        {

            vec4 worldPos = u_WorldMat * a_Position; 
            worldPos.xyz -= u_CameraPos;

            vec2 xyOff = max(vec2(0), vec2(-worldPos.z) - u_Bias.xy);
            xyOff *= xyOff;
            worldPos = vec4(u_Bend.x * xyOff.x, u_Bend.y * xyOff.y, 0, 0) * 0.001; 
            
            vec4 vertex = a_Position + u_ITWorldMat * worldPos;

            vec3 uiworldpos =(u_WorldMat*a_Position).xyz;
            vec2 mainTexcoords = uiworldpos.xz * 0.1;
            v_Texcoord= mainTexcoords.xy * u_texturest.xy + u_texturest.zw;

            vec2 x = ((vertex.xy+vertex.yz) * u_UVWaveFrequency ) + (u_Time * u_UVWaveSpeed);
            v_sinAni = x;

            vec3 _pos = uiworldpos.xyz * u_WaveFrequency;
            float _phase = u_Time * u_WaveSpeed;
            vec4 vsw_offsets = vec4(1.0, 2.2, 0.6, 1.3);
			vec4 vsw_ph_offsets = vec4(1.0, 1.3, 2.2, 0.4);
			vec4 waveXZ = sin((_pos.xxzz * vsw_offsets) + (_phase * vsw_ph_offsets));

            float waveFactorX = dot(vec2(waveXZ.xy), vec2(1,1)) * u_WaveHeight * 0.5;
            float waveFactorZ = dot(vec2(waveXZ.zw), vec2(1,1)) * u_WaveHeight * 0.5;

            vec4 tpos = vertex;
            tpos.y += (waveFactorX + waveFactorZ);

           // vec4 waveXZn = cos((_pos.xxzz * vsw_offsets) + (_phase * vsw_ph_offsets)) * (vsw_offsets * 0.5);
			//float xn = -u_WaveHeight * (waveXZn.x + waveXZn.y);
			//float zn = -u_WaveHeight * (waveXZn.z + waveXZn.w);
           // v_Normal = normalize(vec3(xn, 1, zn));

            gl_Position=u_MvpMatrix * tpos;
            gl_Position=remapGLPositionZ(gl_Position); 
        }`;
        var ps:string = `
        precision highp float;

        uniform sampler2D u_texture;
        uniform vec3 u_WaterColor;
        uniform float u_Power;
        uniform vec3 u_DeepColor;
        uniform float u_UVWaveAmplitude;

        varying vec2 v_Texcoord;
        varying vec2 v_sinAni;
       // varying vec3 v_Normal;

        void main()
        {
            vec2 t1 = sin(0.9 * v_sinAni.xy);
            vec2 t2 = sin(1.33 * v_sinAni.xy + 3.14);
            vec2 t3 = sin(2.4 * v_sinAni.xy + 5.3);
            vec2 uvDistort = (t1 + t2 + t3) * 0.33 * u_UVWaveAmplitude;
            vec2 texcood = v_Texcoord.xy +  uvDistort.xy;

            vec4 tex = texture2D(u_texture, texcood.xy);
            vec3 color = mix(u_DeepColor, u_WaterColor, vec3(tex.a)) * u_Power;
            vec4 c = tex;
            c.rgb = c.rgb * color;
            c.a = tex.a;
            gl_FragColor = c;
        }`;

        
        //创建自定义Shader
        var customShader:Laya.Shader3D = Laya.Shader3D.add(NoAlphaWaterMaterial.ShaderName);
        //为Shader添加SubShader
		var subShader:Laya.SubShader = new Laya.SubShader(attributeMap, uniformMap, Laya.SkinnedMeshSprite3D.shaderDefines);
        customShader.addSubShader(subShader);
        //为SubShader添加ShaderPass
        subShader.addShaderPass(vs,ps);

    }
    constructor() {
        super()
        NoAlphaWaterMaterial.InitShader();
        this.setShaderName(NoAlphaWaterMaterial.ShaderName);
    }

      /**
     * 获取漫反射贴图。
     *  漫反射贴图。
     */
    public get diffuseTexture(): Laya.BaseTexture {
        return this._shaderValues.getTexture(NoAlphaWaterMaterial.MainTxture);
    }

    public set diffuseTexture(value: Laya.BaseTexture) {
        this._shaderValues.setTexture(NoAlphaWaterMaterial.MainTxture,value);
    }

    public set Texture_ST(value: Laya.Vector4)  {
        this._shaderValues.setVector(NoAlphaWaterMaterial.Textue_ST, value);
    }
    
    public set waterColor(value: Laya.Vector3) {
        this._shaderValues.setVector3(NoAlphaWaterMaterial.WaterColor, value);
    }
    public set colorPower(value: number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.ColorPower, value);
    }
    public set deepColor(value: Laya.Vector3) {
        this._shaderValues.setVector3(NoAlphaWaterMaterial.DeepColor,value);
    }


    public set waveSpeed(value: number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.WaveSpeed, value);
    }
    public set waveHeight(value:number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.WaveHeight, value);
    }
    public set waveFrequency(value:number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.WaveFrequency, value);
    }
    
    public set uvWaveSpeed(value: number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.UVWaveSpeed, value);
    }
    public set uvWaveAmplitude(value:number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.UVWaveAmplitude, value);
    }
    public set uvWaveFrequency(value:number) {
        this._shaderValues.setNumber(NoAlphaWaterMaterial.UVWaveFrequency, value);
    }

}